import type { ReactNode } from "react";
import { useUsersPage } from "../../hooks/useUsersPage";
import { useUsersForm } from "../../hooks/useUsersForm";
import { UsersPageContext, type UsersPageContextType } from "./UsersContext";

export const UsersPageProvider = ({ children }: { children: ReactNode }) => {
  const usersPageState = useUsersPage();
  const usersFormState = useUsersForm(usersPageState.closeForm);

  const value: UsersPageContextType = {
    ...usersPageState,
    ...usersFormState,
  };

  return (
    <UsersPageContext.Provider value={value}>
      {children}
    </UsersPageContext.Provider>
  );
};

