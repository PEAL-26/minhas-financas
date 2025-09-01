'use client';
import { CustomCardDropdown } from '@/components/ui/custom-card-dropdown';
import { formatCurrency } from '@repo/helpers/currency';
import { colors } from '@repo/ui/colors';
import { FormControlCustom } from '@repo/ui/form/control';
import { InputSuggestions } from '@repo/ui/input';
import { useEffect, useState } from 'react';
import { CategoryComponent } from '../category-component';

interface Props {
  form: any;
  response: any;
  name?: string;
  label?: string;
  containerClassName?: string;
  enableChange?: boolean;
  item?: any | null;
  value?: any;
  required?: boolean;
  itemName?: string;
  onChange?(item: any | null): void;
  onChangeValue?(value: string): void;
  onSelectItem?(item: any | null): void;
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
    value,
    required,
    itemName,
    onChange,
    onChangeValue,
    onSelectItem,
  } = props;

  const [currentItem, setCurrentItem] = useState(() => item);

  const handleChangeItem = (item: any | null, field: any, update = true) => {
    setCurrentItem(item);

    if (item) {
      field?.onChange?.(null);
    }

    if (update) {
      onSelectItem?.(item);
    }
  };

  useEffect(() => {
    handleChangeItem(item, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <FormControlCustom
      required={required}
      defaultValue={value}
      label={label}
      name={name}
      control={form?.control}
      containerClassName="w-full"
    >
      {({ field }) => {
        //const item = form.getValue(itemName);
        return (
          <InputSuggestions
            placeholder="Insira descrição ou selecione"
            value={field.value}
            onChange={(e) => {
              field.onChange(e);
              onChangeValue?.(e.target?.value);
            }}
            item={currentItem}
            items={response.data}
            renderItem={({ item }) => (
              <CategoryComponent
                title={item.description || item?.wishlist?.name}
                description={`${item?.category?.name ? `${item?.category.name} |` : ''} ${formatCurrency(item.estimatedCost || 0)}`}
                backgroundColor={item?.category?.color || colors.primary.DEFAULT}
                icon={(item as any)?.category?.icon}
                showIcon
                sizeIcon={24}
              />
            )}
            onSelectItem={(item) => {
              handleChangeItem(item, field);
            }}
            onSearch={response?.search}
            isLoading={response?.isLoadingAll}
            isError={response?.isError}
            isEmpty={response?.isEmpty}
          />
        );
      }}
    </FormControlCustom>
  );

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
            title={currentValue?.title}
            description={currentValue?.description}
            backgroundColor={currentValue?.backgroundColor || colors.primary.DEFAULT}
            icon={currentValue?.icon || 'tag'}
            labelField="title"
            placeholder="Selecione uma despesa"
            items={[
              {
                id: 'NULL',
                title: 'Desselecionar',
                showIcon: false,
                className: 'text-center text-gray-300',
              },
              ...response.data.map((item: any) => {
                const category = item.category;
                return {
                  ...item,
                  title: item.description,
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
