import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { FaEye } from "react-icons/fa";
import {
  LIGHTER_REGULAR_BROWN,
  LIGHTEST_REGULAR_BROWN,
  REGULAR_DARK_BROWN,
} from "../utils/colors";
import { HIDE_PASSWORD, SHOW_PASSWORD } from "../utils/strings";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
  icon?: IconType;
  hint?: string[];
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
      <FormLabel htmlFor={field.name} color={REGULAR_DARK_BROWN}>
        {label}
      </FormLabel>
      <Tooltip
        label={error}
        background="#e86471"
        color="white"
        isDisabled={!error}
        defaultIsOpen={!!error}
        placement="top-end"
        isOpen={!!error}
      >
        <InputGroup>
          <Input
            {...field}
            {...props}
            type={password && !showPassword ? "password" : "text"}
            id={field.name}
            borderColor={LIGHTER_REGULAR_BROWN}
            borderWidth={"0.15rem"}
            _hover={{ borderColor: LIGHTEST_REGULAR_BROWN }}
          />
          {icon ? (
            <InputLeftElement>
              <Icon as={icon} color={LIGHTER_REGULAR_BROWN} />
            </InputLeftElement>
          ) : null}
          {password ? (
            <Tooltip
              label={showPassword ? HIDE_PASSWORD : SHOW_PASSWORD}
              placement="bottom-end"
              closeOnClick={false}
              color="white"
              bg={LIGHTER_REGULAR_BROWN}
            >
              <InputRightElement>
                <Icon
                  color={
                    showPassword
                      ? LIGHTER_REGULAR_BROWN
                      : LIGHTEST_REGULAR_BROWN
                  }
                  aria-label={"Jelszó megjelenítése."}
                  as={FaEye}
                  onClick={togglePassword}
                />
              </InputRightElement>
            </Tooltip>
          ) : null}
        </InputGroup>
      </Tooltip>

      {hint ? (
        <Box mt={1}>
          {hint.map((h) => (
            <FormHelperText mt={0} color={LIGHTER_REGULAR_BROWN}>
              {h}
            </FormHelperText>
          ))}
        </Box>
      ) : null}
    </FormControl>
  );
};
