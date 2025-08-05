import { SheetForm } from '@/components/ui/sheet-form';
import { FORM_DESCRIPTION } from '@repo/constants/forms';
import { useMutation } from '@repo/database/hooks/crud';
import { colorGenerate } from '@repo/helpers/color-generate';
import { CategorySchemaType } from '@repo/types/schemas';
import { ColorPicker } from '@repo/ui/color-picker';
import { FormControlCustom } from '@repo/ui/form/control';
import { InputFormControl } from '@repo/ui/form/control/input';
import { showToastError } from '@repo/ui/helpers/toast';
import { IconComponent } from '@repo/ui/icon-component';
import { IconPicker } from '@repo/ui/icon-picker';
import { LaughIcon, PaletteIcon } from '@repo/ui/lib/lucide';
import { CategoryFormProps } from './types';

export function CategoryFormSheet(props: CategoryFormProps) {
  const { id, open, onClose } = props;

  const mutation = useMutation<CategorySchemaType>({
    id,
    loadingData: open,
    defaultValues: {
      icon: 'tag',
      color: colorGenerate().rgb,
    },
    repositoryName: 'category',
    queryKey: ['categories'],
    onSuccess: () => {
      onClose?.();
    },
    onError: (error) => {
      showToastError(error);
    },
  });

  const category = mutation.form.watch();

  return (
    <SheetForm
      id={id}
      open={open}
      entity="categoria"
      description={FORM_DESCRIPTION.CATEGORY}
      form={mutation?.form}
      isLoadingData={mutation?.isLoadingData}
      isErrorLoadingData={!!mutation?.loadingDataError}
      isSubmitting={mutation?.isSubmitting}
      onClose={onClose}
      onConfirm={mutation?.handle}
      onReload={mutation?.reload}
    >
      <div className="grid flex-1 auto-rows-min gap-6 px-4">
        <div className="grid gap-3">
          <div className="flex items-center gap-2">
            <div
              style={{ backgroundColor: category.color }}
              className="flex h-10 w-10 items-center justify-center rounded-full"
            >
              <IconComponent name={(category.icon as any) ?? 'tag'} className="size-4 text-white" />
            </div>
            <div className="flex h-full flex-col justify-between">
              <FormControlCustom
                control={mutation.form.control}
                name="color"
                containerClassName="space-y-0"
              >
                {({ field }) => (
                  <ColorPicker
                    modal
                    side="right"
                    align="start"
                    color={field.value}
                    onChangeColor={field.onChange}
                  >
                    <div className="hover:cursor-pointer">
                      <PaletteIcon size={16} />
                    </div>
                  </ColorPicker>
                )}
              </FormControlCustom>

              <FormControlCustom
                control={mutation.form.control}
                name="icon"
                containerClassName="space-y-0"
              >
                {({ field }) => (
                  <IconPicker
                    modal
                    side="right"
                    align="start"
                    value={(field.value as any) || 'tag'}
                    onValueChange={field.onChange}
                  >
                    <div className="hover:cursor-pointer">
                      <LaughIcon size={16} />
                    </div>
                  </IconPicker>
                )}
              </FormControlCustom>
            </div>
          </div>
        </div>
        <div className="grid gap-3">
          <InputFormControl
            label="Nome"
            control={mutation?.form?.control}
            name="name"
            placeholder="Ex.: Transporte, Alimentação, Lazer"
          />
        </div>
      </div>
    </SheetForm>
  );
}
