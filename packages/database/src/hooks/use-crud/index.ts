import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { useDatabaseContext } from '../../contexts/database';
import { CategoryRepository } from '../../repositories/categories';
import { IDatabase } from '../../types';

const repositories = {
  category: CategoryRepository,
};

type RepositoryName = keyof typeof repositories;

interface UseCRUDProps {
  repositoryName: RepositoryName;
  op: 'create' | 'read' | 'update' | 'delete';
  schema: any;
}

function getRepository(repositoryName: RepositoryName, database: IDatabase) {
  const repository = new repositories[repositoryName](database);

  return repository;
}

export function useCRUD<SchemaType = any>(props: UseCRUDProps) {
  const { repositoryName, op, schema } = props;
  const { getDatabase } = useDatabaseContext();

  const repository = useMemo(() => {
    const database = getDatabase();
    const repository = getRepository(repositoryName, database);

    return repository;
  }, []);

  if (op === 'create') {
    const form = useForm({
      resolver: zodResolver(schema),
    });

    const create = async () => {
      console.log('create');
    };

    return {
      create: {
        handle: create,
        formSubmit: form.handleSubmit(create),
        form,
        //error,
        //isSubmitting,
        //isSuccess,}
      },
    };
  }

  if (op === 'read') {
    const data = {};
    return { read: { data } };
  }

  if (op === 'update') {
    const update = async () => {};
    return { update: {} };
  }

  if (op === 'delete') {
    const _delete = async () => {};
    return { delete: _delete };
  }
}
