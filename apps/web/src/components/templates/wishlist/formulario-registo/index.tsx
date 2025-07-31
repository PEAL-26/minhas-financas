'use client';
import { Loading } from '@/components/ui/loading';
import { TIPO_NECESSIDADE, TipoNecessidadeKey } from '@/services/necessidades';
import { useFormularioRegisto } from './use-formulario-registo';

interface FormularioRegistoNecessidadeProps {
  id?: string;
}

export function FormularioRegistoNecessidade(props: FormularioRegistoNecessidadeProps) {
  const { id } = props;
  const { isLoading, saving, errors, register, handleSubmit, onSubmit, setError } =
    useFormularioRegisto(id);

  const tiposNecessidades = Object.keys(TIPO_NECESSIDADE) as TipoNecessidadeKey[];

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-10">
        <Loading size={112} />
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="flex w-2/3 flex-col">
          <label htmlFor="descricao">Item</label>
          <input
            type="text"
            placeholder="Produto\Serviço"
            {...register('item', {
              required: 'Campo Obrigatório',
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900"
          />
          {errors.item && <span className="text-red-600">{errors.item.message}</span>}
        </div>
        <div className="flex w-1/3 flex-col">
          <label htmlFor="categoria">Categoria</label>
          <input
            type="text"
            placeholder="Categoria"
            {...register('categoria', {
              required: 'Campo Obrigatório',
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900"
          />
          {errors.categoria && <span className="text-red-600">{errors.categoria.message}</span>}
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="descricao">Descrição</label>
        <textarea
          {...register('descricao')}
          rows={3}
          placeholder="Descrição..."
          className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900"
        />
      </div>

      <div className="flex gap-2">
        <div className="flex w-full flex-col">
          <label htmlFor="prioridade">Prioridade</label>
          <select
            placeholder="Selecione a prioridade (minima, normal, máxima)"
            {...register('prioridade', {
              required: 'Campo Obrigatório',
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900"
            value={1}
          >
            <option value={0}>Mínima</option>
            <option value={1}>Normal</option>
            <option value={2}>Máxima</option>
          </select>
          {errors.prioridade && <span className="text-red-600">{errors.prioridade.message}</span>}
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="tipo">Tipo</label>
          <select
            placeholder="Selecione a tipo (única, semanal, mensal, anual)"
            {...register('tipo', {
              required: 'Campo Obrigatório',
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900"
          >
            {tiposNecessidades.map((tipo) => (
              <option key={tipo} value={tipo}>
                {TIPO_NECESSIDADE[tipo].display}
              </option>
            ))}
          </select>
          {errors.tipo && <span className="text-red-600">{errors.tipo.message}</span>}
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="valor">Valor</label>
        <input
          type="text"
          {...register('valor', {
            required: 'Campo Obrigatório',
            min: { message: 'O valor não pode ser 0 ou negativo', value: 1 },
            valueAsNumber: true,
            validate: (valor) => {
              if (Number.isNaN(valor)) {
                setError('valor', { message: 'O valor não é um número.' });
                return 'O valor não é um número';
              }
            },
          })}
          className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900"
        />
        {errors.valor && <span className="text-red-600">{errors.valor.message}</span>}
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
