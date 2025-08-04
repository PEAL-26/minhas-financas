import { Button } from '@repo/ui/button';
import { BellIcon } from '@repo/ui/lib/lucide';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover';

export function Notifications() {
  const hasNotifications = true;
  const notifications = [1, 2, 3, 4, 5, 6];
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="relative">
          {hasNotifications && (
            <div className="absolute -right-0.5 -top-1 h-2 w-2 rounded-full bg-red-600" />
          )}
          <BellIcon className="h-4 w-4 stroke-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-96 w-80 p-0" side="right" align="start">
        <div className="flex h-full flex-1 flex-col">
          <div className="p-4 pb-1">
            <span className="text-base font-bold text-black">Notificações</span>
          </div>
          <div className="flex h-full flex-1 flex-col gap-2 overflow-y-auto px-4 pb-4">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="relative flex flex-col rounded p-1 hover:cursor-pointer hover:bg-primary/10"
              >
                <span className="line-clamp-1 text-sm font-medium text-black">
                  Titulo da notificação
                </span>
                <span className="line-clamp-2 text-xs text-black/80">
                  Pequena descrição da notificação
                </span>

                <div className="absolute bottom-0 right-0 top-0 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-red-600" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between p-4 pt-1">
            <Button className="text-xs hover:underline">Marcar como lida</Button>
            <Button variant="default" size="default" className="text-xs">
              Ver todas
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
