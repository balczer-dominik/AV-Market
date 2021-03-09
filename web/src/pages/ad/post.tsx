import {
  Box,
  Flex,
  Heading,
  Icon,
  StatHelpText,
  Tooltip,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { MdMail } from "react-icons/md";
import Stepper from "react-stepper-horizontal";
import { Layout } from "../../components/Layout";
import { CategorySelector } from "../../components/post/CategorySelector";
import { DropzoneUploader } from "../../components/post/DropzoneUploader";
import { PostDetailsForm } from "../../components/post/PostDetailsForm";
import { PostPreview } from "../../components/post/PostPreview";
import { RegularButton } from "../../components/RegularButton";
import { usePostMutation } from "../../generated/graphql";
import {
  DARKER_REGULAR_BROWN,
  LIGHTER_REGULAR_BROWN,
  REGULAR_BROWN,
} from "../../utils/colors";
import { createUrqlClient } from "../../utils/createUrqlClient";
import {
  BACK_BUTTON,
  BASIC_DETAILS_LABEL as BASIC_DETAILS_LABEL,
  CHOOSE_CATEGORY_LABEL,
  CHOOSE_SUBCATEGORY_LABEL,
  CONTINUE_BUTTON,
  FINALIZE_LABEL,
  PHOTOS_LABEL,
  POST_AD_TITLE,
  SUBMIT_BUTTON,
  UPLOAD_IMAGE_LABEL,
} from "../../utils/strings";
import { toErrorMap } from "../../utils/toErrorMap";
import { PostValidator } from "../../utils/validators";

//Stepper wrapper
const step = (
  step: number,
  label: string,
  [active, setActive]: [number, React.Dispatch<React.SetStateAction<number>>]
) => {
  return {
    title: <Box>{label}</Box>,
  };
};

const PostAd: React.FC<{}> = ({}) => {
  const activeState = useState(0);
  const [activeStep, setStep] = activeState;
  const [details, setDetails] = useState({ main: "", sub: "", wear: "" });
  const [valid, setValid] = useState(false);
  const [, post] = usePostMutation();

  const canContinue = (): Boolean => {
    switch (activeStep) {
      case 0:
        return details.sub !== "";
      case 1:
        return valid && details.wear !== "";
      default:
        return true;
    }
  };

  const steps = [
    step(0, CHOOSE_CATEGORY_LABEL, activeState),
    step(1, BASIC_DETAILS_LABEL, activeState),
    step(2, UPLOAD_IMAGE_LABEL, activeState),
    step(3, FINALIZE_LABEL, activeState),
  ];

  return (
    <Layout>
      <Heading>{POST_AD_TITLE}</Heading>
      <Stepper
        steps={steps}
        activeStep={activeStep < 4 ? activeStep : 3}
        activeColor={DARKER_REGULAR_BROWN}
        completeColor={LIGHTER_REGULAR_BROWN}
        circleFontSize={10}
      />
      <Box display={activeStep === 0 ? "block" : "none"}>
        <Box>
          <Heading my={4} size="md">
            {CHOOSE_CATEGORY_LABEL}
          </Heading>
          <CategorySelector category={details} setCategory={setDetails} />
        </Box>
        {details.main !== "" ? (
          <Box>
            <Heading my={4} size="md">
              {CHOOSE_SUBCATEGORY_LABEL}
            </Heading>
            <CategorySelector category={details} setCategory={setDetails} sub />
          </Box>
        ) : null}
      </Box>
      <Formik
        initialValues={{
          title: "",
          price: "",
          desc: "",
          images: [],
        }}
        validationSchema={PostValidator}
        onSubmit={async ({ title, price, desc, images }, { setErrors }) => {
          const errors = (
            await post({
              category: details.main,
              subCategory: details.sub,
              title: title,
              price: parseInt(price),
              desc: desc,
              wear: details.wear,
              images: images,
            })
          ).data?.post.errors;
          if (errors) {
            setErrors(toErrorMap(errors));
            return;
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, setFieldValue, values }) => {
          setValid(isValid && dirty);
          return (
            <Form>
              <PostDetailsForm
                display={activeStep === 1}
                category={details}
                setCategory={setDetails}
              />

              <Box display={activeStep === 2 ? "block" : "none"}>
                <Heading my={4} size="md">
                  {PHOTOS_LABEL}
                </Heading>
                <DropzoneUploader
                  fieldName="images"
                  setter={setFieldValue}
                  images={values.images}
                />
              </Box>

              <Box display={activeStep >= 3 ? "block" : "none"}>
                <PostPreview values={values} details={details} />
              </Box>

              <Flex mt={6} justify="space-between" align="center">
                <RegularButton
                  disabled={activeStep === 0}
                  onClick={() => {
                    setStep(activeStep - 1);
                  }}
                >
                  {BACK_BUTTON}
                </RegularButton>
                <RegularButton
                  spinner={isSubmitting}
                  disabled={!canContinue()}
                  onClick={
                    activeStep > 3 ? null : () => setStep(activeStep + 1)
                  }
                >
                  {activeStep >= 3 ? SUBMIT_BUTTON : CONTINUE_BUTTON}
                </RegularButton>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(PostAd);
