export function Skeleton() {
  return (
    <div className="p-4 space-y-4 border border-gray-200 rounded shadow animate-pulse w-full ">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="h-2.5 bg-gray-300 rounded-full w-40 mb-2.5" />
          <div className="h-2.5 bg-gray-300 rounded-full w-16 mb-2.5" />
          <div className="h-2.5 bg-gray-300 rounded-full w-16 mb-2.5" />
          <div className="h-2.5 bg-gray-300 rounded-full w-16 mb-2.5" />
          <div className="h-2.5 bg-gray-300 rounded-full w-16 mb-2.5" />
          <div className="h-2.5 bg-gray-300 rounded-full w-16 mb-2.5" />
          <div className="h-2.5 bg-gray-300 rounded-full w-16 mb-2.5" />
          <div className="h-2.5 bg-gray-300 rounded-full w-12" />
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
