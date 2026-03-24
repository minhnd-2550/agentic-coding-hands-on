interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-[#998C5F]/20 px-6 py-12 text-center">
      <p className="font-montserrat text-sm font-bold text-[#999]">{message}</p>
    </div>
  );
}
