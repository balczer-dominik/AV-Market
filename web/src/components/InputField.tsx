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
  Select,
  SelectField,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import { SelectControl } from "formik-chakra-ui";
import React, { InputHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  LIGHTER_REGULAR_BROWN,
  LIGHTEST_REGULAR_BROWN,
  REGULAR_DARK_BROWN,
} from "../utils/colors";
import { HIDE_PASSWORD, SHOW_PASSWORD } from "../utils/strings";

type FieldType = "regular" | "password" | "number" | "textarea" | "select";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  type?: FieldType;
  icon?: IconType;
  hint?: string[];
  ref?: React.MutableRefObject<undefined>;
  select?: string[];
  bgColor?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  icon,
  hint,
  type = "regular",
  ref,
  select,
  bgColor,
  ...props
}) => {
  const [field, { error }] = useField(props);
  const { isOpen: showPassword, onToggle: togglePassword } = useDisclosure();
  return (
    <FormControl
      isInvalid={!!error}
      mt={4}
      maxW={{
        base: type === "number" ? "60%" : "100%",
        md: type === "number" ? "40%" : "100%",
      }}
    >
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
          {select ? (
            <Field
              bgColor={bgColor ?? "white"}
              as={Select}
              {...props}
              borderColor={LIGHTER_REGULAR_BROWN}
              borderWidth={"0.15rem"}
              _hover={{ borderColor: LIGHTEST_REGULAR_BROWN }}
            >
              {select.map((v) => (
                <option value={v}>{v}</option>
              ))}
            </Field>
          ) : type === "textarea" ? (
            <Textarea
              bgColor={bgColor ?? "white"}
              ref={ref}
              id={field.name}
              borderColor={LIGHTER_REGULAR_BROWN}
              borderWidth={"0.15rem"}
              _hover={{ borderColor: LIGHTEST_REGULAR_BROWN }}
              {...field}
            />
          ) : (
            <Input
              bgColor={bgColor ?? "white"}
              textAlign={type === "number" ? "right" : "left"}
              ref={ref}
              type={type === "password" && !showPassword ? "password" : "text"}
              id={field.name}
              borderColor={LIGHTER_REGULAR_BROWN}
              borderWidth={"0.15rem"}
              _hover={{ borderColor: LIGHTEST_REGULAR_BROWN }}
              placeholder={
                type === "password" && !showPassword
                  ? "************"
                  : props.placeholder
              }
              {...field}
            />
          )}
          {icon ? (
            <InputLeftElement>
              <Icon as={icon} color={LIGHTER_REGULAR_BROWN} />
            </InputLeftElement>
          ) : null}
          {type === "password" ? (
            <Tooltip
              label={showPassword ? HIDE_PASSWORD : SHOW_PASSWORD}
              placement="bottom-end"
              closeOnClick={false}
              color="white"
              bg={LIGHTER_REGULAR_BROWN}
            >
              <InputRightElement onClick={togglePassword}>
                <Icon
                  color={LIGHTER_REGULAR_BROWN}
                  aria-label={"Jelszó megjelenítése."}
                  as={showPassword ? FaEyeSlash : FaEye}
                />
              </InputRightElement>
            </Tooltip>
          ) : null}
          {type === "number" ? <InputRightElement>Ft</InputRightElement> : null}
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
