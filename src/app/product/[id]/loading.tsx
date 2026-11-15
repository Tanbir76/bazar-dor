
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-100 border-t-green-600" />

        <p className="text-sm font-medium text-green-700">
          Loading...
        </p>
      </div>
    </div>
  );
}