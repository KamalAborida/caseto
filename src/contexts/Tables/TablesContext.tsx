import { createContext, useContext } from "react";
import { useTableSelection } from "../../hooks/useTableSelection";
import { useTablesPage } from "../../hooks/useTablesPage";
import { useTablesForm } from "../../hooks/useTablesForm";

// Types
export type TablesPageContextType = ReturnType<typeof useTableSelection> & 
  ReturnType<typeof useTablesPage> & 
  ReturnType<typeof useTablesForm>

export const TablesPageContext = createContext<
  TablesPageContextType | undefined
>(undefined);

// Custom hook to use the context
export const useTablesPageContext = () => {
  const context = useContext(TablesPageContext);

  if (context === undefined) {
    throw new Error(
      "useTablesPageContext must be used within TablesPageProvider"
    );
  }

  return context;
};
