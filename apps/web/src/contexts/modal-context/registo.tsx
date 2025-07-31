import { Container } from '@/components/compounds/container';
import { Modal } from '@/components/modals';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { IconButton } from '@material-tailwind/react';
import { ReactNode } from 'react';

interface ModalRegistoContextProps {
  show: boolean;
  title: string;
  handleHide(): void;
  content: ReactNode;
}

export function ModalRegistoContext(props: ModalRegistoContextProps) {
  const { show, title, content, handleHide } = props;

  return (
    <Modal.Root show={show} onClose={close} className="bg-transparent p-0">
      <Container.Root>
        <Container.Header title={title}>
          <IconButton variant="text" color="white" onClick={handleHide}>
            <XMarkIcon className="h-6 w-6" />
          </IconButton>
        </Container.Header>
        <Container.Body className="p-5 pt-0">{content}</Container.Body>
      </Container.Root>
    </Modal.Root>
  );
}
