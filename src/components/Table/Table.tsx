import { Table as ChakraTable, Box } from "@chakra-ui/react";
import { useTranslation } from "../../hooks/useTranslation";

export interface Column<T> {
  key: string
  header: string
  textAlign?: "start" | "center" | "end"
  render?: (row: T) => React.ReactNode
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  variant?: "line" | "outline"
  size?: "sm" | "md" | "lg"
  striped?: boolean
  showBorder?: boolean
  interactive?: boolean
  stickyHeader?: boolean
  showColumnBorder?: boolean
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  variant = "outline",
  size = "md",
  striped = false,
  showBorder = true,
  interactive = false,
  stickyHeader = false,
  showColumnBorder = false,
}: TableProps<T>) {
  const { t } = useTranslation();

  return (
    <Box
      borderRadius="md"
      overflow="hidden"
      border={showBorder ? "1px solid" : "none"}
      borderColor="gray.200"
      shadow={showBorder ? "sm" : "none"}
    >
      <ChakraTable.Root
        variant={variant}
        size={size}
        striped={striped}
        interactive={interactive}
        stickyHeader={stickyHeader}
        showColumnBorder={showColumnBorder}
      >

        <ChakraTable.Header>
          <ChakraTable.Row bg="brand.300">
            {columns.map((column) => (
              <ChakraTable.ColumnHeader
                key={column.key}
                textAlign={"start"}
                color="brand.50"
                fontWeight="semibold"
              >
                {column.header}
              </ChakraTable.ColumnHeader>
            ))}
          </ChakraTable.Row>
        </ChakraTable.Header>

        <ChakraTable.Body>
          {data.length === 0 ? (
            <ChakraTable.Row>
              <ChakraTable.Cell
                colSpan={columns.length}
                textAlign="center"
                p="lg"
                color="gray.500"
              >
                {t("No data available")}
              </ChakraTable.Cell>
            </ChakraTable.Row>
          ) : (
            data.map((row, rowIndex) => (
              <ChakraTable.Row key={rowIndex}>
                {columns.map((column) => (
                  <ChakraTable.Cell
                    key={column.key}
                    textAlign={"start"}
                    color="gray.700"
                  >
                    {column.render
                      ? column.render(row)
                      : String(row[column.key] ?? '')}
                  </ChakraTable.Cell>
                ))}
              </ChakraTable.Row>
            ))
          )}
        </ChakraTable.Body>

      </ChakraTable.Root>
    </Box>
  )
}

