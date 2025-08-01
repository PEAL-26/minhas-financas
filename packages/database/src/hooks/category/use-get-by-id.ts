import { useDatabaseContext } from '../../contexts/database';

interface Props {}

export function useGetByIdCategory(props: Props) {
  const {} = props;

  const { getDatabase } = useDatabaseContext();
}
