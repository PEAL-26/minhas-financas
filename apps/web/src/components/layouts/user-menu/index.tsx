'use client';
import { useAuthContext } from '@/contexts/auth-context';
import {
  Avatar,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@/libs/material-tailwind';
import { ArrowLeftOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

export function UserMenu() {
  const { user, logout } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Erro a fazer logout');
    }
  };

  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <IconButton variant="text" color="blue-gray">
          <UserCircleIcon className="text-blue-gray-500 h-5 w-5" />
        </IconButton>
      </MenuHandler>
      <MenuList className="w-max border-0">
        <div className="mb-4 flex max-w-[200px] flex-col items-center justify-center text-center">
          <Avatar src={user?.avatar} alt={user?.name} size="lg" variant="circular" />
          <Typography variant="small" color="blue-gray" className="mt-2 font-normal">
            <strong>{user?.name}</strong>
          </Typography>
          <Typography
            variant="small"
            color="blue-gray"
            className="flex items-center gap-1 text-xs font-normal opacity-60"
          >
            {user?.email}
          </Typography>
        </div>
        <MenuItem className="flex gap-2" onClick={() => router.push('/perfil')}>
          <UserCircleIcon className="text-blue-gray-500 h-5 w-5" />
          <Typography variant="small" color="blue-gray" className="font-normal">
            Perfil
          </Typography>
        </MenuItem>
        <MenuItem className="flex gap-2" onClick={handleLogout}>
          <ArrowLeftOnRectangleIcon className="h-5 w-5 text-red-600" />
          <Typography variant="small" color="red" className="font-normal text-red-600">
            Sair
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
