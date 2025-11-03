import { Box, Heading, Text, Stack, Button } from "@chakra-ui/react";
// import { Button } from "./Button/Button"
import { Loader } from "./Loader";
import { ErrorMsg } from "./ErrorMsg";
import { LabelInput } from "./LabelInput/LabelInput";
import { FaLock } from "react-icons/fa";
import { TablesDynamicFormExample } from "./TablesDynamicForm/TablesDynamicFormExample";

export function ThemeExample() {
  return (
    <Stack gap="lg" p="xl">
      <Box>
        <Heading size="2xl" fontFamily="heading" mb="md">
          Custom Theme Example
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Your custom theme is working! Here are some examples:
        </Text>
      </Box>

      {/* Brand Colors */}
      <Box>
        <Heading size="lg" mb="sm">
          Brand Colors
        </Heading>
        <Stack direction="row" gap="sm">
          <Box bg="brand.300" p="md" borderRadius="md" color="white">
            brand.300
          </Box>
          <Box bg="brand.400" p="md" borderRadius="md" color="white">
            brand.400
          </Box>
          <Box bg="brand.200" p="md" borderRadius="md" color="white">
            brand.200
          </Box>
        </Stack>
      </Box>

      {/* Spacing & Radii */}
      <Box>
        <Heading size="lg" mb="sm">
          Spacing & Border Radius
        </Heading>
        <Stack direction="row" gap="md">
          <Box bg="brand.100" p="xs" borderRadius="sm" color="white">
            xs padding, sm radius
          </Box>
          <Box bg="brand.100" p="md" borderRadius="lg" color="white">
            md padding, lg radius
          </Box>
          <Box bg="brand.100" p="lg" borderRadius="full" color="white">
            lg padding, full radius
          </Box>
        </Stack>
      </Box>

      {/* Shadows */}
      <Box>
        <Heading size="lg" mb="sm">
          Shadows
        </Heading>
        <Stack direction="row" gap="md">
          <Box p="md" shadow="sm" borderRadius="md" bg="white">
            Small shadow
          </Box>
          <Box p="md" shadow="md" borderRadius="md" bg="white">
            Medium shadow
          </Box>
          <Box p="md" shadow="lg" borderRadius="md" bg="white">
            Large shadow
          </Box>
        </Stack>
      </Box>

      {/* Buttons using theme */}
      <Box>
        <Heading size="lg" mb="sm">
          Custom Button Variants
        </Heading>
        <Stack direction="row" gap="sm">
          <Button variant="solid">Primary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </Stack>
      </Box>

      {/* Error Examples */}
      <Box>
        <Heading size="lg" mb="sm">
          Error Component
        </Heading>
        <Stack gap="md">
          <Box bg="white" p="md" borderRadius="md">
            <Text fontSize="sm" color="gray.600" mb="sm">
              Simple error:
            </Text>
            <ErrorMsg isError={true} errorMsg="This is an error message" />
          </Box>
          <Box bg="white" p="md" borderRadius="md">
            <Text fontSize="sm" color="gray.600" mb="sm">
              Error in box:
            </Text>
            <ErrorMsg
              isError={true}
              errorMsg="This is an error message"
              isInBox={true}
            />
          </Box>
        </Stack>
      </Box>

      {/* Loader Examples */}
      <Box>
        <Heading size="lg" mb="sm">
          Loader Component
        </Heading>
        <Stack gap="md">
          <Box bg="white" p="md" borderRadius="md">
            <Text fontSize="sm" color="gray.600" mb="sm">
              Simple loader:
            </Text>
            <Loader isLoading={true} />
          </Box>
          <Box bg="white" p="md" borderRadius="md">
            <Text fontSize="sm" color="gray.600" mb="sm">
              Loader with message:
            </Text>
            <Loader isLoading={true} loadingMsg="Loading your data..." />
          </Box>
        </Stack>
      </Box>

      {/* Label Input Examples */}
      <Box>
        <Heading size="lg" mb="sm">
          Label Input Component
        </Heading>
        <Stack gap="md">
          <Box bg="white" p="md" borderRadius="md">
            <Text fontSize="sm" color="gray.600" mb="sm">
              Simple label input:
            </Text>
            <LabelInput labelText="Name" placeholder="Enter your name" />
          </Box>
          <Box bg="white" p="md" borderRadius="md">
            <Text fontSize="sm" color="gray.600" mb="sm">
              Label input with right icon:
            </Text>
            <LabelInput
              labelText="Password"
              placeholder="Enter your password"
              rightIcon={<FaLock />}
              inputType="password"
            />
          </Box>
        </Stack>
      </Box>

      <TablesDynamicFormExample />
    </Stack>
  );
}
