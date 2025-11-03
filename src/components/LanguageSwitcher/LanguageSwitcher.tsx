import { Button, Menu } from "@chakra-ui/react";
import { Portal } from "@chakra-ui/react";
import { useTranslation } from "../../hooks/useTranslation";

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const menuItemStyleProps = { _hover: { bg: "brand.50", cursor: "pointer" } };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getCurrentLanguageLabel = () => {
    return i18n.language === "en" ? t("English") : t("Italiano");
  };

  return (
    <Menu.Root positioning={{ placement: "bottom" }}>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          {getCurrentLanguageLabel()}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item
              {...menuItemStyleProps}
              value="en"
              onClick={() => changeLanguage("en")}
            >
              {t("English")}
            </Menu.Item>
            <Menu.Item
              {...menuItemStyleProps}
              value="it"
              onClick={() => changeLanguage("it")}
            >
              {t("Italiano")}
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
