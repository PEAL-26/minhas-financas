import { PRIORITY_ENUM, PRIORITY_MAP } from '@repo/types/priority';
import { FormControlCustom } from '@repo/ui/form/control';
import { cn } from '@repo/ui/lib/utils';

interface Props {
  form: any;
  require?: boolean;
}

export function PriorityFormComponent(props: Props) {
  const { form, require } = props;

  return (
    <FormControlCustom require={require} control={form.control} name="priority" label="Prioridade">
      {({ field }) => (
        <div className="grid w-full grid-cols-3 gap-3">
          {Object.entries(PRIORITY_MAP).map(([key, value]) => (
            <div
              onClick={() => field.onChange(Number(key))}
              className={cn(
                'flex w-full flex-col items-center justify-center gap-1 rounded-lg border p-3 transition-all hover:cursor-pointer hover:bg-gray-100',
                String(field.value || PRIORITY_ENUM.NORMAL) === key && 'bg-gray-100',
              )}
            >
              <span className="text-center text-xs">{value.display}</span>
            </div>
          ))}
        </div>
      )}
    </FormControlCustom>
  );
}
