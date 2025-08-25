import { ListLocationsTemplate } from '@/components/templates/locations/list';
import { SETTINGS_MENUS } from '@repo/constants/menus';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: SETTINGS_MENUS.LOCATIONS.title,
  description: SETTINGS_MENUS.LOCATIONS.description,
};

export default function Page() {
  return <ListLocationsTemplate />;
}
