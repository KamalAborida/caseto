import { UsersPageProvider } from "../../contexts/Users/UsersPageProvider";
import UsersContent from "./UsersContent";

const Users = () => {
  return (
    <UsersPageProvider>
      <UsersContent />
    </UsersPageProvider>
  );
};

export default Users;

