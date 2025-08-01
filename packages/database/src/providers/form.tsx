import * as ReactHookForm from 'react-hook-form';

interface Props extends ReactHookForm.FormProviderProps {}

export function FormProvider(props: Props) {
  return <ReactHookForm.FormProvider {...props} />;
}
