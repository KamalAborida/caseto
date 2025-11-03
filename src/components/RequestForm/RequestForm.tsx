import { Formik, Form } from "formik";
import { Box, Button, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { LabelInput } from "../LabelInput";
import { ErrorMsg } from "../ErrorMsg";
import { Loader } from "../Loader";
import { useCustomersPageContext } from "../../contexts/Customers/CustomersContext";

export interface RequestFormData {
  depth: string;
  color: string;
  height: string;
  quantity: string;
  typeOfSlide: string;
  capacity: string;
}

export const RequestForm = () => {
  const {
    validationSchema,
    createRequest,
  } = useCustomersPageContext();

  const initialValues: RequestFormData = {
    depth: "",
    color: "",
    height: "",
    quantity: "",
    typeOfSlide: "",
    capacity: "",
  };

  const handleSubmit = async (
    values: RequestFormData,
    { setSubmitting, setFieldError, resetForm }: any
  ) => {
    try {
      await createRequest(values);
      resetForm();
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
    >
      {({ values, errors, touched, isSubmitting, handleChange }) => (
        <Box
          as={Form}
          width="100%"
        >
          <VStack gap="4" alignItems="stretch">
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              Create New Request
            </Text>

            <ErrorMsg
              isError={!!(errors as any).general}
              errorMsg={(errors as any).general || ""}
              isInBox={true}
            />

            <SimpleGrid columns={2} gap={4}>
              <LabelInput
                labelText="Depth"
                placeholder="Enter depth"
                onChange={handleChange("depth")}
                inputProps={{
                  value: values.depth,
                  disabled: isSubmitting,
                  name: "depth",
                }}
                errorMsg={touched.depth ? errors.depth : undefined}
                isError={!!(touched.depth && errors.depth)}
              />

              <LabelInput
                labelText="Color"
                placeholder="Enter color"
                onChange={handleChange("color")}
                inputProps={{
                  value: values.color,
                  disabled: isSubmitting,
                  name: "color",
                }}
                errorMsg={touched.color ? errors.color : undefined}
                isError={!!(touched.color && errors.color)}
              />

              <LabelInput
                labelText="Height"
                placeholder="Enter height"
                onChange={handleChange("height")}
                inputProps={{
                  value: values.height,
                  disabled: isSubmitting,
                  name: "height",
                }}
                errorMsg={touched.height ? errors.height : undefined}
                isError={!!(touched.height && errors.height)}
              />

              <LabelInput
                labelText="Quantity"
                placeholder="Enter quantity"
                onChange={handleChange("quantity")}
                inputProps={{
                  value: values.quantity,
                  disabled: isSubmitting,
                  name: "quantity",
                }}
                errorMsg={touched.quantity ? errors.quantity : undefined}
                isError={!!(touched.quantity && errors.quantity)}
              />

              <LabelInput
                labelText="Type of Slide"
                placeholder="Enter type of slide"
                onChange={handleChange("typeOfSlide")}
                inputProps={{
                  value: values.typeOfSlide,
                  disabled: isSubmitting,
                  name: "typeOfSlide",
                }}
                errorMsg={touched.typeOfSlide ? errors.typeOfSlide : undefined}
                isError={!!(touched.typeOfSlide && errors.typeOfSlide)}
              />

              <LabelInput
                labelText="Capacity"
                placeholder="Enter capacity"
                onChange={handleChange("capacity")}
                inputProps={{
                  value: values.capacity,
                  disabled: isSubmitting,
                  name: "capacity",
                }}
                errorMsg={touched.capacity ? errors.capacity : undefined}
                isError={!!(touched.capacity && errors.capacity)}
              />
            </SimpleGrid>

            <Button
              type="submit"
              width="100%"
              colorScheme="blue"
              size="lg"
              disabled={isSubmitting}
            >
              <Loader isLoading={isSubmitting} loadingMsg="Submitting..." />
              Create Request
            </Button>
          </VStack>
        </Box>
      )}
    </Formik>
  );
};

