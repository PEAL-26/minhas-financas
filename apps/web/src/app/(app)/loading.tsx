import { Loading } from '@/components/compounds/loading';

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <Loading />
    </div>
  );
}
