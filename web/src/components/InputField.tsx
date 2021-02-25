import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Icon,
  FormHelperText,
  Tooltip,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { REGULAR_BROWN } from "../utils/colors";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
  icon?: IconType;
  hint?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  icon,
  hint,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error} mt={4}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Tooltip
        label={error}
        background="#e86471"
        color="white"
        isDisabled={!error}
        defaultIsOpen={!!error}
        placement="top-end"
      >
        <InputGroup>
          <Input {...field} {...props} id={field.name} />
          {icon ? (
            <InputLeftElement>
              <Icon as={icon} />
            </InputLeftElement>
          ) : null}
        </InputGroup>
      </Tooltip>

      {hint ? (
        <FormHelperText color={REGULAR_BROWN}>{hint}</FormHelperText>
      ) : null}
    </FormControl>
  );
};
