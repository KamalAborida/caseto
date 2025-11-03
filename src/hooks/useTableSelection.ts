import { useState } from "react";

export const useTableSelection = () => {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

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
  };
};

