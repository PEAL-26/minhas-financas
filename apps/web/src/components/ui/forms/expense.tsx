'use client';
import { CustomCardDropdown } from '@/components/ui/custom-card-dropdown';
import { formatCurrency } from '@repo/helpers/currency';
import { colors } from '@repo/ui/colors';
import { FormControlCustom } from '@repo/ui/form/control';
import { useEffect, useState } from 'react';

interface Props {
  form: any;
  response: any;
  name?: string;
  label?: string;
  containerClassName?: string;
  enableChange?: boolean;
  item?: any | null;
  onChange?(item: any | null): void;
}

export function ExpenseFormComponent(props: Props) {
  const {
    form,
    response,
    name = 'expense',
    label,
    containerClassName,
    enableChange = true,
    item,
    onChange,
  } = props;

  const [currentValue, setCurrentValue] = useState(() => item);

  const handleChangeItem = (item: any, field: any, update = true) => {
    const data = item?.id === 'NULL' ? null : item;

    setCurrentValue(data);

    if (enableChange) {
      field?.onChange(data);
    }

    if (update) {
      onChange?.(data);
    }
  };

  useEffect(() => {
    handleChangeItem(item, undefined, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <FormControlCustom
      label={label}
      name={name}
      control={form?.control}
      containerClassName={containerClassName}
    >
      {({ field }) => {
        return (
          <CustomCardDropdown
            modal
            title={currentValue?.name}
            description={currentValue?.description}
            backgroundColor={currentValue?.backgroundColor || colors.primary.DEFAULT}
            icon={currentValue?.icon || 'tag'}
            labelField="name"
            placeholder="Selecione uma despesa"
            items={[
              {
                id: 'NULL',
                name: 'Desselecionar',
                showIcon: false,
                className: 'text-center text-gray-300',
              },
              ...response.data.map((item: any) => {
                const category = item.category;
                return {
                  ...item,
                  description: `${category?.name ? `${category.name} |` : ''} ${formatCurrency(item.estimatedCost || 0)}`,
                  backgroundColor: category?.color || colors.primary.DEFAULT,
                  icon: category?.icon || 'tag',
                };
              }),
            ]}
            onChange={(item) => {
              handleChangeItem(item, field);
            }}
            onSearch={response.search}
            loading={response.isLoadingAll}
          />
        );
      }}
    </FormControlCustom>
  );
}
