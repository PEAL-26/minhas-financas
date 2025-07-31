'use client';
import { useModalContext } from '@/contexts/modal-context';
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@/libs/material-tailwind';
import { removeRenda } from '@/services/rendas';
import { EllipsisVerticalIcon, EyeIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

import { FormularioRegistoRenda } from './formulario-registo';

export function MenuActions({ id }: { id: string }) {
  const route = useRouter();

  const { showModalRegisto, showModalRemove } = useModalContext();

  const handleOpenEdit = () => showModalRegisto('Editar renda', <FormularioRegistoRenda id={id} />);

  const handleOpenRemove = () =>
    showModalRemove({
      id,
      removeFn: removeRenda,
      queryKey: ['rendas'],
    });

  const handleGoToDetalhes = () => route.push(`/rendas/${id}`);

  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <IconButton
          variant="outlined"
          className="group rounded-full border-green-50 focus:border-none focus:outline-none focus:ring-0"
        >
          <EllipsisVerticalIcon height={24} className="text-gray-500" />
        </IconButton>
      </MenuHandler>
      <MenuList className="w-max border-0">
        <MenuItem className="flex items-center gap-3" onClick={handleGoToDetalhes}>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
            <EyeIcon width={16} className="text-white" />
          </div>
          <Typography variant="small" className="whitespace-nowrap">
            Detalhes
          </Typography>
        </MenuItem>
        <MenuItem className="flex items-center gap-3" onClick={handleOpenEdit}>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600">
            <PencilIcon width={14} className="text-white" />
          </div>
          <Typography variant="small" className="whitespace-nowrap">
            Editar
          </Typography>
        </MenuItem>
        <MenuItem className="flex items-center gap-3" onClick={handleOpenRemove}>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600">
            <XMarkIcon width={16} className="text-white" />
          </div>
          <Typography variant="small" className="whitespace-nowrap">
            Remover
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
