import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import { TableCard } from "../TableCard";
import { useTranslation } from '../../hooks/useTranslation';

export interface TableMetadata {
  name: string;
  columns?: string[];
}

export interface TablesCardsContainerProps {
  tables: TableMetadata[];
  onTableClick?: (table: TableMetadata, index: number) => void;
}

export const TablesCardsContainer = ({
  tables,
  onTableClick,
}: TablesCardsContainerProps) => {
  const { t } = useTranslation();

  return (
    <Box width="100%" p="6">
      {/* Header */}
      <Box mb="6">
        <Heading size="2xl" mb="2" color="gray.800">
          {t("Available Tables")}
        </Heading>
        <Text color="gray.500" fontSize="md">
          {t("Select a table to view its data")}
        </Text>
      </Box>

      {/* Cards Grid */}
      {tables.length === 0 ? (
        <Box
          p="12"
          textAlign="center"
          borderRadius="lg"
          border="2px dashed"
          borderColor="gray.300"
          bg="gray.50"
        >
          <Text color="gray.500" fontSize="lg">
            {t("No tables available")}
          </Text>
        </Box>
      ) : (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gap="6"
        >
          {tables.map((table, index) => (
            <TableCard
              key={index}
              name={table.name}
              columns={table.columns}
              onClick={onTableClick ? () => onTableClick(table, index) : undefined}
            />
          ))}
        </Grid>
      )}
    </Box>
  );
};

