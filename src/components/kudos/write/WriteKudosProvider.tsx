"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface WriteKudosContextValue {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const WriteKudosContext = createContext<WriteKudosContextValue | null>(null);

export function WriteKudosProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <WriteKudosContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </WriteKudosContext.Provider>
  );
}

export function useWriteKudosContext() {
  const context = useContext(WriteKudosContext);
  if (!context) {
    throw new Error("useWriteKudosContext must be used within WriteKudosProvider");
  }
  return context;
}
