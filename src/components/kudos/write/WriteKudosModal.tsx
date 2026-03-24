"use client";

import { useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useWriteKudosContext } from "./WriteKudosProvider";
import { useWriteKudos } from "@/hooks/useWriteKudos";
import { useI18n } from "@/libs/i18n/context";
import { useToast } from "@/hooks/useToast";
import { ReceiverSearch } from "./ReceiverSearch";
import { TitleInput } from "./TitleInput";
import { RichTextEditor } from "./RichTextEditor";
import { HashtagPicker } from "./HashtagPicker";
import { ImageUploader } from "./ImageUploader";
import { AnonymousToggle } from "./AnonymousToggle";
import { ModalActions } from "./ModalActions";

export function WriteKudosModal() {
  const { isModalOpen, closeModal } = useWriteKudosContext();
  const form = useWriteKudos();
  const { t } = useI18n();
  const toast = useToast();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus trap
  useEffect(() => {
    if (!isModalOpen) return;
    previousFocusRef.current = document.activeElement as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTab);
    // Focus first focusable element
    requestAnimationFrame(() => {
      const first = modalRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      first?.focus();
    });

    return () => {
      document.removeEventListener("keydown", handleTab);
      previousFocusRef.current?.focus();
    };
  }, [isModalOpen]);

  // Escape key close
  useEffect(() => {
    if (!isModalOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const handleClose = useCallback(() => {
    form.reset();
    closeModal();
  }, [form, closeModal]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) handleClose();
    },
    [handleClose]
  );

  const handleSubmit = useCallback(async () => {
    const result = await form.submit();
    if (result.success) {
      toast.show(t("kudos.write.submit_success"), "info");
      handleClose();
    } else {
      toast.show(result.error || t("kudos.write.submit_error"), "error");
    }
  }, [form, toast, t, handleClose]);

  if (!isModalOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={t("kudos.write.modal_title")}
    >
      <div
        ref={modalRef}
        className="w-[600px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-10 px-12 flex flex-col gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)] z-[51] animate-slide-up max-md:w-full max-md:max-w-[100vw] max-md:rounded-b-none max-md:fixed max-md:bottom-0 max-md:p-6 max-md:px-4 md:max-lg:w-[560px] md:max-lg:p-8 md:max-lg:px-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* A - Modal Title */}
        <h2 className="text-2xl font-bold text-center text-[#2E3940] font-[Montserrat]">
          {t("kudos.write.modal_title")}
        </h2>

        {/* B - Receiver Search */}
        <ReceiverSearch
          value={form.receiver}
          onChange={form.setReceiver}
        />

        {/* Danh hieu - Title Input */}
        <TitleInput
          value={form.title}
          onChange={form.setTitle}
        />

        {/* C+D - Rich Text Editor with toolbar */}
        <RichTextEditor
          value={form.content}
          onChange={form.setContent}
        />

        {/* E - Hashtag Picker */}
        <HashtagPicker
          value={form.hashtags}
          onChange={form.setHashtags}
        />

        {/* F - Image Upload */}
        <ImageUploader
          value={form.images}
          onChange={form.setImages}
        />

        {/* G - Anonymous Toggle */}
        <AnonymousToggle
          isAnonymous={form.isAnonymous}
          anonymousName={form.anonymousName}
          onToggle={form.setIsAnonymous}
          onNameChange={form.setAnonymousName}
        />

        {/* H - Action Buttons */}
        <ModalActions
          isValid={form.isValid}
          isSubmitting={form.isSubmitting}
          onCancel={handleClose}
          onSubmit={handleSubmit}
        />
      </div>
    </div>,
    document.body
  );
}
