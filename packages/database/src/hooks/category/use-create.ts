import { useDatabaseContext } from '../../contexts/database';

interface Props {}

export function useCreateCategory(props: Props) {
  const {} = props;

  const { getDatabase } = useDatabaseContext();
}
