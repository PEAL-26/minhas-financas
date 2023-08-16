import { GastosProps } from "@/services/gastos";
import { Filtro } from "./filtro";
import { formatCurrencyKz } from "@/helpers/format-number";
import { Console } from "console";
import { useState } from "react";

interface TableProps {
  data: GastosProps[];
}

export function Table({ data }: TableProps) {
  const [filtro, setFiltro] = useState("");

  const filtroLike = (
    array: GastosProps[],
    searchTerm: string
  ): GastosProps[] => {
    const regex = new RegExp(searchTerm, "i");

    return array.filter(
      (item) => regex.test(item.descricao) || regex.test(item.local || "")
    );
  };

  const handleFilter = (filter: string) => {
    setFiltro(filter);
  };

  const filteredData =
    filtro.trim().length > 1 ? filtroLike(data, filtro) : data;

  return (
    <div className="relative overflow-x-auto p-2">
      <Filtro onSearch={handleFilter} />
      <table className="w-full text-left text-sm text-gray-500 ">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
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
          {filteredData.length === 0 && (
            <div
              aria-colspan={8}
              className="flex h-20 w-full flex-1 items-center justify-center"
            >
              <span className="text-center ">Não possui nenhum registo!</span>
            </div>
          )}
          {filteredData.map((item) => (
            <tr key={item.id} className="border-b bg-white hover:bg-gray-50">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
              >
                {item.descricao}
              </th>
              <td className="px-6 py-4">{item.local}</td>
              <td className="px-6 py-4">{item.data.toDateString()}</td>
              <td className="px-6 py-4">{item.data_termino?.toDateString()}</td>
              <td className="px-6 py-4">{formatCurrencyKz(item.preco)}</td>
              <td className="px-6 py-4">{item.quantidade}</td>
              <td className="px-6 py-4">{formatCurrencyKz(item.total)}</td>
              <td className="flex gap-2 px-6 py-4">
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
