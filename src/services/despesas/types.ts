export interface DespesasProps {
  id: string;
  data: Date;
  data_termino: Date | null;
  descricao: string;
  quantidade: number;
  local?: string;
  preco: number;
  total: number;
  created_at: Date;
}
