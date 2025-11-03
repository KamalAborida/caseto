import {
  Field,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
  createListCollection,
} from "@chakra-ui/react";
import { ErrorMsg } from "../ErrorMsg/ErrorMsg";

interface SelectOption {
  value: string;
  label: string;
}

interface LabelSelectProps {
  labelText: string;
  placeholder?: string;
  options: SelectOption[];
  selectProps?: {
    value?: string;
    disabled?: boolean;
  };
  labelProps?: React.ComponentProps<typeof Field.Label>;
  errorMsg?: string;
  isError?: boolean;
  onChange?: (value: string) => void;
}

export function LabelSelect({
  labelText,
  placeholder = "Select an option",
  options,
  selectProps,
  labelProps,
  errorMsg = "",
  isError = false,
  onChange,
}: LabelSelectProps) {
  const collection = createListCollection({
    items: options,
  });

  return (
    <Field.Root invalid={isError}>
      <Field.Label {...labelProps}>{labelText}</Field.Label>

      <SelectRoot
        collection={collection}
        value={selectProps?.value ? [selectProps.value] : []}
        onValueChange={(e) => onChange?.(e.value[0])}
        disabled={selectProps?.disabled}
      >
        <SelectTrigger>
          <SelectValueText placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} item={option}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>

      <ErrorMsg isError={isError} errorMsg={errorMsg} />
    </Field.Root>
  );
}

