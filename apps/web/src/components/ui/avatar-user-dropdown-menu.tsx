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

export function AvatarUserDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button variant="outline">Open</Button> */}
        <div className="h-14 w-14 rounded-lg bg-white hover:cursor-pointer">
          {/* Abrir um dropdown com o menu Perfil e Sair */}
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
