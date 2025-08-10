'use client';

import { CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { formatDate, isValidDate } from '@repo/helpers/date';

import { Button } from './button';
import { Calendar } from './calendar';
import { Input } from './input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

interface Props {
  modal?: boolean;
  defaultDate?: Date;
  onChange?: (value: Date | undefined) => void;
}

export function DatePicker(props: Props) {
  const { modal, defaultDate, onChange } = props;
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(() => defaultDate);
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(date));

  const handleChangeData = (date: Date | undefined) => {
    setOpen(false);

    if (!date) {
      setValue('');
      setDate(undefined);
      setMonth(undefined);
      onChange?.(undefined);
    }

    if (isValidDate(date)) {
      setValue(formatDate(date));
      setDate(date);
      setMonth(date);
      onChange?.(date);
    }
  };

  return (
    <div className="relative flex gap-2">
      <Input
        id="date"
        value={value}
        placeholder="Sábado, 01 de Agosto de 2025"
        className="pr-10"
        onChange={(e) => {
          handleChangeData(e.target.value ? new Date(e.target.value) : undefined);
        }}
        onKeyDown={(e) => {
          e.preventDefault();

          if (e.key === 'ArrowDown') {
            setOpen(true);
          }

          if (e.key === 'Backspace' || e.key === 'Delete') {
            setValue('');
            setDate(undefined);
            setMonth(undefined);
          }
        }}
      />
      <Popover open={open} onOpenChange={setOpen} modal={modal}>
        <PopoverTrigger asChild>
          <div className="absolute right-2 top-1/2 size-6 -translate-y-1/2">
            <Button
              id="date-picker"
              variant="ghost"
              className="flex h-full w-full items-center justify-center"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            onSelect={handleChangeData}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
