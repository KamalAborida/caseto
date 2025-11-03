import { Button, Menu } from "@chakra-ui/react";
import { Portal } from "@chakra-ui/react";
import { LuSettings } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../hooks/useTranslation";

export const CustomersSettingsMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    // Clear token from localStorage if any
    localStorage.removeItem("token");
    console.log("Going back to login...");
    // Navigate to auth page
    navigate("/auth");
  };

  return (
    <Menu.Root positioning={{ placement: "bottom-end" }}>
      <Menu.Trigger asChild>
        <Button variant="ghost" size="sm">
          <LuSettings />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item
              value="back-to-login"
              onClick={handleBackToLogin}
              _hover={{ bg: "red.50", cursor: "pointer" }}
              color="red.600"
            >
              {t("Get back to login")}
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

