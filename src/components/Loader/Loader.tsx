import { Box, Spinner, Text, VStack } from "@chakra-ui/react"
import { useTranslation } from "../../hooks/useTranslation"

interface LoaderProps {
  isLoading: boolean
  loadingMsg?: string
}

export function Loader({ isLoading, loadingMsg }: LoaderProps) {
  const { t } = useTranslation()
  
  if (!isLoading) return null

  const message = loadingMsg || t('Loading')

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="200px"
      p="lg"
    >
      <VStack gap="md">
        <Spinner
          size="xl"
          color="brand.200"
        />
        <Text 
          color="brand.200" 
          fontSize="md"
          fontWeight="medium"
        >
          {message}
        </Text>
      </VStack>
    </Box>
  )
}

