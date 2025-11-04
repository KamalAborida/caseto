import { useState } from "react";
import { Box, Button, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LabelInput } from "../LabelInput";
import { usePostRequest } from "../../hooks/usePostRequest";
import { Loader } from "../Loader";
import { ErrorMsg } from "../ErrorMsg";
import { useTranslation } from "../../hooks/useTranslation";

interface LoginResponse {
  user: {
    token: string;
  };
}

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState<string>("");

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { execute, loading, error } = usePostRequest<LoginResponse>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    // Basic validation
    if (!email || !password) {
      setValidationError(t("Please fill in all fields"));
      return;
    }

    if (!email.includes("@")) {
      setValidationError(t("Please enter a valid email address"));
      return;
    }

    try {
      const response = await execute("/user/auth/login", {
        emailAddress: email,
        password: password,
      });

      if (response && response.user && response.user.token) {
        // Store token in localStorage
        localStorage.setItem("token", response.user.token);

        // Navigate to home
        navigate("/home");
      }
    } catch (err: any) {
      // Error is already handled by the hook
      console.error("Login error:", err);
    }
  };

  // Extract error message from the error response
  const getErrorMessage = () => {
    if (validationError) return validationError;
    if (error) {
      return error;
    }
    return "";
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      width="100%"
      maxWidth="400px"
      padding="8"
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
      _dark={{ bg: "gray.800" }}
    >
      <VStack gap="6" alignItems="stretch">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          {t("login")}
        </Text>

        <ErrorMsg
          isError={!!getErrorMessage()}
          errorMsg={getErrorMessage()}
          isInBox={true}
        />

        <LabelInput
          labelText={t("Email")}
          placeholder={t("Enter your email")}
          // inputType="email"
          onChange={(e) => setEmail(e.target.value)}
          inputProps={{
            value: email,
            disabled: loading,
          }}
        />

        <LabelInput
          labelText={t("Password")}
          placeholder={t("Enter your password")}
          inputType="password"
          onChange={(e) => setPassword(e.target.value)}
          inputProps={{
            value: password,
            disabled: loading,
          }}
        />

        <Button
          type="submit"
          width="100%"
          colorScheme="blue"
          size="lg"
          disabled={loading}
        >
          <Loader isLoading={loading} loadingMsg={t("Logging in...")} />
          {t("login")}
        </Button>

        <Button
          type="button"
          width="100%"
          variant="ghost"
          size="lg"
          onClick={() => navigate("/customers")}
          disabled={loading}
        >
          {t("Continue as guest")}
        </Button>
      </VStack>
    </Box>
  );
};
