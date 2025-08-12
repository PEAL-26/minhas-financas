import { ExpenseFormComponent } from '@/components/ui/forms/expense';
import { IncomeFormComponent } from '@/components/ui/forms/income';
import { formatCurrency } from '@repo/helpers/currency';
import { Button } from '@repo/ui/button';
import { SelectFormControl } from '@repo/ui/form/control/select';
import { showToastError } from '@repo/ui/helpers/toast';
import { Input } from '@repo/ui/input';
import { InputMoney } from '@repo/ui/input-money';
import { Label } from '@repo/ui/label';
import { EllipsisIcon, PlusCircleIcon, Trash2Icon } from '@repo/ui/lib/lucide';
import { useFieldArray } from 'react-hook-form';

interface Props {
  form: any;
  querySelectExpenses: any;
  querySelectIncomes: any;
  querySelectLocations: any;
  onChange?(): void;
}

export function ExpensesList(props: Props) {
  const { form, querySelectExpenses, querySelectIncomes, querySelectLocations, onChange } = props;
  const array = useFieldArray({ control: form.control, name: 'expenses' });

  const handleAdd = () => {
    array.append({ quantity: 1, expense: null } as any);
  };

  const handleUpdate = (index: number, data: Record<string, any>) => {
    const expense = form.getValues('expenses')[index];

    if (expense) {
      array.update(index, { ...expense, ...data });
    }
  };

  const handleSelectExpense = (item: any | null, index: number) => {
    if (item === null) {
      form.setValue(`expenses.${index}`, { expense: null, quantity: 1, total: 0, amount: 0 });
      return;
    }

    const expenses = form.getValues('expenses') || [];
    const result = expenses.find((e: any) => String(e?.expense?.id) === String(item?.id));

    if (result && result.expense.id === item.id) {
      return;
    }

    if (result) {
      showToastError(`A despesa ${item?.name || ''} já foi adicionada nessa lista.`);
      return;
    }

    form.setValue(`expenses.${index}.expense`, item);
    //form.setValue(`expenses.${index}.amount`, item?.estimatedCost || undefined);
    handleUpdate(index, { amount: item?.estimatedCost || undefined });
    calculateTotal(index);
    onChange?.();
  };

  const handleRemove = (index: number) => {
    if (array.fields.length === 1) return;
    array.remove(index);
  };

  const calculateTotal = (index: number) => {
    const expenses = form.getValues('expenses');
    const response = expenses[index] as unknown as {
      expense?: any;
      amount: number;
      quantity: number;
      total: number;
    };

    if (response) {
      const amount = Number(response?.amount || 0);
      const quantity = Number(response?.quantity || 1);
      const total = amount * quantity;

      form.setValue(`expenses.${index}.total`, total);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b pb-3">
        <Label className="font-bold text-black">Despesas: </Label>
        <Button variant="outline" className="size-6 p-0">
          <EllipsisIcon className="text-input" size={16} />
        </Button>
      </div>

      <div className="mt-3 space-y-3">
        {array.fields.map((field, index) => (
          <>
            <div key={index} className="flex w-full flex-col items-center justify-center gap-3">
              <ExpenseFormComponent
                form={form}
                response={querySelectExpenses}
                name={`expenses.${index}.expense`}
                containerClassName="w-full"
                enableChange={false}
                item={(field as any)?.expense}
                onChange={(item) => handleSelectExpense(item, index)}
              />

              <SelectFormControl
                modal
                label="Local"
                placeholder="Selecione o local"
                name={`expenses.${index}.location` as any}
                control={form.control}
                className="w-full bg-white"
                containerClassName="w-full"
                item={(field as any)?.location}
                items={querySelectLocations.data}
                onSearch={querySelectLocations.search}
                loading={querySelectLocations.isLoadingAll}
                onSelect={(location) => {
                  handleUpdate(index, { location });
                }}
              />

              <IncomeFormComponent
                label="Renda"
                form={form}
                response={querySelectIncomes}
                name={`expenses.${index}.income`}
                containerClassName="w-full"
              />

              <InputMoney
                value={(field as any)?.amount}
                onChangeValue={(value) => {
                  handleUpdate(index, { amount: Number(value || '0') });
                  calculateTotal(index);
                  onChange?.();
                }}
                placeholder="Montante"
                containerClassName="w-full"
              />

              <div className="flex items-center gap-3">
                <Input
                  value={(field as any)?.quantity}
                  placeholder="Quantidade"
                  onChange={(e) => {
                    handleUpdate(index, { quantity: Number((e.target as any)?.value || '0') });
                    calculateTotal(index);
                    onChange?.();
                  }}
                  className="w-[170px] text-center"
                />

                <Input
                  value={formatCurrency((field as any).total)}
                  readOnly
                  placeholder="Total"
                  className="w-full bg-gray-200 text-right"
                />
              </div>

              <Button
                className="group"
                onClick={() => {
                  handleRemove(index);
                }}
              >
                <Trash2Icon className="size-4 text-red-500 group-hover:text-red-700" />
              </Button>
            </div>
            <div className="h-[1px] w-full bg-gray-200" />
          </>
        ))}
        <div className="flex items-center justify-between">
          <Label className="font-bold text-black">Total </Label>
          <Label className="font-bold text-black">
            {formatCurrency(form.getValues('totalAmount'))}
          </Label>
        </div>
        <div className="h-[1px] w-full bg-gray-200" />
      </div>

      <div className="mt-3 flex justify-center">
        <Button onClick={() => handleAdd()}>
          <PlusCircleIcon />
        </Button>
      </div>
    </div>
  );
}
