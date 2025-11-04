import { Button, Menu } from "@chakra-ui/react";
import { Portal } from "@chakra-ui/react";
import { LuSettings } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../hooks/useTranslation";

export const SettingsMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem("token");
    console.log("Logging out...");
    // Navigate to auth page
    navigate("/");
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
              value="logout"
              onClick={handleLogout}
              _hover={{ bg: "red.50", cursor: "pointer" }}
              color="red.600"
            >
              {t("Logout")}
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

