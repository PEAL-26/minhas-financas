import { Typography } from '@/libs/material-tailwind';

interface TableHeaderProps {
  cols: string[];
}

export function TableHeader({ cols }: TableHeaderProps) {
  return (
    <thead>
      <tr>
        {cols &&
          cols.map((el) => (
            <th
              key={el}
              className={`border-b border-green-50 px-5 py-3 text-left ${el === '' ? 'w-10' : ''}`}
            >
              <Typography
                variant="small"
                className="text-[11px] font-bold uppercase text-green-400"
              >
                {el}
              </Typography>
            </th>
          ))}
      </tr>
    </thead>
  );
}
