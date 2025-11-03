import { useState, useCallback } from "react";
import * as Yup from "yup";
import { usePostRequest } from "./usePostRequest";
import { usePutRequest } from "./usePutRequest";
import { useGetRequest } from "./useGetRequest";

// Types
type FormMode = "CREATE" | "UPDATE";

interface UserData {
  fullName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
  roleApp: string;
}

// Validation Schema for CREATE mode
export const createUserValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  emailAddress: Yup.string()
    .required("Email address is required")
    .email("Please enter a valid email address"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
  roleApp: Yup.string()
    .required("Please select a role")
    .oneOf(["superAdmin", "editor", "viewer"], "Invalid role selected"),
});

// Validation Schema for UPDATE mode (only fullName and roleApp)
export const updateUserValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  roleApp: Yup.string()
    .required("Please select a role")
    .oneOf(["superAdmin", "editor", "viewer"], "Invalid role selected"),
});

export const useUsersForm = (closeForm: () => void) => {
  const [mode, setMode] = useState<FormMode>("CREATE");
  const [userDataToUpdate, setUserDataToUpdate] = useState<Record<string, string>>({});

  const { execute: postRequest } = usePostRequest();
  const { execute: putRequest } = usePutRequest();
  const { execute: getRequest } = useGetRequest();

  const startCreateProcess = useCallback(() => {
    setMode("CREATE");
    setUserDataToUpdate({});
  }, []);

  const startUpdateProcess = useCallback(async (userId: string) => {
    setMode("UPDATE");
    
    try {
      // Fetch user data from server
      const response = await getRequest(`/user/get?id=${userId}`);

      console.log("response", response);
      
      if (response && response.user) {
        setUserDataToUpdate(response.user);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }, [getRequest]);

  const createUser = useCallback(async (data: UserData) => {
    try {
      const response = await postRequest("/user/create", data);
      
      if (response) {
        closeForm();
        return response;
      }
      
      return null;
    } catch (error) {
      console.error("Failed to create user:", error);
      throw error;
    }
  }, [postRequest, closeForm]);

  const updateUser = useCallback(async (userId: string, data: UserData) => {
    try {
      // Only send fullName and roleApp for updates (id goes in query params)
      const updatePayload = {
        fullName: data.fullName,
        roleApp: data.roleApp,
      };
      
      const response = await putRequest(`/user/update?id=${userId}`, updatePayload);
      
      if (response) {
        closeForm();
        return response;
      }
      
      return null;
    } catch (error) {
      console.error("Failed to update user:", error);
      throw error;
    }
  }, [putRequest, closeForm]);

  return {
    mode,
    userDataToUpdate,
    validationSchema: mode === "CREATE" ? createUserValidationSchema : updateUserValidationSchema,
    startCreateProcess,
    startUpdateProcess,
    createUser,
    updateUser,
  };
};

