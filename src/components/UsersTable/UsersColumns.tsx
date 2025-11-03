import { Box, IconButton } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { Column } from "../Table/Table";

interface User extends Record<string, unknown> {
  id: string;
  fullName: string;
  emailAddress: string;
  roleApp: string;
}

interface UsersColumnsProps {
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
}

export const getUsersColumns = ({
  onEdit,
  onDelete,
}: UsersColumnsProps): Column<User>[] => {
  return [
    {
      key: "fullName",
      header: "Full Name",
      textAlign: "start",
    },
    {
      key: "emailAddress",
      header: "Email Address",
      textAlign: "start",
    },
    {
      key: "roleApp",
      header: "Role",
      textAlign: "start",
      render: (row: User) => {
        const roleLabels: Record<string, string> = {
          superAdmin: "Super Admin",
          editor: "Editor",
          viewer: "Viewer",
        };
        return roleLabels[row.roleApp] || row.roleApp;
      },
    },
    {
      key: "id",
      header: "Actions",
      textAlign: "center",
      render: (row: User) => (
        <Box display="flex" gap={2} justifyContent="center">
          <IconButton
            aria-label="Edit user"
            size="sm"
            colorScheme="blue"
            onClick={() => onEdit(row.id)}
          >
            <FaEdit />
          </IconButton>
          <IconButton
            aria-label="Delete user"
            size="sm"
            colorScheme="red"
            onClick={() => onDelete(row.id)}
          >
            <FaTrash />
          </IconButton>
        </Box>
      ),
    },
  ];
};

export type { User };

