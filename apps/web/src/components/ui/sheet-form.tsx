import { LoadingDataForm } from '@/components/ui/loading-data-form';
import { useCRUD } from '@repo/database/hooks/use-crud';
import { categorySchema } from '@repo/types/schemas/category';
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
import { ReactNode } from 'react';

interface Props {
  id?: string;
  open?: boolean;
  entity?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  isSubmitting?: boolean;
  isLoadingData?: boolean;
  form: any;
  onConfirm?(): void;
  onClose?(): void;
}

export function SheetForm(props: Props) {
  const {
    open,
    id,
    entity = '',
    title,
    description,
    children,
    isSubmitting,
    isLoadingData,
    form,
    onConfirm,
    onClose,
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

  const crud = useCRUD({ repositoryName: 'category', op: 'create', schema: categorySchema });

  return (
    <Form {...form}>
      <form>
        <Sheet open={open} onOpenChange={handleChangeOpen}>
          <SheetContent>
            <LoadingDataForm isLoading={!!id && isLoadingData}>
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
                  onClick={() => {
                    crud?.create?.handle?.();
                  }}
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
