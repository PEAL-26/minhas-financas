import { useDatabaseContext } from '../../contexts/database';

interface Props {}

export function useListAllCategory(props: Props) {
  const {} = props;

  const { getDatabase } = useDatabaseContext();
}
