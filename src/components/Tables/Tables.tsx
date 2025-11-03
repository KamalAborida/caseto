import { Box } from "@chakra-ui/react";
// import { useTableSelection } from "../../hooks/useTableSelection";
import {
  TablesCardsContainer,
  type TableMetadata,
} from "../TablesCardsContainer";
import { TableContainer } from "../TableContainer";
import { useTablesPageContext } from "../../contexts/Tables/TablesContext";

export interface TablesProps {
  tables: TableMetadata[];
}

export const Tables = ({ tables }: TablesProps) => {
  const { selectedTable, handleSelectTable, handleBackClick } = useTablesPageContext();

  return (
    <Box
      // border="5px solid"
      // borderColor="red.500"
      width="100%"
    >
      {selectedTable ? (
        <TableContainer
          tableName={selectedTable}
          onBackClick={handleBackClick}
        />
      ) : (
        <TablesCardsContainer
          tables={tables}
          onTableClick={(table) => handleSelectTable(table.name)}
        />
      )}
    </Box>
  );
};
