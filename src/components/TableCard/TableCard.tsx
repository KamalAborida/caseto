import { Box, Card, Flex, Text, Badge } from "@chakra-ui/react";
import { useTranslation } from "../../hooks/useTranslation";

export interface TableCardProps {
  name: string;
  columns?: string[];
  onClick?: () => void;
}

export const TableCard = ({ name, columns, onClick }: TableCardProps) => {
  const { t } = useTranslation();

  return (
    <Card.Root
      onClick={onClick}
      cursor={onClick ? "pointer" : "default"}
      _hover={
        onClick
          ? {
              transform: "translateY(-4px)",
              shadow: "lg",
            }
          : {}
      }
      transition="all 0.2s ease-in-out"
      shadow="md"
      borderRadius="lg"
      overflow="hidden"
      minWidth={"300px"}
    >
      <Card.Body p="6">
        <Flex direction="column" gap="4">
          {/* Table Name */}
          <Text fontSize="xl" fontWeight="bold" color="brand.500">
            {name}
          </Text>

          {/* Column Tags */}
          {columns && columns.length > 0 && (
            <Box>
              <Text fontSize="sm" color="gray.500" mb="2" fontWeight="medium">
                {t("Columns:")}
              </Text>
              <Flex wrap="wrap" gap="2">
                {columns.map((column, index) => (
                  <Badge
                    key={index}
                    colorPalette="brand"
                    variant="subtle"
                    size="sm"
                    px="2"
                    py="1"
                    borderRadius="md"
                  >
                    {column}
                  </Badge>
                ))}
              </Flex>
            </Box>
          )}
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};

