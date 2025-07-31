import { Loading } from '@/components/ui/loading';

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <Loading />
    </div>
  );
}
