import { createContext, useContext } from "react";
import { useCustomersPage } from "../../hooks/useCustomersPage";
import { useRequestsForm } from "../../hooks/useRequestsForm";

// Types
export type CustomersPageContextType = ReturnType<typeof useCustomersPage> & ReturnType<typeof useRequestsForm>;

export const CustomersPageContext = createContext<CustomersPageContextType | undefined>(undefined);

// Custom hook to use the context
export const useCustomersPageContext = () => {
  const context = useContext(CustomersPageContext);
  
  if (context === undefined) {
    throw new Error("useCustomersPageContext must be used within CustomersPageProvider");
  }
  
  return context;
};

