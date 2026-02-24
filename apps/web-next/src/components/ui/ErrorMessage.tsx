interface ErrorMessageProps {
  title?: string;
  message: string;
}

export function ErrorMessage({
  title = 'エラーが発生しました',
  message,
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm"
    >
      <p className="font-semibold text-red-400">{title}</p>
      <p className="mt-1 text-red-300">{message}</p>
    </div>
  );
}
