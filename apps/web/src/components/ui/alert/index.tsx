'use client';
import { cn } from '@repo/ui/lib/utils';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export interface AlertProps {
  children: ReactNode;
  show?: boolean;
  onHide?(): void;
}

export function Alert(props: AlertProps) {
  const { children, show = false, onHide } = props;
  const [isShow, setIsShow] = useState(false);

  const hide = useCallback(() => {
    setIsShow(false);

    setTimeout(() => {
      onHide && onHide();
    }, 300);
  }, [onHide]);

  useEffect(() => {
    const startTime = (time = 5000) =>
      setTimeout(() => {
        hide();
      }, time);

    if (show) {
      setIsShow(show);
      startTime();
    }

    return () => {
      clearTimeout(startTime());
    };
  }, [show, hide]);

  return (
    <div
      data-show={isShow}
      className={cn(
        'fixed z-[999999] w-full bg-red-600 transition-transform duration-300 ease-in-out data-[show=false]:-translate-y-full data-[show=true]:translate-y-0',
      )}
      role="alert"
    >
      <span className="sr-only">Error</span>
      <div className="relative flex h-full min-h-[48px] w-full items-center px-20 py-2">
        <button className="absolute right-4 top-2 rounded p-2 hover:bg-black/40" onClick={hide}>
          <AiOutlineClose size={16} className="text-black/60" />
        </button>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
