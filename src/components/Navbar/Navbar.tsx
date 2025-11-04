import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { LuUsers, LuTable } from "react-icons/lu";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { SettingsMenu } from "../SettingsMenu";
import { useTranslation } from "../../hooks/useTranslation";

export const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      as="nav"
      width="100%"
      padding="4"
      bg="transparent"
      position="sticky"
      top="0"
      zIndex="sticky"
    >
      <Flex
        maxWidth="container.xl"
        margin="0 auto"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Logo */}
        <Text 
          fontSize="xl" 
          fontWeight="bold"
          cursor="pointer"
          onClick={() => navigate("/home")}
          _hover={{ opacity: 0.8 }}
          transition="opacity 0.2s"
        >
          {t("MyApp")}
        </Text>

        {/* Right Side - Language Switcher and Settings */}
        <Flex gap="4" alignItems="center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("users")}
            aria-label={t("Users")}
            bg={location.pathname === "/home/users" ? "brand.50" : "transparent"}
            _hover={{ bg: location.pathname === "/users" ? "brand.200" : "gray.100" }}
          >
            <LuUsers />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/home")}
            aria-label={t("Tables")}
            bg={location.pathname === "/home" ? "brand.50" : "transparent"}
            _hover={{ bg: location.pathname === "/" ? "brand.200" : "gray.100" }}
          >
            <LuTable />
          </Button>
          <LanguageSwitcher />
          <SettingsMenu />
        </Flex>
      </Flex>
    </Box>
  );
};

