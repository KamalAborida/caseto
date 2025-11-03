import { useEffect, useState } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { Table } from "../Table";
import type { Column } from "../Table/Table";
import { Loader } from "../Loader";
import { ErrorMsg } from "../ErrorMsg";
import { useTranslation } from "react-i18next";
import { useGetRequest } from "../../hooks/useGetRequest";

export interface TableContainerProps {
  tableName: string;
  onBackClick: () => void;
}

export const TableContainer = ({
  tableName,
  onBackClick,
}: TableContainerProps) => {
  const { t } = useTranslation();
  const { execute, loading, error, reset, data } = useGetRequest();
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    if (!tableName) return;
    reset();
    execute("/user/tables/listColumns", { params: { tableName } });
  }, [execute, reset, t, tableName]);

  useEffect(() => {
    // console.log("data", data);
    if (data) {
      setColumns(data.columns);
    }
  }, [data]);

  const generateTableColumns = (
    columnNames: string[]
  ): Column<Record<string, unknown>>[] => {
    if (!columnNames) return [];
    console.log("columnNames", columnNames);
    return columnNames.map((col) => ({
      key: col.toLowerCase().replace(/ /g, ""),
      header: col,
      textAlign: "start",
    }));
  };

  return (
    <Box
      width="100%"
      p="4"
      // border="1px solid"
      // borderColor="red.200"
    >
      <Button
        onClick={onBackClick}
        mb="6"
        variant="outline"
        colorPalette="brand"
        size="md"
      >
        <FaArrowLeft />
      </Button>

      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <Loader isLoading={loading} />
        </Box>
      )}

      {error && !loading && (
        <Box mb="4">
          <ErrorMsg isError={true} errorMsg={error} />
        </Box>
      )}

      {!loading && !error && (
        <Box p={"sm"} >
          <Heading size="2xl" mb="6" color="gray.800">
            {tableName}
          </Heading>
          <Table
            columns={generateTableColumns(columns)}
            data={[]}
            striped
            interactive
            showBorder
            showColumnBorder
          />
        </Box>
      )}
    </Box>
  );
};
