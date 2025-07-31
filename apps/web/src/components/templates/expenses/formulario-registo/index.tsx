'use client';
import { Loading } from '@/components/ui/loading';
import { useFormularioRegisto } from './use-formulario-registo';

interface FormularioRegistoDespesaProps {
  id?: string;
}

export function FormularioRegistoDespesa(props: FormularioRegistoDespesaProps) {
  const { id } = props;
  const {
    isLoading,
    saving,
    errors,
    register,
    handleSubmit,
    onSubmit,
    watch,
    calcularTotal,
    setError,
  } = useFormularioRegisto(id);

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-10">
        <Loading size={112} />
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className="flex gap-3">
        <div className="flex w-full flex-col">
          <label htmlFor="data">Data</label>
          <input
            type="date"
            {...register('data', {
              required: 'Campo Obrigatório',
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900"
            defaultValue={new Date().toISOString().substring(0, 10)}
          />
          {errors.data && <span className="text-red-600">{errors.data.message}</span>}
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="data_termino">Data Término</label>
          <input
            type="date"
            {...register('data_termino')}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="descricao">Descrição</label>
        <input
          type="text"
          {...register('descricao', {
            required: 'Campo Obrigatório',
          })}
          className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900"
        />
        {errors.descricao && <span className="text-red-600">{errors.descricao.message}</span>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="local">Local</label>
        <input
          type="text"
          {...register('local')}
          className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900"
        />
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col">
          <label htmlFor="quantidade">Quantidade</label>
          <input
            type="number"
            {...register('quantidade', {
              required: 'Campo Obrigatório',
              min: {
                message: 'A quantidade não pode ser 0 ou negativa',
                value: 1,
              },
              valueAsNumber: true,
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900"
            onChange={(e) => calcularTotal(parseFloat(e.target.value), watch('preco'))}
          />
          {errors.quantidade && <span className="text-red-600">{errors.quantidade.message}</span>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="preco">Preço</label>
          <input
            type="text"
            {...register('preco', {
              required: 'Campo Obrigatório',
              min: { message: 'O preço não pode ser 0 ou negativo', value: 1 },
              valueAsNumber: true,
              validate: (valor) => {
                if (Number.isNaN(valor)) {
                  setError('preco', { message: 'O valor não é um número.' });
                  return 'O valor não é um número';
                }
              },
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900"
            onChange={(e) => calcularTotal(watch('quantidade'), parseFloat(e.target.value))}
          />
          {errors.preco && <span className="text-red-600">{errors.preco.message}</span>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="total">Total</label>
          <input
            type="text"
            readOnly
            {...register('total')}
            // value={total}
            className="block w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900"
          />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="submit"
          data-loading={saving}
          disabled={saving}
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 data-[loading=true]:cursor-wait data-[loading=true]:bg-gray-700"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
