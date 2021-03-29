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
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import React, { InputHTMLAttributes, useContext, useRef } from "react";
import { IconType } from "react-icons";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HIDE_PASSWORD, SHOW_PASSWORD } from "src/resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { BsTypeUnderline } from "react-icons/bs";

type FieldType = "regular" | "password" | "number" | "textarea" | "select";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  type?: FieldType;
  icon?: IconType;
  hint?: string[];
  ref?: React.MutableRefObject<undefined>;
  select?: string[];
  values?: string[];
  bgColor?: string;
  onChange?: () => void;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
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
  values,
  ...props
}) => {
  const {
    theme: {
      BG_COLOR,
      FRONT_COLOR_LIGHTER,
      FRONT_COLOR_LIGHTEST,
      ACCENT_COLOR,
      WHITE,
    },
  } = useContext(ThemeContext);
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
      <FormLabel htmlFor={field.name} color={ACCENT_COLOR}>
        {label}
      </FormLabel>
      <Tooltip
        label={error}
        background="#e86471"
        color={WHITE}
        isDisabled={!error}
        defaultIsOpen={!!error}
        placement="top-end"
        isOpen={!!error}
      >
        <InputGroup>
          {select ? (
            <Field
              bgColor={bgColor ?? BG_COLOR}
              as={Select}
              {...props}
              borderColor={FRONT_COLOR_LIGHTER}
              borderWidth={"0.15rem"}
              _hover={{ borderColor: FRONT_COLOR_LIGHTEST }}
            >
              {values
                ? select.map((v, i) => <option value={values[i]}>{v}</option>)
                : select.map((v) => <option value={v}>{v}</option>)}
            </Field>
          ) : type === "textarea" ? (
            <Textarea
              bgColor={bgColor ?? BG_COLOR}
              ref={ref}
              id={field.name}
              borderColor={FRONT_COLOR_LIGHTER}
              borderWidth={"0.15rem"}
              _hover={{ borderColor: FRONT_COLOR_LIGHTEST }}
              {...field}
            />
          ) : (
            <Input
              bgColor={bgColor ?? BG_COLOR}
              color={ACCENT_COLOR}
              textAlign={type === "number" ? "right" : "left"}
              ref={ref}
              type={type === "password" && !showPassword ? "password" : "text"}
              id={field.name}
              borderColor={FRONT_COLOR_LIGHTER}
              borderWidth={"0.15rem"}
              _hover={{ borderColor: FRONT_COLOR_LIGHTEST }}
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
              <Icon as={icon} color={FRONT_COLOR_LIGHTER} />
            </InputLeftElement>
          ) : null}
          {type === "password" ? (
            <Tooltip
              label={showPassword ? HIDE_PASSWORD : SHOW_PASSWORD}
              placement="bottom-end"
              closeOnClick={false}
              color={WHITE}
              bg={FRONT_COLOR_LIGHTER}
            >
              <InputRightElement onClick={togglePassword}>
                <Icon
                  color={FRONT_COLOR_LIGHTER}
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
            <FormHelperText mt={0} color={FRONT_COLOR_LIGHTER}>
              {h}
            </FormHelperText>
          ))}
        </Box>
      ) : null}
    </FormControl>
  );
};
