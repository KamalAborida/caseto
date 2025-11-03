import { Formik, Form } from "formik";
import { Box, Button, VStack, Text, Grid } from "@chakra-ui/react";
import * as Yup from "yup";
import { LabelInput } from "../LabelInput";
import { LabelSelect } from "../LabelSelect";
import { Loader } from "../Loader";
import { ErrorMsg } from "../ErrorMsg";

export interface FieldConfig {
  name: string;
  isRequired: boolean;
  type: string;
  initialValue?: any;
  label?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  [key: string]: any;
}

export interface TablesDynamicFormProps {
  fields: FieldConfig[];
  onSubmit: (values: any, formikHelpers: any) => void | Promise<void>;
  submitButtonText?: string;
  formTitle?: string;
}

export const TablesDynamicForm = ({
  fields,
  onSubmit,
  submitButtonText = "Submit",
  formTitle,
}: TablesDynamicFormProps) => {
  // Build initial values from fields
  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] =
      field.initialValue !== undefined ? field.initialValue : "";
    return acc;
  }, {} as Record<string, any>);

  // Build validation schema from fields
  const validationSchema = Yup.object(
    fields.reduce((acc, field) => {
      if (field.isRequired) {
        let fieldSchema: any = Yup.string().required(
          `${field.label || field.name} is required`
        );

        // Handle different field types for validation
        if (field.type === "email") {
          fieldSchema = Yup.string()
            .email("Invalid email address")
            .required(`${field.label || field.name} is required`);
        } else if (field.type === "number") {
          fieldSchema = Yup.number().required(
            `${field.label || field.name} is required`
          );
        }

        acc[field.name] = fieldSchema;
      } else {
        // Optional fields
        if (field.type === "email") {
          acc[field.name] = Yup.string().email("Invalid email address");
        } else if (field.type === "number") {
          acc[field.name] = Yup.number();
        } else {
          acc[field.name] = Yup.string();
        }
      }
      return acc;
    }, {} as Record<string, any>)
  );

  // Render field based on type
  const renderField = (field: FieldConfig, formikProps: any) => {
    const {
      values,
      errors,
      touched,
      isSubmitting,
      handleChange,
      setFieldValue,
    } = formikProps;
    const fieldError = touched[field.name] ? errors[field.name] : undefined;
    const hasError = !!(touched[field.name] && errors[field.name]);

    switch (field.type) {
      case "select":
        return (
          <LabelSelect
            key={field.name}
            labelText={field.label || field.name}
            placeholder={
              field.placeholder || `Select ${field.label || field.name}`
            }
            options={field.options || []}
            onChange={(value) => setFieldValue(field.name, value)}
            selectProps={{
              value: values[field.name],
              disabled: isSubmitting,
            }}
            errorMsg={fieldError}
            isError={hasError}
          />
        );

      case "password":
      case "email":
      case "text":
      case "number":
      default:
        return (
          <LabelInput
            key={field.name}
            labelText={field.label || field.name}
            placeholder={
              field.placeholder || `Enter ${field.label || field.name}`
            }
            inputType={
              field.type === "password"
                ? "password"
                : field.type === "email"
                ? "email"
                : field.type === "number"
                ? "number"
                : "text"
            }
            onChange={handleChange(field.name)}
            inputProps={{
              value: values[field.name],
              disabled: isSubmitting,
              name: field.name,
            }}
            errorMsg={fieldError}
            isError={hasError}
          />
        );
    }
  };

  const handleFormSubmit = async (values: any, formikHelpers: any) => {
    try {
      await onSubmit(values, formikHelpers);
    } catch (error: any) {
      formikHelpers.setFieldError(
        "general",
        error?.message || "An error occurred. Please try again."
      );
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
      enableReinitialize
    >
      {(formikProps) => {
        const { errors, isSubmitting } = formikProps;

        return (
          <Box
            as={Form}
            width="100%"
            // maxWidth="500px"
            padding="8"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            // boxShadow="lg"
            // bg="white"
            // _dark={{ bg: "gray.800" }}
          >
            <VStack gap="6" alignItems="stretch">
              {formTitle && (
                <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                  {formTitle}
                </Text>
              )}

              <ErrorMsg
                isError={!!(errors as any).general}
                errorMsg={(errors as any).general || ""}
                isInBox={true}
              />

              <Grid templateColumns="repeat(2, 1fr)" gap="md">
                {fields.map((field) => renderField(field, formikProps))}
              </Grid>

              <Button
                type="submit"
                width="100%"
                colorScheme="blue"
                size="lg"
                disabled={isSubmitting}
              >
                <Loader isLoading={isSubmitting} loadingMsg="Submitting..." />
                {submitButtonText}
              </Button>
            </VStack>
          </Box>
        );
      }}
    </Formik>
  );
};
