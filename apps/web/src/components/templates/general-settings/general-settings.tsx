'use client';

import { CurrencyModal } from '@/components/modals/currency';
import { DeleteConfirmModal } from '@/components/modals/delete-confirm';
import { RestoreBackupModal } from '@/components/modals/restore-backup';
import { Button } from '@repo/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/card';
import { Label } from '@repo/ui/label';
import {
  DatabaseIcon,
  DollarSignIcon,
  DownloadIcon,
  SettingsIcon,
  Trash2Icon,
  UploadIcon,
} from '@repo/ui/lib/lucide';
import { Separator } from '@repo/ui/separator';
import { useState } from 'react';

export function GeneralSettingsTemplate() {
  const [currency, setCurrency] = useState('AOA - Kwanza Angolano');
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleBackup = async () => {
    setIsBackingUp(true);

    // Simular processo de backup
    // setTimeout(() => {
    //   const backupData = {
    //     contas: [],
    //     carteiras: [],
    //     transacoes: [],
    //     categorias: [],
    //     despesas: [],
    //     rendimentos: [],
    //     locais: [],
    //     listasDesejos: [],
    //     exportedAt: new Date().toISOString(),
    //   };

    //   const blob = new Blob([JSON.stringify(backupData, null, 2)], {
    //     type: 'application/json',
    //   });
    //   const url = URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.download = `backup-financas-${new Date().toISOString().split('T')[0]}.json`;
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    //   URL.revokeObjectURL(url);

    //   setIsBackingUp(false);
    //   toast({
    //     title: 'Backup concluído',
    //     description: 'Seus dados foram exportados com sucesso.',
    //   });
    // }, 2000);
  };

  const handleDeleteAllData = () => {
    // Aqui você implementaria a lógica para apagar todos os dados
    // toast({
    //   title: 'Dados apagados',
    //   description: 'Todos os seus dados foram removidos permanentemente.',
    //   variant: 'destructive',
    // });
    setShowDeleteModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Seção: Aplicação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Aplicação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Label className="text-sm font-medium">Moeda Padrão</Label>
            <Button
              size="default"
              variant="outline"
              className="w-full justify-between bg-transparent"
              onClick={() => setShowCurrencyModal(true)}
            >
              <div className="flex items-center gap-2">
                <DollarSignIcon className="h-4 w-4" />
                {currency}
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Seção: Gestão de Dados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DatabaseIcon className="h-5 w-5" />
            Gestão de Dados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            size="default"
            variant="outline"
            className="w-full justify-start bg-transparent"
            onClick={handleBackup}
            disabled={isBackingUp}
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            {isBackingUp ? 'Criando backup...' : 'Cópia de Segurança'}
          </Button>

          <Button
            size="default"
            variant="outline"
            className="w-full justify-start bg-transparent"
            onClick={() => setShowRestoreModal(true)}
          >
            <UploadIcon className="mr-2 h-4 w-4" />
            Restaurar Cópia
          </Button>

          <Separator />

          <Button
            size="default"
            variant="outline"
            className="w-full justify-start bg-transparent text-destructive hover:text-destructive"
            onClick={() => setShowDeleteModal(true)}
          >
            <Trash2Icon className="mr-2 h-4 w-4" />
            Apagar Todos os Dados
          </Button>
        </CardContent>
      </Card>

      {/* Modais */}
      <CurrencyModal
        open={showCurrencyModal}
        onOpenChange={setShowCurrencyModal}
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
      />

      <DeleteConfirmModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        onConfirm={handleDeleteAllData}
      />

      <RestoreBackupModal open={showRestoreModal} onOpenChange={setShowRestoreModal} />
    </div>
  );
}
