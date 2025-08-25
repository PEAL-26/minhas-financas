import { GeneralSettingsTemplate } from '@/components/templates/general-settings';
import { SETTINGS_MENUS } from '@repo/constants/menus';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: SETTINGS_MENUS.SETTINGS.title,
  description: SETTINGS_MENUS.SETTINGS.description,
};

export default function Page() {
  return <GeneralSettingsTemplate />;
}
