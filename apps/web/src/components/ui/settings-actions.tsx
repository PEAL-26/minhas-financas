'use client';
import { Button } from '@repo/ui/button';
import { PlusIcon, SearchIcon } from '@repo/ui/lib/lucide';
import { useState } from 'react';
import { CategoryFormSheet } from '../templates/categories/form';

interface Props {
  type: 'settings' | 'accounts' | 'categories';
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
  return <></>;
}

function SettingsActionsCategories() {
  const [formSheetOpen, setFormSheetOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <Button className="mr-2">
          <SearchIcon className="size-4 text-gray" />
        </Button>
        <Button
          variant="default"
          size="default"
          className="gap-1"
          onClick={() => setFormSheetOpen(true)}
        >
          <PlusIcon className="size-4 text-white" /> Adicionar
        </Button>
      </div>

      <CategoryFormSheet open={formSheetOpen} onClose={() => setFormSheetOpen(false)} />
    </>
  );
}
