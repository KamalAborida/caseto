import { Table as ChakraTable, Box, IconButton } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
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
  actions?: boolean
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
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
  actions = false,
  onEdit,
  onDelete,
}: TableProps<T>) {
  const { t } = useTranslation();

  return (
    <Box
      borderRadius="md"
      border={showBorder ? "1px solid" : "none"}
      borderColor="gray.200"
      shadow={showBorder ? "sm" : "none"}
      overflow="hidden"
    >
      <Box overflowX="auto">
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
            {actions && (
              <ChakraTable.ColumnHeader
                textAlign="center"
                color="brand.50"
                fontWeight="semibold"
              >
                {t("Actions")}
              </ChakraTable.ColumnHeader>
            )}
          </ChakraTable.Row>
        </ChakraTable.Header>

        <ChakraTable.Body>
          {data.length === 0 ? (
            <ChakraTable.Row>
              <ChakraTable.Cell
                colSpan={columns.length + (actions ? 1 : 0)}
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
                {actions && (
                  <ChakraTable.Cell textAlign="center">
                    <Box display="flex" gap="2" justifyContent="center">
                      {onEdit && (
                        <IconButton
                          aria-label="Edit"
                          size="sm"
                          variant="ghost"
                          colorPalette="blue"
                          onClick={() => onEdit(row)}
                        >
                          <FaEdit />
                        </IconButton>
                      )}
                      {onDelete && (
                        <IconButton
                          aria-label="Delete"
                          size="sm"
                          variant="ghost"
                          colorPalette="red"
                          onClick={() => onDelete(row)}
                        >
                          <FaTrash />
                        </IconButton>
                      )}
                    </Box>
                  </ChakraTable.Cell>
                )}
              </ChakraTable.Row>
            ))
          )}
        </ChakraTable.Body>

      </ChakraTable.Root>
      </Box>
    </Box>
  )
}

