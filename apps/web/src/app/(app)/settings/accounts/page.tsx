import { ListAccountsTemplate } from '@/components/templates/accounts/list';
import { SETTINGS_MENUS } from '@repo/constants/menus';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: SETTINGS_MENUS.ACCOUNTS.title,
  description: SETTINGS_MENUS.ACCOUNTS.description,
};

export default function Page() {
  return <ListAccountsTemplate />;
}
