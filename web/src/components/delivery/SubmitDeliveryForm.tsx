import { FormLabel } from "@chakra-ui/form-control";
import { InputField } from "@components/InputField";
import { RegularButton } from "@components/RegularButton";
import { useSubmitDeliveryRequestMutation } from "@generated/graphql";
import {
  DATE_CANNOT_BE_IN_PAST,
  DELIVERY_SUBMIT_SUCCESS,
  DELIVERY_TIME,
  NOTES_LABEL,
  SUBMIT_BUTTON,
} from "@resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { useBetterToast } from "@utils/hooks/useBetterToast";
import { toErrorMap } from "@utils/toErrorMap";
import { DeliveryRequestValidation } from "@utils/validators";
import { Form, Formik } from "formik";
import React, { useContext } from "react";

interface SubmitDeliveryFormProps {
  adId: number;
  sellerId: number;
  driverId: number;
}

export const SubmitDeliveryForm: React.FC<SubmitDeliveryFormProps> = ({
  adId,
  sellerId,
  driverId,
}) => {
  const [, submitDelivery] = useSubmitDeliveryRequestMutation();
  const {
    theme: { FRONT_COLOR, FRONT_COLOR_DARKER, WHITE, RED },
  } = useContext(ThemeContext);
  const toast = useBetterToast();

  return (
    <Formik
      initialValues={{
        time: new Date(),
        notes: "",
      }}
      onSubmit={async ({ time, notes }, { setErrors }) => {
        const resp = await submitDelivery({
          input: {
            adId,
            sellerId,
            driverId,
            notes,
            time: time.getTime().toString(),
            longitude: 0,
            latitude: 0,
          },
        });
        if (resp.data.submitDeliveryRequest.errors) {
          setErrors(toErrorMap(resp.data.submitDeliveryRequest.errors));
          toast("error", DATE_CANNOT_BE_IN_PAST);
        } else {
          toast("success", DELIVERY_SUBMIT_SUCCESS);
          //TODO:redirect
        }
      }}
      validationSchema={DeliveryRequestValidation}
    >
      {({ isSubmitting, setFieldValue, values: { time } }) => (
        <Form>
          <FormLabel color={FRONT_COLOR_DARKER} mt={4} htmlFor="time">
            {DELIVERY_TIME}
          </FormLabel>
          <input
            style={{
              borderColor: time < new Date() ? RED : FRONT_COLOR,
              borderWidth: "2px",
              borderRadius: "5px",
              padding: "5px",
              background: "unset",
            }}
            type="datetime-local"
            name="time"
            id="time"
            min={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setFieldValue("time", new Date(e.target.value))}
          />
          <InputField name="notes" label={NOTES_LABEL} type="textarea" />
          <RegularButton spinner={isSubmitting} mt={4} disabled={isSubmitting}>
            {SUBMIT_BUTTON}
          </RegularButton>
        </Form>
      )}
    </Formik>
  );
};
