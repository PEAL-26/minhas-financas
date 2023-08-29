import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { ReactElement, useEffect } from "react";

interface TableProps<T> {
  title?: string;
  headerElement?: ReactElement;
  cols: string[];
  data: T[];
}

export function Table<T>(props: TableProps<T>) {
  const { data, title, headerElement, cols } = props;

  useEffect(() => {
    cols.push("");
    console.log(cols);
    console.log(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headerKeys = Object.keys(data[0] as Object);
  console.log(headerKeys);
  return (
    <div className="mb-8 mt-12 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="green"
          className="mb-8 flex items-center justify-between p-6"
        >
          <Typography variant="h6" color="white">
            {title}
          </Typography>
          {headerElement}
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {cols.map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 px-5 py-3 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, key) => {
                const className = `py-3 px-5 ${
                  key === data.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={key}>
                    {cols.map((col, key) => {
                      if (col === "") {
                        return (
                          <td key={key} className={className}>
                            <Typography
                              as="a"
                              href="#"
                              className="text-xs font-semibold text-blue-gray-600"
                            >
                              Edit
                            </Typography>
                          </td>
                        );
                      }

                      return (
                        <td key={key} className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {/* {item[headerKeys[key]]} */}
                          </Typography>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
