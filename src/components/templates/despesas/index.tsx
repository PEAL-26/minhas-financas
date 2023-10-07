"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Table } from "@/components/compounds/table";
import { formatCurrencyKz } from "@/helpers/format-number";
import { Container } from "@/components/compounds/container";
import { useBreadcrumbsContext } from "@/contexts/breadcrumbs-context";
import { DespesasProps, listarTodosDespesas } from "@/services/despesas";

import { ActionButtonsAdd, ActionButtonsMenu } from "./action-buttons";
import { useLogicTable } from "./logic";

export function MainContent() {
  const { setBreadcrumbs } = useBreadcrumbsContext();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["despesas"],
    queryFn: () =>
      listarTodosDespesas({
        orderBy: [["data", "desc"]],
      }),
  });

  const {
    currentPage,
    paginatedData,
    total,
    totalPages,
    handleFilter,
    handlePageChange,
  } = useLogicTable({ data: data || [], itemsPerPage: 10 });

  if (isError) return null;

  return (
    <Container.Root>
      <Container.Header title="Despesas">
        <ActionButtonsAdd />
      </Container.Header>
      <Container.Body>
        <Table.Root>
          <Table.Header
            cols={[
              "Descrição",
              "Local",
              "Data",
              "Data de Término",
              "Preço",
              "Qtd",
              "Total",
              "",
            ]}
          />
          <Table.Body>
            {isLoading && <Table.Loading />}
            {paginatedData.map((despesa, index) => (
              <Table.Row key={index}>
                <Table.Data data={despesa.descricao} />
                <Table.Data data={despesa.local} />
                <Table.Data data={despesa.data.toDateString()} />
                <Table.Data data={despesa.data_termino?.toDateString()} />
                <Table.Data data={formatCurrencyKz(despesa.preco)} />
                <Table.Data data={despesa.quantidade.toString()} />
                <Table.Data data={formatCurrencyKz(despesa.total)} />
                <Table.Data>
                  <ActionButtonsMenu id={despesa.id} />
                </Table.Data>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            colSpan={8}
          />
        </Table.Root>
      </Container.Body>
    </Container.Root>
  );
}
