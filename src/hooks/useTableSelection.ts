import { useState } from "react";

export const useTableSelection = () => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [selectedTableColumns, setSelectedTableColumns] = useState<string[]>([]);

  const handleSelectTable = (tableName: string) => {
    setSelectedTable(tableName);
  };

  const handleBackClick = () => {
    setSelectedTable(null);
  };

  return {
    selectedTable,
    handleSelectTable,
    handleBackClick,
    selectedTableColumns,
    setSelectedTableColumns,
  };
};

