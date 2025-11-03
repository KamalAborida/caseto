import { Box, VStack, Text, Button, HStack } from "@chakra-ui/react";
import { useTranslation } from "../../hooks/useTranslation";
import { useCustomersPageContext } from "../../contexts/Customers/CustomersContext";
import { CustomersTable } from "../../components/CustomersTable/CustomersTable";
import { RequestForm } from "../../components/RequestForm/RequestForm";
import { CustomersNavbar } from "../../components/CustomersNavbar/CustomersNavbar";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogTitle,
} from "../../components/Chakra/dialog";

const CustomersContent = () => {
  const { t } = useTranslation();
  const { isModalOpen, openModal, closeModal } = useCustomersPageContext();

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <CustomersNavbar />
      
      <Box flex="1" padding={"md"}>
        <VStack gap={6} align="stretch">
          <Text fontSize="2xl" fontWeight="bold">
            {t("Customers")}
          </Text>
          
          <CustomersTable />

          <HStack justifyContent="flex-end" alignItems="center">
            <Button colorScheme="blue" onClick={openModal}>
              {t("Make Request")}
            </Button>
          </HStack>
        </VStack>

        <DialogRoot open={isModalOpen} onOpenChange={(e) => !e.open && closeModal()}>
          <DialogBackdrop />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("New Request")}</DialogTitle>
            </DialogHeader>
            <DialogCloseTrigger />
            <DialogBody>
              <RequestForm />
            </DialogBody>
          </DialogContent>
        </DialogRoot>
      </Box>
    </Box>
  );
};

export default CustomersContent;

