import { Box, VStack, Button, HStack } from "@chakra-ui/react";
import { useTranslation } from "../../hooks/useTranslation";
import { useUsersPageContext } from "../../contexts/Users/UsersContext";
import { UserForm } from "../../components/UserForm/UserForm";
import { UsersTable } from "../../components/UsersTable/UsersTable";

const UsersContent = () => {
  const { t } = useTranslation();
  const { isFormOpened, openForm, closeForm, startCreateProcess } =
    useUsersPageContext();

  const handleCreateClick = () => {
    startCreateProcess();
    openForm();
  };

  return (
    <Box padding={"md"}>
      <VStack gap={6} align="stretch">
        {isFormOpened ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={4}
          >
            <UserForm />
            <Button variant="outline" onClick={closeForm}>
              {t("Cancel")}
            </Button>
          </Box>
        ) : (
          <UsersTable />
        )}
      </VStack>

      <HStack justifyContent="flex-end" alignItems="center" mt={"md"}>
        {!isFormOpened && (
          <Button colorScheme="blue" onClick={handleCreateClick}>
            {t("Create User")}
          </Button>
        )}
      </HStack>
    </Box>
  );
};

export default UsersContent;
