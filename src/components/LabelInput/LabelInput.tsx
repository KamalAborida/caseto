import {
  Field,
  Input,
  Box,
  type InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { ErrorMsg } from "../ErrorMsg/ErrorMsg";

interface LabelInputProps {
  labelText: string;
  placeholder?: string;
  rightIcon?: React.ReactNode;
  inputProps?: ChakraInputProps;
  labelProps?: React.ComponentProps<typeof Field.Label>;
  errorMsg?: string;
  isError?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputType?: string;
}

export function LabelInput({
  labelText,
  placeholder,
  rightIcon,
  inputProps,
  labelProps,
  errorMsg = "",
  isError = false,
  onChange,
  inputType = "text",
}: LabelInputProps) {
  return (
    <Field.Root invalid={isError}>
      <Field.Label {...labelProps}>{labelText}</Field.Label>

      <Box position="relative" width="100%">
        <Input
          type={inputType}
          placeholder={placeholder}
          onChange={onChange}
          {...inputProps}
        />
        {rightIcon && (
          <Box
            position="absolute"
            right="15px"
            top="50%"
            transform="translateY(-50%)"
          >
            {rightIcon}
          </Box>
        )}
      </Box>

      <ErrorMsg isError={isError} errorMsg={errorMsg} />
    </Field.Root>
  );
}
