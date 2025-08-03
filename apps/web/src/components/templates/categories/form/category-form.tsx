import { LoadingDataForm } from '@/components/ui/loading-data-form';
import { useGetByIdCategory, useMutationCategory } from '@repo/database/hooks/category';
import { FormProvider } from '@repo/database/providers/form';
import { Button } from '@repo/ui/button';
import { Input } from '@repo/ui/input';
import { Label } from '@repo/ui/label';
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
import { CategoryFormProps } from './types';

export function CategoryFormSheet(props: CategoryFormProps) {
  const { id, open, onClose } = props;

  const category = useGetByIdCategory({ id });
  const mutation = useMutationCategory({
    id,
    defaultValues: category?.data,
    onSuccess: () => {
      handleChangeOpen(false);
    },
    onError: (error) => {
      // mostrar mensagem de erro
      console.log(error);
    },
  });

  const handleChangeOpen = (state: boolean) => {
    if (category.isFetching) return;
    if (mutation.isSubmitting) return;

    if (!state) {
      onClose?.();
    }
  };

  return (
    <FormProvider {...mutation.form}>
      <form onSubmit={mutation.handleFormSubmit}>
        <Sheet open={open} onOpenChange={handleChangeOpen}>
          <SheetContent>
            <LoadingDataForm isLoading={!!id && category.isFetching}>
              <SheetHeader>
                <SheetTitle>{id ? 'Editar Categoria' : 'Adicionar nova categoria'}</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you&apos;re done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                <div className="grid gap-3">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    placeholder="ex.: Alimentação"
                    {...mutation.form.register('name')}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="icon">Ícone</Label>
                  <Input id="icon" {...mutation.form.register('icon')} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="color">Cor</Label>
                  <Input id="color" {...mutation.form.register('color')} />
                </div>
              </div>
              <SheetFooter>
                <Button
                  type="submit"
                  variant="default"
                  size="default"
                  className="text-white"
                  disabled={mutation.isSubmitting}
                  onClick={mutation.handleFormSubmit}
                >
                  {mutation.isSubmitting ? (
                    <Loader2Icon className="size-4 animate-spin" />
                  ) : (
                    'Guardar'
                  )}
                </Button>
                <SheetClose
                  asChild
                  disabled={mutation.isSubmitting}
                  onClick={() => handleChangeOpen(false)}
                >
                  <Button variant="outline" size="default">
                    Fechar
                  </Button>
                </SheetClose>
              </SheetFooter>
            </LoadingDataForm>
          </SheetContent>
        </Sheet>
      </form>
    </FormProvider>
  );
}
