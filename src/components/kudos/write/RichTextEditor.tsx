"use client";

import { useCallback, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import DOMPurify from "dompurify";
import { useI18n } from "@/libs/i18n/context";

const ALLOWED_TAGS = ["p", "strong", "em", "s", "ol", "li", "a", "blockquote", "br", "span"];
const MAX_CHARS = 2000;

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

function sanitize(html: string): string {
  if (typeof window === "undefined") return html;
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ["href", "target", "rel", "class", "data-type", "data-id", "data-label"],
  });
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const { t } = useI18n();

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: false,
        code: false,
        codeBlock: false,
        heading: false,
        horizontalRule: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" },
      }),
      Mention.configure({
        HTMLAttributes: { class: "mention" },
        suggestion: {
          char: "@",
          items: async ({ query }: { query: string }) => {
            if (query.length < 2) return [];
            try {
              const res = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`);
              if (!res.ok) return [];
              const data: { data?: Array<{ id: string; name: string }> } = await res.json();
              return (data.data || []).slice(0, 5);
            } catch {
              return [];
            }
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          render: (): any => {
            let popup: HTMLElement | null = null;
            let currentItems: Array<{ id: string; name: string }> = [];
            let selectedIndex = 0;
            let commandFn: ((props: { id: string; label: string }) => void) | null = null;

            function updatePopup() {
              if (!popup) return;
              popup.innerHTML = currentItems
                .map(
                  (item, i) =>
                    `<div class="mention-item${i === selectedIndex ? " selected" : ""}" data-index="${i}" style="padding:8px 12px;cursor:pointer;font-size:14px;font-family:Montserrat,sans-serif;color:#2E3940;${i === selectedIndex ? "background:rgba(255,234,158,0.2);" : ""}">${item.name}</div>`
                )
                .join("");
            }

            return {
              onStart: (props: { items: Array<{ id: string; name: string }>; command: (props: { id: string; label: string }) => void; clientRect: (() => DOMRect | null) | null }) => {
                currentItems = props.items;
                commandFn = props.command;
                selectedIndex = 0;

                popup = document.createElement("div");
                popup.style.cssText =
                  "position:fixed;z-index:100;background:#fff;border:1px solid rgba(153,153,153,0.3);border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);max-height:200px;overflow-y:auto;min-width:160px;";

                popup.addEventListener("mousedown", (e) => {
                  e.preventDefault();
                  const target = (e.target as HTMLElement).closest("[data-index]") as HTMLElement | null;
                  if (target) {
                    const idx = Number(target.dataset.index);
                    const item = currentItems[idx];
                    if (item && commandFn) commandFn({ id: item.id, label: item.name });
                  }
                });

                document.body.appendChild(popup);
                updatePopup();

                if (props.clientRect) {
                  const rect = props.clientRect();
                  if (rect) {
                    popup.style.left = `${rect.left}px`;
                    popup.style.top = `${rect.bottom + 4}px`;
                  }
                }
              },
              onUpdate: (props: { items: Array<{ id: string; name: string }>; clientRect: (() => DOMRect | null) | null }) => {
                currentItems = props.items;
                selectedIndex = 0;
                updatePopup();
                if (props.clientRect && popup) {
                  const rect = props.clientRect();
                  if (rect) {
                    popup.style.left = `${rect.left}px`;
                    popup.style.top = `${rect.bottom + 4}px`;
                  }
                }
              },
              onKeyDown: (props: { event: KeyboardEvent }) => {
                if (props.event.key === "ArrowDown") {
                  selectedIndex = (selectedIndex + 1) % currentItems.length;
                  updatePopup();
                  return true;
                }
                if (props.event.key === "ArrowUp") {
                  selectedIndex = (selectedIndex - 1 + currentItems.length) % currentItems.length;
                  updatePopup();
                  return true;
                }
                if (props.event.key === "Enter") {
                  const item = currentItems[selectedIndex];
                  if (item && commandFn) commandFn({ id: item.id, label: item.name });
                  return true;
                }
                return false;
              },
              onExit: () => {
                popup?.remove();
                popup = null;
              },
            };
          },
        },
      }),
      Placeholder.configure({
        placeholder: t("kudos.write.content_placeholder"),
      }),
    ],
    content: value || "",
    onUpdate: ({ editor: ed }) => {
      const html = sanitize(ed.getHTML());
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[140px] p-4 font-[Montserrat] text-base text-[#2E3940]",
      },
      handleKeyDown: (_view, event) => {
        // Block input at max chars (allow delete/backspace/arrow keys)
        const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
        if (allowedKeys.includes(event.key)) return false;
        if (event.ctrlKey || event.metaKey) return false;

        const text = _view.state.doc.textContent;
        if (text.length >= MAX_CHARS && event.key.length === 1) {
          return true; // block
        }
        return false;
      },
    },
  });

  // Sync external value changes
  useEffect(() => {
    if (editor && value === "" && editor.getHTML() !== "<p></p>") {
      editor.commands.clearContent();
    }
  }, [editor, value]);

  const charCount = editor?.state.doc.textContent.length || 0;
  const isNearLimit = charCount >= MAX_CHARS * 0.9;

  const toggleBold = useCallback(() => editor?.chain().focus().toggleBold().run(), [editor]);
  const toggleItalic = useCallback(() => editor?.chain().focus().toggleItalic().run(), [editor]);
  const toggleStrike = useCallback(() => editor?.chain().focus().toggleStrike().run(), [editor]);
  const toggleOrderedList = useCallback(() => editor?.chain().focus().toggleOrderedList().run(), [editor]);
  const toggleBlockquote = useCallback(() => editor?.chain().focus().toggleBlockquote().run(), [editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-col gap-0">
      {/* C - Toolbar */}
      <div className="flex items-center border border-[#999] border-b-0 rounded-t-lg bg-white">
        <ToolbarButton
          onClick={toggleBold}
          isActive={editor.isActive("bold")}
          label="Bold"
        >
          <span className="font-bold text-base">B</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={toggleItalic}
          isActive={editor.isActive("italic")}
          label="Italic"
        >
          <span className="italic text-base">I</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={toggleStrike}
          isActive={editor.isActive("strike")}
          label="Strikethrough"
        >
          <span className="line-through text-base">S</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={toggleOrderedList}
          isActive={editor.isActive("orderedList")}
          label="Ordered List"
        >
          <span className="text-sm font-medium">1.</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={setLink}
          isActive={editor.isActive("link")}
          label="Link"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M8.5 11.5a4.5 4.5 0 006.36 0l2-2a4.5 4.5 0 00-6.36-6.36l-1.15 1.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M11.5 8.5a4.5 4.5 0 00-6.36 0l-2 2a4.5 4.5 0 006.36 6.36l1.14-1.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </ToolbarButton>
        <ToolbarButton
          onClick={toggleBlockquote}
          isActive={editor.isActive("blockquote")}
          label="Quote"
          isLast
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M3 6h4l-2 6H3V6zM11 6h4l-2 6h-2V6z" fill="currentColor"/>
          </svg>
        </ToolbarButton>

        {/* Community Standards link */}
        <a
          href="#"
          className="ml-auto px-4 text-sm font-medium text-[#3B82F6] underline hover:text-[#2563EB] font-[Montserrat] transition-colors"
        >
          {t("kudos.write.community_standards")}
        </a>
      </div>

      {/* D - Editor */}
      <div className="border border-[#999] border-t-0 rounded-b-lg bg-white transition-colors duration-150">
        <EditorContent editor={editor} />
      </div>

      {/* Hint + Char counter */}
      <div className="flex items-center justify-between mt-1">
        <p className="text-sm font-medium text-[#2E3940] text-center flex-1 font-[Montserrat]">
          {t("kudos.write.content_hint")}
        </p>
        <span
          className={`text-xs font-[Montserrat] ${isNearLimit ? "text-[#EF4444] font-bold" : "text-[#999]"}`}
        >
          {t("kudos.write.char_count").replace("{current}", String(charCount)).replace("{max}", String(MAX_CHARS))}
        </span>
      </div>
    </div>
  );
}

function ToolbarButton({
  onClick,
  isActive,
  label,
  isLast,
  children,
}: {
  onClick: () => void;
  isActive: boolean;
  label: string;
  isLast?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-12 h-12 flex items-center justify-center cursor-pointer transition-colors duration-100 text-[#2E3940] ${
        !isLast ? "border-r border-[#999]/30" : ""
      } ${isActive ? "bg-[#FFEA9E]/30" : "hover:bg-black/5"}`}
      aria-label={label}
      aria-pressed={isActive}
    >
      {children}
    </button>
  );
}
