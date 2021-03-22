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
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { MdMail } from "react-icons/md";
import Stepper from "react-stepper-horizontal";
import { Layout } from "../../components/Layout";
import { CategorySelector } from "../../components/post/CategorySelector";
import { DropzoneUploader } from "../../components/post/DropzoneUploader";
import { PostDetailsForm } from "../../components/post/PostDetailsForm";
import { PostPreview } from "../../components/post/PostPreview";
import { RegularButton } from "../../components/RegularButton";
import { usePostMutation } from "../../generated/graphql";
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
import { ThemeContext } from "../../utils/ThemeProvider";
import { toErrorMap } from "../../utils/toErrorMap";
import { useIsAuth } from "../../utils/useIsAuth";
import { PostValidator } from "../../utils/validators";

//Stepper wrapper
const step = (label: string) => {
  return {
    title: <Box>{label}</Box>,
  };
};

const PostAd: React.FC<{}> = ({}) => {
  useIsAuth();
  const {
    theme: { FRONT_COLOR_DARKER, FRONT_COLOR_LIGHTER },
  } = useContext(ThemeContext);
  const activeState = useState(0);
  const [activeStep, setStep] = activeState;
  const [details, setDetails] = useState({ main: "", sub: "", wear: "" });
  const [valid, setValid] = useState(false);
  const [, post] = usePostMutation();
  const router = useRouter();

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
    step(CHOOSE_CATEGORY_LABEL),
    step(BASIC_DETAILS_LABEL),
    step(UPLOAD_IMAGE_LABEL),
    step(FINALIZE_LABEL),
  ];

  return (
    <Layout title={POST_AD_TITLE}>
      <Heading>{POST_AD_TITLE}</Heading>
      <Stepper
        steps={steps}
        activeStep={activeStep < 4 ? activeStep : 3}
        activeColor={FRONT_COLOR_DARKER}
        completeColor={FRONT_COLOR_LIGHTER}
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
          const {
            errors,
            ad: { id },
          } = (
            await post({
              category: details.main,
              subCategory: details.sub,
              title: title,
              price: parseInt(price),
              desc: desc,
              wear: details.wear,
              images: images,
            })
          ).data?.post;
          if (errors) {
            setErrors(toErrorMap(errors));
            return;
          }
          router.replace(`/ad/view/${id}`);
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
