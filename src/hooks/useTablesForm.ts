import { useState, useCallback } from "react";
import { usePostRequest } from "./usePostRequest";
import { usePutRequest } from "./usePutRequest";
import { useDeleteRequest } from "./useDeleteRequest";

// Types
type FormMode = "CREATE" | "UPDATE";

interface TableData {
  [key: string]: any;
}

export const useTablesForm = (closeForm: () => void) => {
  const [mode, setMode] = useState<FormMode>("CREATE");
  const [tableDataToUpdate, setTableDataToUpdate] = useState<Record<string, any>>({});

  const { execute: postRequest } = usePostRequest();
  const { execute: putRequest } = usePutRequest();
  const { execute: deleteRequest } = useDeleteRequest();

  const startCreateProcess = useCallback(() => {
    setMode("CREATE");
    setTableDataToUpdate({});
  }, []);

  const startUpdateProcess = useCallback(async (rowData: Record<string, any>) => {
    setMode("UPDATE");
    setTableDataToUpdate(rowData);
  }, []);

  const createTable = useCallback(async (data: TableData, tableName: string) => {
    try {
      console.log("data", data);
      console.log("tableName", tableName);

      const response = await postRequest(`user/crud/${tableName}/create`, data);
      
      if (response) {
        closeForm();
        return response;
      }
      
      return null;
    } catch (error) {
      console.error("Failed to create table:", error);
      throw error;
    }
  }, [postRequest, closeForm]);

  const updateTable = useCallback(async (recordId: string, data: TableData, tableName: string) => {
    try {
      const response = await putRequest(`user/crud/${tableName}/update?id=${recordId}`, data);
      
      if (response) {
        closeForm();
        return response;
      }
      
      return null;
    } catch (error) {
      console.error("Failed to update table:", error);
      throw error;
    }
  }, [putRequest, closeForm]);

  const deleteTableRecord = useCallback(async (tableName: string, recordId: string) => {
    try {
      const response = await deleteRequest(`user/crud/${tableName}/remove?id=${recordId}`);
      if (response) {
        return response;
      }
      return null;
    } catch (error) {
      console.error("Failed to delete table record:", error);
      throw error;
    }
  }, [deleteRequest]);

  return {
    mode,
    tableDataToUpdate,
    startCreateProcess,
    startUpdateProcess,
    createTable,
    updateTable,
    deleteTableRecord,
  };
};
