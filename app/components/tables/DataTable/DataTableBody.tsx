import { Table, Text } from "@mantine/core";
import { Column } from "./types";
import { generateRowKey } from "./util";

interface DataTableBodyProps<T> {
  columns: Column<T>[];
  data: T[];
  orderBy?: string;
  order?: string;
}

const DataTableBody = <T extends Record<string, any>>({
  columns,
  data,
  orderBy,
  order
}: DataTableBodyProps<T>) => (
  <Table.Tbody>
    {data.map((item, index) => (
      <Table.Tr key={generateRowKey(index, orderBy, order)}>
        {columns.map(column => (
          <Table.Td
            key={column.key as string}
            style={{ width: column.width }}
            align={column.align}
          >
            {column.render
              ? column.render(item[column.key])
              : String(item[column.key])}
          </Table.Td>
        ))}
      </Table.Tr>
    ))}

    {data.length === 0 && (
      <Table.Tr h={300}>
        <Table.Td colSpan={columns.length} style={{ textAlign: "center" }}>
          <Text size="sm" c="dimmed">
            暂无数据
          </Text>
        </Table.Td>
      </Table.Tr>
    )}
  </Table.Tbody>
);

export default DataTableBody;
