"use client";
import { useEffect, useState } from "react";

import { Table } from "@/components/compounds/table";
import { formatCurrencyKz } from "@/helpers/format-number";
import { Container } from "@/components/compounds/container";
import { useBreadcrumbsContext } from "@/contexts/breadcrumbs-context";
import { DespesasProps, listarTodosDespesas } from "@/services/despesas";

import { ActionButtonsAdd, ActionButtonsMenu } from "./action-buttons";

export function MainContent() {
  const { setBreadcrumbs } = useBreadcrumbsContext();

  const [despesas, setDespesas] = useState<DespesasProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const listarDespesas = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await listarTodosDespesas({
        orderBy: [["data", "desc"]],
      });

      setDespesas(response);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setBreadcrumbs([{ title: "Dashboard", url: "/" }, { title: "Despesas" }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loading) listarDespesas();
  }, [loading]);

  if (error) return null;

  return (
    <Container.Root>
      <Container.Header title="Despesas">
        <ActionButtonsAdd loading={setLoading} />
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
            {loading && <Table.Loading />}
            {despesas.map((despesa, index) => (
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
        </Table.Root>
      </Container.Body>
    </Container.Root>
  );
}
