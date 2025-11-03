import { Box, Button, VStack, Text } from "@chakra-ui/react";
import { LabelInput } from "../LabelInput";
import { LabelSelect } from "../LabelSelect";
import { ErrorMsg } from "../ErrorMsg";
import { Loader } from "../Loader";

export interface UserFormUIProps {
  formData: {
    fullName: string;
    emailAddress: string;
    password: string;
    confirmPassword: string;
    roleApp: string;
  };
  errors?: {
    fullName?: string;
    emailAddress?: string;
    password?: string;
    confirmPassword?: string;
    roleApp?: string;
    general?: string;
  };
  onFieldChange: (
    field: keyof UserFormUIProps["formData"],
    value: string
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  submitButtonText?: string;
  title?: string;
  mode?: "CREATE" | "UPDATE";
}

export const UserFormUI = ({
  formData,
  errors = {},
  onFieldChange,
  onSubmit,
  isLoading = false,
  submitButtonText = "Submit",
  title = "User Form",
  mode = "CREATE",
}: UserFormUIProps) => {
  const roleOptions = [
    { value: "superAdmin", label: "Super Admin" },
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Viewer" },
  ];

  return (
    <Box
      as="form"
      onSubmit={onSubmit}
      width="100%"
      maxWidth="500px"
      padding="8"
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
      _dark={{ bg: "gray.800" }}
    >
      <VStack gap="6" alignItems="stretch">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          {title}
        </Text>

        <ErrorMsg
          isError={!!errors.general}
          errorMsg={errors.general || ""}
          isInBox={true}
        />

        <LabelInput
          labelText="Full Name"
          placeholder="Enter full name"
          onChange={(e) => onFieldChange("fullName", e.target.value)}
          inputProps={{
            value: formData.fullName,
            disabled: isLoading,
          }}
          errorMsg={errors.fullName}
          isError={!!errors.fullName}
        />

        {mode === "CREATE" && (
          <LabelInput
            labelText="Email Address"
            placeholder="Enter email address"
            inputType="email"
            onChange={(e) => onFieldChange("emailAddress", e.target.value)}
            inputProps={{
              value: formData.emailAddress,
              disabled: isLoading,
            }}
            errorMsg={errors.emailAddress}
            isError={!!errors.emailAddress}
          />
        )}

        {mode === "UPDATE" && (
          <LabelInput
            labelText="Email Address"
            placeholder="Enter email address"
            inputType="email"
            onChange={(e) => onFieldChange("emailAddress", e.target.value)}
            inputProps={{
              value: formData.emailAddress,
              disabled: true,
            }}
            errorMsg={undefined}
            isError={false}
          />
        )}

        {mode === "CREATE" && (
          <>
            <LabelInput
              labelText="Password"
              placeholder="Enter password"
              inputType="password"
              onChange={(e) => onFieldChange("password", e.target.value)}
              inputProps={{
                value: formData.password,
                disabled: isLoading,
              }}
              errorMsg={errors.password}
              isError={!!errors.password}
            />

            <LabelInput
              labelText="Confirm Password"
              placeholder="Confirm password"
              inputType="password"
              onChange={(e) => onFieldChange("confirmPassword", e.target.value)}
              inputProps={{
                value: formData.confirmPassword,
                disabled: isLoading,
              }}
              errorMsg={errors.confirmPassword}
              isError={!!errors.confirmPassword}
            />
          </>
        )}

        <LabelSelect
          labelText="Role"
          placeholder="Select a role"
          options={roleOptions}
          onChange={(value) => onFieldChange("roleApp", value)}
          selectProps={{
            value: formData.roleApp,
            disabled: isLoading,
          }}
          errorMsg={errors.roleApp}
          isError={!!errors.roleApp}
        />

        <Button
          type="submit"
          width="100%"
          colorScheme="blue"
          size="lg"
          disabled={isLoading}
        >
          <Loader isLoading={isLoading} loadingMsg="Submitting..." />
          {submitButtonText}
        </Button>
      </VStack>
    </Box>
  );
};
