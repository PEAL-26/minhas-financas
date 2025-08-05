import { LoadingDataForm } from '@/components/ui/loading-data-form';
import { Button } from '@repo/ui/button';
import { Form } from '@repo/ui/form';
import { Loader2Icon } from '@repo/ui/lib/lucide';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@repo/ui/sheet';
import { FormEvent, ReactNode } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformValues = TFieldValues,
> {
  id?: string;
  open?: boolean;
  entity?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  isSubmitting?: boolean;
  isLoadingData?: boolean;
  isErrorLoadingData?: boolean;
  form: UseFormReturn<TFieldValues, TContext, TTransformValues>;
  onSubmit?(e: FormEvent<HTMLFormElement>): void;
  onConfirm?(data: FieldValues): void;
  onClose?(): void;
  onReload?(): void;
}

export function SheetForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformValues = TFieldValues,
>(props: Props<TFieldValues, TContext, TTransformValues>) {
  const {
    open,
    id,
    form,
    entity = '',
    title,
    description,
    children,
    isSubmitting,
    isLoadingData,
    isErrorLoadingData,
    onConfirm,
    onSubmit,
    onClose,
    onReload,
  } = props;

  const titleDisplay = {
    title: title,
    entity: id ? `Editar ${entity}` : `Cadastrar ${entity}`,
  }[title ? 'title' : 'entity'];

  const handleChangeOpen = (state: boolean) => {
    if (isLoadingData) return;
    if (isSubmitting) return;

    if (!state) {
      onClose?.();
    }
  };

  const handleConfirm = () => {
    if (!form) return;

    const data = form?.getValues();
    onConfirm?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Sheet open={open} onOpenChange={handleChangeOpen}>
          <SheetContent>
            <LoadingDataForm
              isLoading={isLoadingData}
              isError={isErrorLoadingData}
              onReload={onReload}
            >
              <SheetHeader>
                <SheetTitle>{titleDisplay}</SheetTitle>
                {description && <SheetDescription>{description}</SheetDescription>}
              </SheetHeader>
              {children}
              <SheetFooter>
                <Button
                  type="submit"
                  variant="default"
                  size="default"
                  className="text-white"
                  disabled={isSubmitting || isLoadingData}
                  onClick={handleConfirm}
                >
                  {isSubmitting ? <Loader2Icon className="size-4 animate-spin" /> : 'Guardar'}
                </Button>
                <SheetClose asChild disabled={isSubmitting || isLoadingData} onClick={onClose}>
                  <Button variant="outline" size="default">
                    Fechar
                  </Button>
                </SheetClose>
              </SheetFooter>
            </LoadingDataForm>
          </SheetContent>
        </Sheet>
      </form>
    </Form>
  );
}
