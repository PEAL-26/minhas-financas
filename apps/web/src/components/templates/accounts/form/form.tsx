import { SheetForm } from '@/components/ui/sheet-form';
import { FORM_DESCRIPTION } from '@repo/constants/forms';
import { useMutation } from '@repo/database/hooks/crud';
import { ACCOUNT_TYPE_ENUM_MAP } from '@repo/types/account';
import { AccountSchemaType } from '@repo/types/schemas';
import { FormControlCustom } from '@repo/ui/form/control';
import { InputFormControl } from '@repo/ui/form/control/input';
import { showToastError } from '@repo/ui/helpers/toast';
import { IconComponent } from '@repo/ui/icon-component';
import { cn } from '@repo/ui/lib/utils';
import { AccountFormProps } from './types';

export function AccountFormSheet(props: AccountFormProps) {
  const { id, open, onClose } = props;

  const mutation = useMutation<AccountSchemaType>({
    id,
    loadingData: open,
    defaultValues: {},
    repositoryName: 'account',
    queryKey: ['accounts'],
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
      entity="conta"
      description={FORM_DESCRIPTION.ACCOUNT}
      form={mutation?.form}
      isLoadingData={mutation?.isLoadingData}
      isErrorLoadingData={!!mutation?.loadingDataError}
      isSubmitting={mutation?.isSubmitting}
      onClose={onClose}
      onConfirm={mutation?.handle}
      onReload={mutation?.reload}
    >
      <div className="grid flex-1 auto-rows-min gap-6 px-4">
        <FormControlCustom
          control={mutation.form.control}
          name="type"
          containerClassName="space-y-0"
        >
          {({ field }) => (
            <div className="grid w-full grid-cols-3 gap-3">
              {Object.entries(ACCOUNT_TYPE_ENUM_MAP).map(([key, value]) => (
                <div
                  onClick={() => field.onChange(key)}
                  className={cn(
                    'flex flex-col items-center justify-center gap-1 rounded-lg border p-3 transition-all hover:cursor-pointer hover:bg-gray-100',
                    field.value === key && 'bg-gray-100',
                  )}
                >
                  <IconComponent name={value.icon as any} />
                  <span className="text-center text-xs">{value.display}</span>
                </div>
              ))}
            </div>
          )}
        </FormControlCustom>
        <InputFormControl
          control={mutation?.form?.control}
          label="Nome"
          name="name"
          placeholder="Ex.: Banco BAI, PayPal, Metamask"
        />
        <InputFormControl
          control={mutation?.form?.control}
          label="Moedas"
          name="currencies"
          placeholder="Ex.: AOA, USD, BTC"
        />
        <InputFormControl
          control={mutation?.form?.control}
          label="Site"
          name="siteUrl"
          placeholder="Ex.: www.site.com"
        />
        <InputFormControl
          control={mutation?.form?.control}
          label="Código Swift"
          name="swiftCode"
          placeholder="Ex.: PRTLAOLUXXX"
        />
      </div>
    </SheetForm>
  );
}
