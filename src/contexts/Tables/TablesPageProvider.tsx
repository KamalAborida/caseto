import type { ReactNode } from "react";
import { useTablesPage } from "../../hooks/useTablesPage";
import { useTablesForm } from "../../hooks/useTablesForm";
import { TablesPageContext, type TablesPageContextType } from "./TablesContext";
import { useTableSelection } from "../../hooks/useTableSelection";

export const TablesPageProvider = ({ children }: { children: ReactNode }) => {
  const tablesSelectionState = useTableSelection();
  const tablesPageState = useTablesPage();
  const tablesFormState = useTablesForm(tablesPageState.closeForm);

  const value: TablesPageContextType = {
    ...tablesSelectionState,
    ...tablesPageState,
    ...tablesFormState,
  };

  return (
    <TablesPageContext.Provider value={value}>
      {children}
    </TablesPageContext.Provider>
  );
};

