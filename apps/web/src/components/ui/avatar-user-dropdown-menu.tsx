import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  // DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@repo/ui/dropdown-menu';
import Link from 'next/link';

interface Props {
  user: { name: string; avatarUrl?: string };
}

export function AvatarUserDropdownMenu(props: Props) {
  const { user } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button variant="outline">Open</Button> */}
        <div>
          <Avatar className="h-14 w-14 rounded-lg bg-white hover:cursor-pointer">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback className="text-2xl font-bold text-gray-400">
              {user?.name?.split(' ')?.[0]?.substring(0, 1)?.toUpperCase() || ''}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              Perfil
              {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/logout">
            Sair
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
