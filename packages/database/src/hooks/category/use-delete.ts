import { useDatabaseContext } from '../../contexts/database';

interface Props {}

export function useDeleteCategory(props: Props) {
  const {} = props;

  const { getDatabase } = useDatabaseContext();
}
