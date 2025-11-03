import { Box, Flex, Text } from "@chakra-ui/react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { CustomersSettingsMenu } from "../CustomersSettingsMenu/CustomersSettingsMenu";
import { useTranslation } from "../../hooks/useTranslation";

export const CustomersNavbar = () => {
  const { t } = useTranslation();

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
          transition="opacity 0.2s"
        >
          {t("MyApp")}
        </Text>

        {/* Right Side - Language Switcher and Settings */}
        <Flex gap="4" alignItems="center">
          <LanguageSwitcher />
          <CustomersSettingsMenu />
        </Flex>
      </Flex>
    </Box>
  );
};

