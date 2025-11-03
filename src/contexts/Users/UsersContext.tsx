import { createContext, useContext } from "react";
import { useUsersPage } from "../../hooks/useUsersPage";
import { useUsersForm } from "../../hooks/useUsersForm";

// Types
export type UsersPageContextType = ReturnType<typeof useUsersPage> & ReturnType<typeof useUsersForm>;

export const UsersPageContext = createContext<UsersPageContextType | undefined>(undefined);

// Custom hook to use the context
export const useUsersPageContext = () => {
  const context = useContext(UsersPageContext);
  
  if (context === undefined) {
    throw new Error("useUsersPageContext must be used within UsersPageProvider");
  }
  
  return context;
};
