import * as ReactHookForm from 'react-hook-form';

interface Props<
  TFieldValues extends ReactHookForm.FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
> extends ReactHookForm.FormProviderProps<TFieldValues, TContext, TTransformedValues> {}

export function FormProvider<
  TFieldValues extends ReactHookForm.FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>(props: Props<TFieldValues, TContext, TTransformedValues>) {
  return <ReactHookForm.FormProvider {...props} />;
}
