'use client';
import { FormEvent, useEffect, useState } from 'react';
import { AiFillCheckCircle, AiOutlineLoading } from 'react-icons/ai';

import { createBulkDespesas } from '@/services/despesas';

export default function ImportarDadosInput() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [content, setContent] = useState('');

  const formatPrice = (priceString: string) => {
    const formattedPrice = priceString
      .replace(/\s+/g, '') // Remove espaços
      .replace(/Kz/g, '') // Remove 'Kz'
      .replace(/,/g, '.') // Substitui ',' por '.'
      .replace(/\.0*$/, ''); // Remove todos os zeros após a vírgula, exceto se for maior que zero

    return parseFloat(formattedPrice); // Converte para float
  };

  const formatDate = (dateString: string) => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const processData = (content: string) => {
    const lines = content.split('\n').filter((line) => line.trim() !== '');

    const data = lines.slice(0).map((line) => {
      const values = line.split(';');
      return {
        data: formatDate(values[0]),
        data_termino: values[1] ? formatDate(values[1]) : null,
        local: values[2].trim(),
        descricao: values[3].trim(),
        quantidade: parseFloat(values[4]),
        preco: formatPrice(values[5]),
        total: formatPrice(values[6]),
      };
    });

    return data;
  };

  const handleImportar = async (data: FormEvent) => {
    data.preventDefault();
    if (success) return;

    try {
      setIsLoading(true);

      const data = processData(content);
      await createBulkDespesas(data);

      setContent('');
      setIsLoading(false);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const count =
      success &&
      setInterval(() => {
        setSeconds((prevSecond) => prevSecond + 1);
      }, 1000);

    return () => clearInterval(count || undefined);
  }, [success]);

  useEffect(() => {
    if (success && seconds == 5) {
      setSeconds(0);
      setSuccess(false);
    }
  }, [success, seconds]);

  return (
    <div className="mb-4 w-96 rounded-md bg-green-500 max-sm:w-full">
      <div
        data-success={success}
        className="w-full flex-col items-center justify-center gap-1 py-5 text-center transition-all duration-500 data-[success=true]:flex data-[success=false]:hidden"
      >
        <AiFillCheckCircle className="h-8 w-8 text-blue-700" />
        <span className="">Importação feita com sucesso!</span>
      </div>

      <div
        data-success={success}
        className="rounded-t-lg bg-gray/50 p-2 transition-all duration-500 data-[success=true]:hidden"
      >
        <label htmlFor="content" className="sr-only">
          Seus dados
        </label>
        <textarea
          id="content"
          rows={6}
          className="h-full w-full resize-none overflow-y-auto rounded-md border border-white/20 bg-gray/50 p-2 text-sm text-black placeholder-black focus:border-white/70 focus:outline-0 focus:ring-0"
          placeholder="Dados a importar content..."
          required
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </div>
      <div className="flex items-center justify-between rounded-b-md border-t border-green-700/20 bg-green-700 px-3 py-2">
        <button
          type="submit"
          data-loading={isLoading}
          disabled={isLoading}
          onClick={handleImportar}
          className="inline-flex items-center rounded-lg bg-white px-4 py-2.5 text-center text-xs font-medium text-black data-[loading=true]:cursor-not-allowed data-[loading=false]:hover:bg-white/70 max-sm:ml-5"
        >
          {isLoading && <AiOutlineLoading className="h-3 w-3 animate-spin fill-gray text-gray" />}
          {!isLoading && <>Importar</>}
        </button>
      </div>
    </div>
  );
}
