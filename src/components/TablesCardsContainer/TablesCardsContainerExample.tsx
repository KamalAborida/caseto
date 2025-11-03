import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { TablesCardsContainer, type TableMetadata } from "./TablesCardsContainer";
import { Table } from "../Table";
import type { Column } from "../Table/Table";
import { FaArrowLeft } from "react-icons/fa";

// Sample data for demonstration
const sampleTables: TableMetadata[] = [
  {
    name: "Users",
    columns: ["ID", "Name", "Email", "Role", "Created At"],
  },
  {
    name: "Products",
    columns: ["ID", "Name", "Price", "Category", "Stock"],
  },
  {
    name: "Orders",
    columns: ["ID", "User ID", "Total", "Status", "Date"],
  },
  {
    name: "Categories",
    columns: ["ID", "Name", "Description"],
  },
];

// Sample table data for each table
const sampleTableData: Record<string, unknown[]> = {
  Users: [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", createdAt: "2024-01-01" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", createdAt: "2024-01-02" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", createdAt: "2024-01-03" },
  ],
  Products: [
    { id: 1, name: "Laptop", price: "$999", category: "Electronics", stock: 50 },
    { id: 2, name: "Mouse", price: "$29", category: "Electronics", stock: 200 },
    { id: 3, name: "Desk", price: "$299", category: "Furniture", stock: 15 },
  ],
  Orders: [
    { id: 1, userId: 1, total: "$1028", status: "Completed", date: "2024-01-15" },
    { id: 2, userId: 2, total: "$299", status: "Pending", date: "2024-01-16" },
    { id: 3, userId: 1, total: "$29", status: "Completed", date: "2024-01-17" },
  ],
  Categories: [
    { id: 1, name: "Electronics", description: "Electronic devices and accessories" },
    { id: 2, name: "Furniture", description: "Home and office furniture" },
  ],
};

export const TablesCardsContainerExample = () => {
  const [selectedTable, setSelectedTable] = useState<TableMetadata | null>(null);

  const handleTableClick = (table: TableMetadata) => {
    setSelectedTable(table);
  };

  const handleBackClick = () => {
    setSelectedTable(null);
  };

  // Generate columns based on the selected table's column names
  const getColumns = (table: TableMetadata): Column<Record<string, unknown>>[] => {
    if (!table.columns) return [];
    
    return table.columns.map((col) => ({
      key: col.toLowerCase().replace(/ /g, ""),
      header: col,
      textAlign: "start",
    }));
  };

  return (
    <Box width="100%" minHeight="100vh" bg="gray.50" p="4">
      {selectedTable ? (
        // Show selected table with back button
        <Box>
          <Button
            onClick={handleBackClick}
            mb="6"
            variant="outline"
            colorPalette="brand"
            size="md"
          >
            <FaArrowLeft />
            Back to Tables
          </Button>

          <Box bg="white" p="6" borderRadius="lg" shadow="sm">
            <Box mb="4">
              <Box fontSize="2xl" fontWeight="bold" color="gray.800">
                {selectedTable.name}
              </Box>
            </Box>
            <Table
              columns={getColumns(selectedTable)}
              data={sampleTableData[selectedTable.name] || []}
              striped
              interactive
            />
          </Box>
        </Box>
      ) : (
        // Show cards container
        <TablesCardsContainer
          tables={sampleTables}
          onTableClick={handleTableClick}
        />
      )}
    </Box>
  );
};

