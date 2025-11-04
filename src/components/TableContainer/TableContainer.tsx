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
    mode,
    tableDataToUpdate,
    startCreateProcess,
    createTable,
    updateTable,
  } = useTablesPageContext();
  const {
    execute: getTableColumns,
    loading: getTableColumnsLoading,
    error: getTableColumnsError,
    reset: getTableColumnsReset,
    data: getTableColumnsData,
  } = useGetRequest();

  const {
    execute: getTableData,
    loading: getTableDataLoading,
    error: getTableDataError,
    reset: getTableDataReset,
    data: getTableDataData,
  } = useGetRequest();

  useEffect(() => {
    if (!tableName) return;
    getTableColumnsReset();
    getTableColumns("/user/tables/listColumns", { params: { tableName } });
  }, [tableName]);

  useEffect(() => {
    if (!tableName) return;
    getTableDataReset();
    if (getTableColumnsData && getTableColumnsData?.columns) {
      getTableData(`/user/crud/${tableName}/list`);
    }
  }, [getTableColumnsData, tableName, isFormOpened]);

  const generateTableColumns = (
    columnNames: any[]
  ): Column<Record<string, unknown>>[] => {
    if (!columnNames) return [];
    return columnNames.map((col) => {
      // console.log("col", col);
      return {
        key: col?.name,
        header: col?.name?.toString(),
        textAlign: "start",
      };
    });
  };

  const handleAddDataClick = () => {
    startCreateProcess();
    openForm();
  };

  const formFields: FieldConfig[] = useMemo(() => {
    // console.log("selectedTableColumns", getTableColumnsData?.columns);

    if (
      !getTableColumnsData?.columns ||
      getTableColumnsData?.columns.length === 0
    ) {
      return [];
    }

    const columnsToUse = getTableColumnsData?.columns?.filter(
      (column: any) => column?.name?.toLowerCase()?.replace(/ /g, "") !== "id"
    );

    return columnsToUse?.map((column: any) => {
      const fieldName = column?.name;

      // console.log("column", column);

      return {
        name: fieldName,
        label: column?.name,
        type: column?.type === "integer" ? "number" : "text",
        isRequired: column?.nullable === false,
        initialValue:
          mode === "UPDATE" ? tableDataToUpdate[fieldName] || "" : "",
        placeholder: `Enter ${column?.name}`,
      };
    });
  }, [getTableColumnsData?.columns, mode, tableDataToUpdate]);

  // Handle form submission
  const handleFormSubmit = async (values: any, formikHelpers: any) => {
    try {
      if (mode === "CREATE") {
        console.log("values", values);
        console.log("tableName", tableName);
        await createTable(values, tableName);
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

      {getTableColumnsLoading ||
        (getTableDataLoading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="400px"
          >
            <Loader isLoading={getTableColumnsLoading || getTableDataLoading} />
          </Box>
        ))}

      {getTableColumnsError &&
        !getTableColumnsLoading &&
        !getTableDataLoading && (
          <Box mb="4">
            <ErrorMsg
              isError={true}
              errorMsg={getTableColumnsError || getTableDataError || ""}
            />
          </Box>
        )}

      {!getTableColumnsLoading &&
        !getTableColumnsError &&
        !getTableDataLoading &&
        !getTableDataError && (
          <Box>
            <Heading size="2xl" mb="6" color="gray.800">
              {tableName}
            </Heading>
            <Table
              columns={generateTableColumns(getTableColumnsData?.columns || [])}
              data={getTableDataData?.data || []}
              // striped
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
