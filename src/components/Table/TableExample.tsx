import { Box, Heading, Stack, Button, Badge } from "@chakra-ui/react"
import { Table } from "."
import type { Column } from "."

export function TableExample() {
  const sampleData: Record<string, any>[] = [
    { id: 1, name: "Laptop", category: "Electronics", price: 999.99, stock: 50, status: "in-stock" },
    { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99, stock: 15, status: "low-stock" },
    { id: 3, name: "Desk Chair", category: "Furniture", price: 150.00, stock: 0, status: "out-of-stock" },
    { id: 4, name: "Smartphone", category: "Electronics", price: 799.99, stock: 75, status: "in-stock" },
    { id: 5, name: "Headphones", category: "Accessories", price: 199.99, stock: 200, status: "in-stock" },
  ]

  const columns: Column<Record<string, any>>[] = [
    {
      key: "id",
      header: "ID",
    },
    {
      key: "name",
      header: "Product",
    },
    {
      key: "category",
      header: "Category",
    },
    {
      key: "price",
      header: "Price",
      textAlign: "end",
      render: (row) => `$${row.price.toFixed(2)}`,
    },
    {
      key: "stock",
      header: "Stock",
      textAlign: "end",
    },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        return (
          <Badge
            px="sm"
            py="xs"
            borderRadius="sm"
            fontSize="sm"
          >
            {row.status as string}
          </Badge>
        )
      },
    },
  ]

  const actionColumns: Column<Record<string, unknown>>[] = [
    ...columns,
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <Stack direction="row" gap="xs">
          <Button size="sm" variant="outline">
            Edit
          </Button>
          <Button size="sm" variant="ghost">
            Delete
          </Button>
        </Stack>
      ),
    },
  ]

  return (
    <Stack gap="lg" p="xl">
      <Box>
        <Heading size="2xl" fontFamily="heading" mb="md">
          Table Component Examples
        </Heading>
      </Box>

      {/* Default Table (Outline Variant) */}
      <Box>
        <Heading size="lg" mb="sm">Default Table (Outline Variant)</Heading>
        <Table columns={columns} data={sampleData} />
      </Box>

      {/* Line Variant */}
      <Box>
        <Heading size="lg" mb="sm">Line Variant</Heading>
        <Table columns={columns} data={sampleData} variant="line" />
      </Box>

      {/* Striped Table */}
      <Box>
        <Heading size="lg" mb="sm">Striped Table</Heading>
        <Table columns={columns} data={sampleData} striped />
      </Box>

      {/* Small Size */}
      <Box>
        <Heading size="lg" mb="sm">Small Size</Heading>
        <Table columns={columns} data={sampleData} size="sm" />
      </Box>

      {/* Large Size */}
      <Box>
        <Heading size="lg" mb="sm">Large Size</Heading>
        <Table columns={columns} data={sampleData} size="lg" />
      </Box>

      {/* Interactive Table */}
      <Box>
        <Heading size="lg" mb="sm">Interactive Table (Hover Effect)</Heading>
        <Table columns={columns} data={sampleData} interactive />
      </Box>

      {/* Column Borders */}
      <Box>
        <Heading size="lg" mb="sm">With Column Borders</Heading>
        <Table columns={columns} data={sampleData} showColumnBorder />
      </Box>

      {/* Without Border */}
      <Box>
        <Heading size="lg" mb="sm">Without Border</Heading>
        <Table columns={columns} data={sampleData} showBorder={false} />
      </Box>

      {/* Empty Table */}
      <Box>
        <Heading size="lg" mb="sm">Empty Table</Heading>
        <Table columns={columns} data={[]} />
      </Box>

      {/* Table with Actions */}
      <Box>
        <Heading size="lg" mb="sm">Table with Custom Actions</Heading>
        <Table columns={actionColumns} data={sampleData} />
      </Box>

      {/* Combined Features */}
      <Box>
        <Heading size="lg" mb="sm">Combined: Striped + Interactive + Column Borders</Heading>
        <Table 
          columns={columns} 
          data={sampleData} 
          striped 
          interactive 
          showColumnBorder 
        />
      </Box>
    </Stack>
  )
}

