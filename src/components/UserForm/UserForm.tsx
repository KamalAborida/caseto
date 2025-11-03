import { Formik, Form } from "formik";
import { Box, Button, VStack, Text } from "@chakra-ui/react";
import { LabelInput } from "../LabelInput";
import { LabelSelect } from "../LabelSelect";
import { ErrorMsg } from "../ErrorMsg";
import { Loader } from "../Loader";
import { useUsersPageContext } from "../../contexts/Users/UsersContext";

export interface UserFormData {
  fullName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
  roleApp: string;
}

export const UserForm = () => {
  const {
    mode,
    userDataToUpdate,
    validationSchema,
    createUser,
    updateUser,
  } = useUsersPageContext();

  const initialValues: UserFormData = {
    fullName: userDataToUpdate.fullName || "",
    emailAddress: userDataToUpdate.emailAddress || "",
    password: "",
    confirmPassword: "",
    roleApp: userDataToUpdate.roleApp || "",
  };

  const roleOptions = [
    { value: "superAdmin", label: "Super Admin" },
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Viewer" },
  ];

  const handleSubmit = async (
    values: UserFormData,
    { setSubmitting, setFieldError, resetForm }: any
  ) => {
    try {
      if (mode === "CREATE") {
        await createUser(values);
        resetForm();
      } else {
        const userId = userDataToUpdate.id || "";
        await updateUser(userId, values);
      }
    } catch (error: any) {
      setFieldError("general", error?.message || "An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, isSubmitting, setFieldValue, handleChange }) => (
        <Box
          as={Form}
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
              {mode === "CREATE" ? "Create New User" : "Update User"}
            </Text>

            <ErrorMsg
              isError={!!(errors as any).general}
              errorMsg={(errors as any).general || ""}
              isInBox={true}
            />

            <LabelInput
              labelText="Full Name"
              placeholder="Enter full name"
              onChange={handleChange("fullName")}
              inputProps={{
                value: values.fullName,
                disabled: isSubmitting,
                name: "fullName",
              }}
              errorMsg={touched.fullName ? errors.fullName : undefined}
              isError={!!(touched.fullName && errors.fullName)}
            />

            {mode === "CREATE" && (
              <LabelInput
                labelText="Email Address"
                placeholder="Enter email address"
                inputType="email"
                onChange={handleChange("emailAddress")}
                inputProps={{
                  value: values.emailAddress,
                  disabled: isSubmitting,
                  name: "emailAddress",
                }}
                errorMsg={touched.emailAddress ? errors.emailAddress : undefined}
                isError={!!(touched.emailAddress && errors.emailAddress)}
              />
            )}

            {mode === "UPDATE" && (
              <LabelInput
                labelText="Email Address"
                placeholder="Enter email address"
                inputType="email"
                onChange={handleChange("emailAddress")}
                inputProps={{
                  value: values.emailAddress,
                  disabled: true,
                  name: "emailAddress",
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
                  onChange={handleChange("password")}
                  inputProps={{
                    value: values.password,
                    disabled: isSubmitting,
                    name: "password",
                  }}
                  errorMsg={touched.password ? errors.password : undefined}
                  isError={!!(touched.password && errors.password)}
                />

                <LabelInput
                  labelText="Confirm Password"
                  placeholder="Confirm password"
                  inputType="password"
                  onChange={handleChange("confirmPassword")}
                  inputProps={{
                    value: values.confirmPassword,
                    disabled: isSubmitting,
                    name: "confirmPassword",
                  }}
                  errorMsg={touched.confirmPassword ? errors.confirmPassword : undefined}
                  isError={!!(touched.confirmPassword && errors.confirmPassword)}
                />
              </>
            )}

            <LabelSelect
              labelText="Role"
              placeholder="Select a role"
              options={roleOptions}
              onChange={(value) => setFieldValue("roleApp", value)}
              selectProps={{
                value: values.roleApp,
                disabled: isSubmitting,
              }}
              errorMsg={touched.roleApp ? errors.roleApp : undefined}
              isError={!!(touched.roleApp && errors.roleApp)}
            />

            <Button
              type="submit"
              width="100%"
              colorScheme="blue"
              size="lg"
              disabled={isSubmitting}
            >
              <Loader isLoading={isSubmitting} loadingMsg="Submitting..." />
              {mode === "CREATE" ? "Create User" : "Update User"}
            </Button>
          </VStack>
        </Box>
      )}
    </Formik>
  );
};

