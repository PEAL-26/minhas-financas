import { useEffect, useState } from 'react';

export function useOpenModal() {
  const [mountComponent, setMountComponent] = useState(false);
  const [openComponent, setOpenComponent] = useState(false);

  const handleOpen = () => {
    setMountComponent(true);
  };

  const handleClose = () => {
    setOpenComponent(false);
    setTimeout(() => {
      if (mountComponent) {
        setMountComponent(false);
      }
    }, 300);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (mountComponent) {
        setOpenComponent(true);
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [mountComponent]);

  return { openComponent, mountComponent, handleClose, handleOpen };
}
