import { useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import { Table } from "../Table";
import { Loader } from "../Loader";
import { ErrorMsg } from "../ErrorMsg";
import { useGetRequest } from "../../hooks/useGetRequest";
import { useUsersPageContext } from "../../contexts/Users/UsersContext";
import { getUsersColumns, type User } from "./UsersColumns";

export const UsersTable = () => {
  const { execute, loading, error, data } = useGetRequest<{ users: User[] }>();
  const { openForm, startUpdateProcess, deleteUser } = useUsersPageContext();

  useEffect(() => {
    execute("/user/list");
  }, [execute]);

  const handleEdit = async (userId: string) => {
    await startUpdateProcess(userId);
    openForm();
  };

  const handleDelete = async (userId: string) => {
    await deleteUser(userId);
    await execute("/user/list");
  };

  const columns = getUsersColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <Loader isLoading={loading} />
      </Box>
    );
  }

  if (error && !loading) {
    return (
      <Box mb="4">
        <ErrorMsg isError={true} errorMsg={error} />
        <Button mt={4} onClick={() => execute("/user/list")}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box width="100%">
      <Table
        columns={columns}
        data={data?.users || []}
        interactive
        showBorder
        showColumnBorder
      />
    </Box>
  );
};

