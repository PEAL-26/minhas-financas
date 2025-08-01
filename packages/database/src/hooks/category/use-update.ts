import { useDatabaseContext } from '../../contexts/database';

interface Props {}

export function useUpdateCategory(props: Props) {
  const {} = props;

  const { getDatabase } = useDatabaseContext();
}
