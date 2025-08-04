import { SheetForm } from '@/components/ui/sheet-form';
import { FORM_DESCRIPTION } from '@repo/constants/forms';
import { useGetByIdCategory, useMutationCategory } from '@repo/database/hooks/category';
import { Button } from '@repo/ui/button';
import { ColorPicker } from '@repo/ui/color-picker';
import { InputFormControl } from '@repo/ui/form/control/input';
import { showToastError } from '@repo/ui/helpers/toast';
import { IconPicker } from '@repo/ui/icon-picker';
import { LaughIcon, PaletteIcon } from '@repo/ui/lib/lucide';
import { CategoryFormProps } from './types';

export function CategoryFormSheet(props: CategoryFormProps) {
  const { id, open, onClose } = props;

  const category = useGetByIdCategory({ id });
  const mutation = useMutationCategory({
    id,
    reset: open,
    defaultValues: category?.data,
    onSuccess: () => {
      onClose?.();
    },
    onError: (error) => {
      showToastError(error);
    },
  });

  return (
    <SheetForm
      id={id}
      open={open}
      onClose={onClose}
      //onConfirm={ha}
      entity="categoria"
      description={FORM_DESCRIPTION.CATEGORY}
      form={mutation.form}
      isLoadingData={category.isFetching}
      isSubmitting={mutation.isSubmitting}
    >
      <div className="grid flex-1 auto-rows-min gap-6 px-4">
        <div className="grid gap-3">
          <div className="flex items-center gap-1">
            <div className="h-10 w-10 rounded-full bg-red-400"></div>
            <div className="flex flex-col gap-2">
              <ColorPicker modal>
                <Button>
                  <PaletteIcon size={16} />
                </Button>
              </ColorPicker>
              <IconPicker>
                <Button>
                  <LaughIcon size={16} />
                </Button>
              </IconPicker>
            </div>
          </div>
        </div>
        <div className="grid gap-3">
          <InputFormControl
            label="Nome"
            control={mutation.form.control}
            name="name"
            placeholder="Ex.: Transporte, Alimentação, Lazer"
          />
        </div>
      </div>
    </SheetForm>
  );
}
