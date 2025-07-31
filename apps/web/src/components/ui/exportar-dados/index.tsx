'use client';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { TfiExport } from 'react-icons/tfi';

import { listarTodosDespesas } from '@/services/despesas';

export function ExportarDados() {
  const [exportedData, setExportedData] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);

  const exportToTxt = async () => {
    try {
      setLoading(true);
      const despesas = await listarTodosDespesas();
      const formattedData = despesas.map((despesa) => {
        const { data, data_termino, local, descricao, quantidade, preco, total } = despesa;

        const dataStr = data.toLocaleDateString('pt-PT');
        const dataTerminoStr = data_termino ? data_termino.toLocaleDateString('pt-PT') : '';

        return `${dataStr};${dataTerminoStr};${local};${descricao};${quantidade};${preco};${total}`;
      });

      const txtContent = formattedData.join('\n');
      const blob = new Blob([txtContent], { type: 'text/plain' });

      setExportedData(blob);

      console.log(`Dados exportados para o arquivo`);
    } catch (error) {
      console.error('Erro ao exportar dados para TXT:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (exportedData) {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(exportedData);
      downloadLink.download = 'dados_exportados.txt';
      downloadLink.click();
      setExportedData(null);
    }
  }, [exportedData]);

  return (
    <button
      type="button"
      disabled={loading}
      data-loading={loading}
      onClick={exportToTxt}
      className="group flex gap-2 rounded-lg border border-gray-100 bg-gray-100 p-2.5 hover:bg-gray-300 data-[loading=true]:cursor-wait"
    >
      {loading && (
        <AiOutlineLoading className="fill-gray text-gray h-3 w-3 animate-spin" size={18} />
      )}
      {!loading && <TfiExport className="fill-gray-600 group-hover:fill-gray-900" size={18} />}
      Exportar
    </button>
  );
}
