import type { ReactNode } from "react";
import { useCustomersPage } from "../../hooks/useCustomersPage";
import { useRequestsForm } from "../../hooks/useRequestsForm";
import { CustomersPageContext, type CustomersPageContextType } from "./CustomersContext";

export const CustomersPageProvider = ({ children }: { children: ReactNode }) => {
  const customersPageState = useCustomersPage();
  const requestsFormState = useRequestsForm(customersPageState.closeModal);

  const value: CustomersPageContextType = {
    ...customersPageState,
    ...requestsFormState,
  };

  return (
    <CustomersPageContext.Provider value={value}>
      {children}
    </CustomersPageContext.Provider>
  );
};

