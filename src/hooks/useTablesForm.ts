import { useState, useCallback } from "react";
import { usePostRequest } from "./usePostRequest";
import { usePutRequest } from "./usePutRequest";
import { useGetRequest } from "./useGetRequest";

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
  const { execute: getRequest } = useGetRequest();

  const startCreateProcess = useCallback(() => {
    setMode("CREATE");
    setTableDataToUpdate({});
  }, []);

  const startUpdateProcess = useCallback(async (tableId: string) => {
    setMode("UPDATE");
    
    try {
      // Fetch table data from server
      const response = await getRequest(`/table/get?id=${tableId}`);

      console.log("response", response);
      
      if (response && response.table) {
        setTableDataToUpdate(response.table);
      }
    } catch (error) {
      console.error("Failed to fetch table data:", error);
    }
  }, [getRequest]);

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

  const updateTable = useCallback(async (tableId: string, data: TableData) => {
    try {
      const response = await putRequest(`/table/update?id=${tableId}`, data);
      
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

  return {
    mode,
    tableDataToUpdate,
    startCreateProcess,
    startUpdateProcess,
    createTable,
    updateTable,
  };
};
