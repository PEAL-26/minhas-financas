import { TriangleAlertIcon } from 'lucide-react';
import { Loading } from '../../loading';
import { InputSuggestionsItemProps } from './types';

export function InputSuggestionsItem<T>(props: InputSuggestionsItemProps<T>) {
  const { isLoading, isError, isEmpty, items = [], searchText, renderItem, onClick } = props;

  return (
    <div
      data-suggestions="container-internal"
      className="flex h-full max-h-56 w-full flex-col overflow-y-auto p-1"
    >
      {isLoading && !isError && (
        <div className="flex h-full w-full items-center justify-center p-5">
          <Loading size={28} />
        </div>
      )}

      {!isLoading && isError && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-5 text-center">
          <TriangleAlertIcon className="text-red-500" size={28} />
          <span className="text-xs text-foreground">Oops, Algo deu errado!</span>
        </div>
      )}

      {!isLoading && !isError && isEmpty && (
        <div className="flex h-full w-full items-center justify-center p-5">
          <span className="text-xs text-foreground">
            Sem dados com essa descrição: <span className="font-bold">{searchText}</span>
          </span>
        </div>
      )}

      {!isLoading &&
        !isError &&
        !isEmpty &&
        items.map((item, index) => (
          <div
            key={index}
            className="relative z-10 rounded px-2 py-1.5 hover:bg-accent/50"
            onClick={() => onClick?.(item)}
          >
            <div data-suggestions="input-item" className="absolute inset-0 z-10" />
            {renderItem?.({ item })}
          </div>
        ))}
    </div>
  );
}
