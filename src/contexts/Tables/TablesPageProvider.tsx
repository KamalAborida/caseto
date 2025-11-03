import type { ReactNode } from "react";
// Import your hooks here when ready
// import { useTablesPage } from "../../hooks/useTablesPage";
// import { useTablesForm } from "../../hooks/useTablesForm";
import { TablesPageContext, type TablesPageContextType } from "./TablesContext";

export const TablesPageProvider = ({ children }: { children: ReactNode }) => {
  // Use your hooks here when ready
  // const tablesPageState = useTablesPage();
  // const tablesFormState = useTablesForm(tablesPageState.closeForm);

  // Placeholder value until hooks are ready
  const value: TablesPageContextType = {
    // Spread your hook states here when ready
    // ...tablesPageState,
    // ...tablesFormState,
  };

  return (
    <TablesPageContext.Provider value={value}>
      {children}
    </TablesPageContext.Provider>
  );
};

