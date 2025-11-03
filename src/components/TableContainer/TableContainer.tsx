import { useEffect, useMemo } from "react";
import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { Table } from "../Table";
import type { Column } from "../Table/Table";
import { Loader } from "../Loader";
import { ErrorMsg } from "../ErrorMsg";
import { useTranslation } from "react-i18next";
import { useGetRequest } from "../../hooks/useGetRequest";
import { useTablesPageContext } from "../../contexts/Tables/TablesContext";
import { TablesDynamicForm } from "../TablesDynamicForm/TablesDynamicForm";
import type { FieldConfig } from "../TablesDynamicForm/TablesDynamicForm";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogTitle,
} from "../Chakra/dialog";

export interface TableContainerProps {
  tableName: string;
  onBackClick: () => void;
}

export const TableContainer = ({
  tableName,
  onBackClick,
}: TableContainerProps) => {
  const { t } = useTranslation();
  const { 
    openForm, 
    closeForm,
    isFormOpened,
    setSelectedTableColumns, 
    selectedTableColumns,
    mode,
    tableDataToUpdate,
    startCreateProcess,
    createTable,
    updateTable,
  } = useTablesPageContext();
  const { execute, loading, error, reset, data } = useGetRequest();

  useEffect(() => {
    if (!tableName) return;
    reset();
    execute("/user/tables/listColumns", { params: { tableName } });
  }, [execute, reset, t, tableName]);

  useEffect(() => {
    if (data) {
      setSelectedTableColumns(data.columns);
    }
  }, [data, setSelectedTableColumns]);

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

  const handleAddDataClick = () => {
    startCreateProcess();
    openForm();
  };

  // Map selectedTableColumns to FieldConfig for the dynamic form
  const formFields: FieldConfig[] = useMemo(() => {
    if (!selectedTableColumns || selectedTableColumns.length === 0) {
      return [];
    }

    return selectedTableColumns.map((columnName) => {
      const fieldName = columnName.toLowerCase().replace(/ /g, "");
      
      return {
        name: fieldName,
        label: columnName,
        type: "text",
        isRequired: true,
        initialValue: mode === "UPDATE" ? tableDataToUpdate[fieldName] || "" : "",
        placeholder: `Enter ${columnName}`,
      };
    });
  }, [selectedTableColumns, mode, tableDataToUpdate]);

  // Handle form submission
  const handleFormSubmit = async (values: any, formikHelpers: any) => {
    try {
      if (mode === "CREATE") {
        await createTable(values);
      } else if (mode === "UPDATE") {
        const tableId = tableDataToUpdate.id || tableDataToUpdate._id;
        await updateTable(tableId, values);
      }
      formikHelpers.setSubmitting(false);
    } catch (error: any) {
      formikHelpers.setSubmitting(false);
      throw error;
    }
  };

  return (
    <Box
      width="100%"
      p="lg"
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
        <Box>
          <Heading size="2xl" mb="6" color="gray.800">
            {tableName}
          </Heading>
          <Table
            columns={generateTableColumns(selectedTableColumns)}
            data={[]}
            striped
            interactive
            showBorder
            showColumnBorder
          />
        </Box>
      )}

      <HStack justifyContent="flex-end" alignItems="center" mt={"md"}>
        <Button
          onClick={handleAddDataClick}
          mb="6"
          variant="solid"
          colorPalette="brand"
          size="md"
        >
          {t("Add Data")}
        </Button>
      </HStack>

      <DialogRoot
        open={isFormOpened} 
        onOpenChange={(e) => !e.open && closeForm()}
        size="lg"
      >
        <DialogBackdrop />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode === "CREATE" ? t("Add New Data") : t("Update Data")}
            </DialogTitle>
          </DialogHeader>
          <DialogCloseTrigger />
          <DialogBody>
            <TablesDynamicForm
              fields={formFields}
              onSubmit={handleFormSubmit}
              submitButtonText={mode === "CREATE" ? t("Create") : t("Update")}
              formTitle=""
            />
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};
