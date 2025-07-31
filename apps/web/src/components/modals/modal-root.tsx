import { ReactNode, useEffect } from 'react';
import { cn } from '@repo/ui/lib/utils';

interface ModalRootProps {
  show?: boolean;
  onClose?(state: boolean): void;
  children?: ReactNode;
  className?: string;
}

export function ModalRoot(props: ModalRootProps) {
  const { children, show, className, onClose } = props;

  useEffect(() => {
    if (show) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [show]);

  const handleClose = () => {
    onClose && onClose(false);
  };

  return (
    <div
      data-show={show}
      className="fixed inset-0 z-[9999] h-full w-full items-center justify-center bg-black/50 data-[show=true]:flex data-[show=false]:hidden"
      onClick={(e) => e.target == e.currentTarget && handleClose()}
    >
      <div
        className={cn(
          'relative flex flex-col rounded-md bg-white p-5 pt-14 shadow',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
