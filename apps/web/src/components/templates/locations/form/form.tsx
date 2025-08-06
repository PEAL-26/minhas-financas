import { SheetForm } from '@/components/ui/sheet-form';
import { FORM_DESCRIPTION } from '@repo/constants/forms';
import { useMutation } from '@repo/database/hooks/crud';
import { LocationSchemaType } from '@repo/types/schemas';
import { FormControlCustom } from '@repo/ui/form/control';
import { InputFormControl } from '@repo/ui/form/control/input';
import { showToastError } from '@repo/ui/helpers/toast';

import { LOCATION_TYPE_MAP } from '@repo/types/location';
import { cn } from '@repo/ui/lib/utils';
import { LocationFormProps } from './types';

export function LocationFormSheet(props: LocationFormProps) {
  const { id, open, onClose } = props;

  const mutation = useMutation<LocationSchemaType>({
    id,
    loadingData: open,
    defaultValues: {},
    repositoryName: 'location',
    queryKey: ['locations'],
    onSuccess: () => {
      onClose?.();
    },
    onError: (error) => {
      showToastError(error);
    },
  });

  const location = mutation.form.watch();

  return (
    <SheetForm
      id={id}
      open={open}
      entity="local"
      description={FORM_DESCRIPTION.LOCATION}
      form={mutation?.form}
      isLoadingData={mutation?.isLoadingData}
      isErrorLoadingData={!!mutation?.loadingDataError}
      isSubmitting={mutation?.isSubmitting}
      onClose={onClose}
      onConfirm={mutation?.handle}
      onReload={mutation?.reload}
      contentClassName="gap-0"
    >
      <div className="grid h-full flex-1 auto-rows-min gap-6 overflow-y-auto px-4">
        <FormControlCustom control={mutation.form.control} name="type" label="Local">
          {({ field }) => (
            <div className="grid w-full grid-cols-2 gap-3">
              {Object.entries(LOCATION_TYPE_MAP).map(([key, value]) => (
                <div
                  onClick={() => field.onChange(key)}
                  className={cn(
                    'flex flex-col items-center justify-center gap-1 rounded-lg border p-3 transition-all hover:cursor-pointer hover:bg-gray-100',
                    field.value === key && 'bg-gray-100',
                  )}
                >
                  {/* <IconComponent name={value.icon as any} /> */}
                  <span className="text-center text-xs">{value.display}</span>
                </div>
              ))}
            </div>
          )}
        </FormControlCustom>
        <InputFormControl
          label="Nome"
          control={mutation?.form?.control}
          name="name"
          placeholder="Ex.: Mercado, Fornecedor João Paulo, Amazon"
        />
      </div>
    </SheetForm>
  );
}
