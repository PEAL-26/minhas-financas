import { PageLayout } from '@/components/layouts/page';
import { ListWalletActions } from '@/components/templates/wallet/actions';
import { AddWalletButton } from '@/components/templates/wallet/actions/add-wallet-button';
import { ListTransactionsWalletsTemplate } from '@/components/templates/wallet/list/transactions';
import { ListWalletsTemplate } from '@/components/templates/wallet/list/wallets';
import { MAIN_MENUS } from '@repo/constants/menus';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: MAIN_MENUS.WALLET.title,
  description: MAIN_MENUS.WALLET.description,
};

export default function Page() {
  return (
    <PageLayout
      title={String(metadata.title)}
      description={String(metadata?.description || '')}
      actions={<ListWalletActions />}
      contentClassName=""
    >
      <div className="grid grid-cols-2">
        {/* Balance and Wallets */}
        <div>
          {/* Balance */}
          <div className="flex rounded-md border bg-white p-4 shadow-md">
            <div className="flex flex-1 flex-col items-center justify-center">
              <h2 className="text-xs font-bold text-gray-700">Saldo Total</h2>
              <p className="text-lg font-bold text-green-600">0,00 Kz</p>
              <span className="text-xs text-gray-500">
                <span className="text-primary">0</span> Carteira(s)
              </span>
            </div>
          </div>

          {/* Wallets */}
          <div className="mt-4 rounded-md border">
            <div className="mb-2 flex items-center justify-between border-b px-3 py-2">
              <h2 className="text-xl font-bold">Minhas Carteiras</h2>
              <AddWalletButton />
            </div>
            <div className="px-3 py-2">
              {/* Placeholder for no wallets */}
              <ListWalletsTemplate />
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div>
          transações
          <ListTransactionsWalletsTemplate />
        </div>
      </div>
    </PageLayout>
  );
}
