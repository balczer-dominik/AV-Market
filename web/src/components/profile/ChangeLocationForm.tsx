import { Form, Formik } from "formik";
import React from "react";
import { FaCity, FaMapMarkerAlt } from "react-icons/fa";
import {
  useChangeLocationMutation,
  useMeLocationQuery,
} from "../../generated/graphql";
import {
  CHANGE_LOCATION_SUCCESS,
  CONFIRM_CHANGE_LABEL,
  counties,
  CURRENT_LOCATION_LABEL,
  NEW_CITY_LABEL,
  NEW_COUNTY_LABEL,
} from "src/resources/strings";
import { toErrorMap } from "@utils/toErrorMap";
import { useBetterToast } from "@utils/hooks/useBetterToast";
import { InputField } from "../InputField";
import { RegularButton } from "../RegularButton";
import { Text } from "@chakra-ui/react";

interface ChangeLocationFormProps {}

export const ChangeLocationForm: React.FC<ChangeLocationFormProps> = ({}) => {
  const [, changeLocation] = useChangeLocationMutation();
  const [{ data }, meLocation] = useMeLocationQuery();
  const toast = useBetterToast();

  return (
    <Formik
      initialValues={{
        newCounty: "",
        newCity: "",
      }}
      onSubmit={async ({ newCity, newCounty }, { setErrors }) => {
        const errors = (
          await changeLocation({ county: newCounty, city: newCity })
        ).data.changeLocation.errors;
        if (errors) {
          setErrors(toErrorMap(errors));
          return;
        }
        meLocation();
        toast("success", CHANGE_LOCATION_SUCCESS);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField
            name="newCounty"
            label={NEW_COUNTY_LABEL}
            icon={FaMapMarkerAlt}
            select={counties}
          />
          <InputField name="newCity" label={NEW_CITY_LABEL} icon={FaCity} />
          {data && (data.me.city || data.me.county) ? (
            <Text my={3}>
              {CURRENT_LOCATION_LABEL +
                (data.me.county ?? "") +
                (data.me.county && data.me.city ? ", " : "") +
                (data.me.city ?? "")}
            </Text>
          ) : null}
          <RegularButton spinner={isSubmitting} mt={4}>
            {CONFIRM_CHANGE_LABEL}
          </RegularButton>
        </Form>
      )}
    </Formik>
  );
};
