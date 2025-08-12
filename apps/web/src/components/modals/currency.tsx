'use client';

import { Button } from '@repo/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@repo/ui/dialog';
import { Label } from '@repo/ui/label';
import { RadioGroup, RadioGroupItem } from '@repo/ui/radio-group';
import { useState } from 'react';

interface CurrencyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

const currencies = [
  { code: 'AOA', name: 'Kwanza Angolano', symbol: 'Kz' },
  { code: 'USD', name: 'Dólar Americano', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'BRL', name: 'Real Brasileiro', symbol: 'R$' },
];

export function CurrencyModal({
  open,
  onOpenChange,
  currentCurrency,
  onCurrencyChange,
}: CurrencyModalProps) {
  const [selectedCurrency, setSelectedCurrency] = useState(currentCurrency);

  const handleSave = () => {
    onCurrencyChange(selectedCurrency);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Selecionar Moeda Padrão</DialogTitle>
        </DialogHeader>
        <div className="max-h-80 overflow-y-auto">
          <RadioGroup value={selectedCurrency} onValueChange={setSelectedCurrency}>
            <div className="space-y-3">
              {currencies.map((currency) => {
                const value = `${currency.code} - ${currency.name}`;
                return (
                  <div key={currency.code} className="flex items-center space-x-2">
                    <RadioGroupItem value={value} id={currency.code} />
                    <Label htmlFor={currency.code} className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span>{currency.name}</span>
                        <span className="text-muted-foreground">
                          {currency.code} ({currency.symbol})
                        </span>
                      </div>
                    </Label>
                  </div>
                );
              })}
            </div>
          </RadioGroup>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
