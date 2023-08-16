import { GastosProps } from "@/services/gastos";
import { Filtro } from "./filtro";

interface TableProps {
  data: GastosProps[];
}

export function Table({ data }: TableProps) {
  return (
    <div className="relative overflow-x-auto shadow  p-2">
      <Filtro />
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Descrição
            </th>
            <th scope="col" className="px-6 py-3">
              Local
            </th>
            <th scope="col" className="px-6 py-3">
              Data
            </th>
            <th scope="col" className="px-6 py-3">
              Data de Término
            </th>
            <th scope="col" className="px-6 py-3">
              Preço
            </th>
            <th scope="col" className="px-6 py-3">
              QTD
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3">
              Ação
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <div
              aria-colspan={8}
              className="flex-1 w-full h-20 flex justify-center items-center"
            >
              <span className="text-center ">Não possui nenhum registo!</span>
            </div>
          )}
          {data.map((item) => (
            <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {item.descricao}
              </th>
              <td className="px-6 py-4">{item.local}</td>
              <td className="px-6 py-4">{item.data.toDateString()}</td>
              <td className="px-6 py-4">{item.data_termino?.toDateString()}</td>
              <td className="px-6 py-4">{item.preco} Kz</td>
              <td className="px-6 py-4">{item.quantidade}</td>
              <td className="px-6 py-4">{item.total} Kz</td>
              <td className="px-6 py-4 flex gap-2">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Edit
                </a>
                <a
                  href="#"
                  className="font-medium text-red-600 hover:underline"
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
