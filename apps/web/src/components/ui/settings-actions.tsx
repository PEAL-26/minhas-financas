'use client';
import { useOpenModal } from '@/hooks/use-open-modal';
import { Button } from '@repo/ui/button';
import { PlusIcon } from '@repo/ui/lib/lucide';
import { AccountFormSheet } from '../templates/accounts/form';
import { CategoryFormSheet } from '../templates/categories/form';
import { SearchFormButton } from './search-form-button';

interface Props {
  type: 'settings' | 'accounts' | 'categories' | 'locations';
}

export function SettingsActions(props: Props) {
  const { type } = props;

  if (type === 'accounts') {
    return <SettingsActionsAccount />;
  }

  if (type === 'categories') {
    return <SettingsActionsCategories />;
  }

  return null;
}

function SettingsActionsAccount() {
  const { openComponent, mountComponent, handleOpen, handleClose } = useOpenModal();

  return (
    <>
      <div className="flex items-center gap-2">
        <SearchFormButton />
        <Button variant="default" size="default" className="gap-1" onClick={handleOpen}>
          <PlusIcon className="size-4 text-white" /> Adicionar
        </Button>
      </div>

      {mountComponent && <AccountFormSheet open={openComponent} onClose={handleClose} />}
    </>
  );
}

function SettingsActionsCategories() {
  const { openComponent, mountComponent, handleOpen, handleClose } = useOpenModal();

  return (
    <>
      <div className="flex items-center gap-2">
        <SearchFormButton />
        <Button variant="default" size="default" className="gap-1" onClick={handleOpen}>
          <PlusIcon className="size-4 text-white" /> Adicionar
        </Button>
      </div>

      {mountComponent && <CategoryFormSheet open={openComponent} onClose={handleClose} />}
    </>
  );
}
