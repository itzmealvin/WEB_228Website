export default function Loading() {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-6 w-1/3 rounded-sm bg-gray-300" />
      <div className="h-4 w-full rounded-sm bg-gray-200" />
      <div className="h-4 w-5/6 rounded-sm bg-gray-200" />
      <div className="h-4 w-2/3 rounded-sm bg-gray-200" />
    </div>
  );
}
