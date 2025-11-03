import { Box, Text } from "@chakra-ui/react"

interface ErrorMsgProps {
  isError: boolean
  errorMsg: string
  isInBox?: boolean
}

export function ErrorMsg({ isError, errorMsg, isInBox = false }: ErrorMsgProps) {
  if (!isError) return null

  return (
    <Box
      bg={isInBox ? "red.50" : "transparent"}
      border={isInBox ? "1px solid" : "none"}
      borderColor={isInBox ? "red.300" : "transparent"}
      p={isInBox ? "sm" : "0"}
      borderRadius={isInBox ? "md" : "0"}
    >
      <Text color="red.600" fontSize="sm">
        {errorMsg}
      </Text>
    </Box>
  )
}

