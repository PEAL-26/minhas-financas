'use client';

import { SearchFormButton } from '@/components/ui/search-form-button';

interface Props {}

export function ListWalletActions(props: Props) {
  const {} = props;

  return (
    <div className="flex items-center gap-2">
      <SearchFormButton />
    </div>
  );
}
