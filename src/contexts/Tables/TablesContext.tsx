import { createContext, useContext } from "react";
// Import your hooks here when ready
// import { useTablesPage } from "../../hooks/useTablesPage";
// import { useTablesForm } from "../../hooks/useTablesForm";

// Types
// For now, using an empty object as placeholder until hooks are ready
export type TablesPageContextType = {
  // Add your context type properties here when hooks are ready
  // Example structure based on Users/Customers pattern:
  // ...ReturnType<typeof useTablesPage> & ReturnType<typeof useTablesForm>
};

export const TablesPageContext = createContext<TablesPageContextType | undefined>(undefined);

// Custom hook to use the context
export const useTablesPageContext = () => {
  const context = useContext(TablesPageContext);
  
  if (context === undefined) {
    throw new Error("useTablesPageContext must be used within TablesPageProvider");
  }
  
  return context;
};

