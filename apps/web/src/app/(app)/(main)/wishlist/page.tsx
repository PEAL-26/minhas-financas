import { PageLayout } from '@/components/layouts/page';
import { ListWishlistActions } from '@/components/templates/wishlist/actions';
import { ListWishlistsTemplate } from '@/components/templates/wishlist/list';
import { MAIN_MENUS } from '@repo/constants/menus';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: MAIN_MENUS.WISHLIST.title,
  description: MAIN_MENUS.WISHLIST.description,
};

export default function Page() {
  return (
    <PageLayout
      title={String(metadata.title)}
      description={String(metadata?.description || '')}
      actions={<ListWishlistActions />}
    >
      <ListWishlistsTemplate />
    </PageLayout>
  );
}
