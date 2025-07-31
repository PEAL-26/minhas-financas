interface SkeletonPros {
  rows?: number;
  cols?: number;
}
export function Skeleton({ rows = 5, cols = 8 }: SkeletonPros) {
  return (
    <div className="w-full animate-pulse space-y-4 rounded p-4 shadow">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="flex items-center justify-between">
          {Array.from({ length: cols }).map((_, index) => {
            if (index === 0)
              return <div key={index} className="mb-2.5 h-2.5 w-40 rounded-full bg-gray-300" />;

            return <div key={index} className="mb-2.5 h-2.5 w-16 rounded-full bg-gray-300" />;
          })}
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
