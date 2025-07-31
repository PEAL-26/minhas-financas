import { useDatabaseContext } from '../../contexts/database';
import { CategoryRepository, ICategoryRepository } from '../../repositories/categories';

interface Props {
  operation: keyof ICategoryRepository;
}

export function useCategory(props: Props) {
  const { operation } = props;

  const { getDatabase } = useDatabaseContext();

  const listAll = async () => {
    const database = getDatabase();
    const repository = new CategoryRepository(database);

    return repository.listAll();
  };

  const create = async () => {
    const database = getDatabase();
    const repository = new CategoryRepository(database);

    return repository.create({ name: 'Tecnologia', icon: 'User' });
  };

  return { listAll, create };
}
