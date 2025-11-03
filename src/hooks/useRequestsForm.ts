import { useCallback } from "react";
import * as Yup from "yup";
import { usePostRequest } from "./usePostRequest";

// Types
interface RequestData {
  depth: string;
  color: string;
  height: string;
  quantity: string;
  typeOfSlide: string;
  capacity: string;
}

// Validation Schema for CREATE mode
export const createRequestValidationSchema = Yup.object().shape({
  depth: Yup.string()
    .required("Depth is required")
    .min(1, "Depth must be at least 1 character"),
  color: Yup.string()
    .required("Color is required")
    .min(1, "Color must be at least 1 character"),
  height: Yup.string()
    .required("Height is required")
    .min(1, "Height must be at least 1 character"),
  quantity: Yup.string()
    .required("Quantity is required")
    .matches(/^\d+$/, "Quantity must be a number"),
  typeOfSlide: Yup.string()
    .required("Type of slide is required")
    .min(1, "Type of slide must be at least 1 character"),
  capacity: Yup.string()
    .required("Capacity is required")
    .min(1, "Capacity must be at least 1 character"),
});

export const useRequestsForm = (closeModal: () => void) => {
  const { execute: postRequest } = usePostRequest();

  const createRequest = useCallback(async (data: RequestData) => {
    try {
      const response = await postRequest("/customer/requests/create", data);
      
      if (response) {
        closeModal();
        return response;
      }
      
      return null;
    } catch (error) {
      console.error("Failed to create request:", error);
      throw error;
    }
  }, [postRequest, closeModal]);

  return {
    validationSchema: createRequestValidationSchema,
    createRequest,
  };
};

