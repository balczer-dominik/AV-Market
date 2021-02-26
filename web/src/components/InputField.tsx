import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  FormHelperText,
  Tooltip,
  InputRightElement,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
  LIGHTER_REGULAR_BROWN,
  LIGHTEST_REGULAR_BROWN,
  REGULAR_BROWN,
} from "../utils/colors";
import { FaEye } from "react-icons/fa";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
  icon?: IconType;
  hint?: string;
  password?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  icon,
  hint,
  password = false,
  ...props
}) => {
  const [field, { error }] = useField(props);
  const { isOpen: showPassword, onToggle: togglePassword } = useDisclosure();
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
          <Input
            {...field}
            {...props}
            type={password && !showPassword ? "password" : "text"}
            id={field.name}
          />
          {icon ? (
            <InputLeftElement>
              <Icon as={icon} />
            </InputLeftElement>
          ) : null}
          {password ? (
            <InputRightElement>
              <Icon
                color={
                  showPassword ? LIGHTER_REGULAR_BROWN : LIGHTEST_REGULAR_BROWN
                }
                aria-label={"Jelszó megjelenítése."}
                as={FaEye}
                onClick={togglePassword}
              />
            </InputRightElement>
          ) : null}
        </InputGroup>
      </Tooltip>

      {hint ? (
        <FormHelperText color={LIGHTER_REGULAR_BROWN}>{hint}</FormHelperText>
      ) : null}
    </FormControl>
  );
};
