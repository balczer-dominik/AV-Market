import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import Stepper from "react-stepper-horizontal";
import { Layout } from "../../components/Layout";
import { MainCategory } from "../../components/navbar/MenuRoutes";
import { CategorySelector } from "../../components/post/CategorySelector";
import { PostDetailsForm } from "../../components/post/PostDetailsForm";
import { RegularButton } from "../../components/RegularButton";
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
  POST_AD_TITLE,
  UPLOAD_IMAGE_LABEL,
} from "../../utils/strings";
import { PostValidator } from "../../utils/validators";
interface PostAdProps {}

//Stepper wrapper
const step = (
  step: number,
  label: string,
  [active, setActive]: [number, React.Dispatch<React.SetStateAction<number>>]
) => {
  return {
    title: (
      <Link
        textDecor={"none"}
        onClick={() => {
          /* if (step <= active)*/ setActive(step);
        }}
      >
        {label}
      </Link>
    ),
  };
};

const PostAd: React.FC<PostAdProps> = ({}) => {
  const activeState = useState(0);
  const [activeStep, setStep] = activeState;
  const [category, setCategory] = useState({ main: "", sub: "", wear: "" });
  const [valid, setValid] = useState(false);

  const canContinue = (): Boolean => {
    switch (activeStep) {
      case 0:
        return category.sub !== "";
      case 1:
        return valid && category.wear !== "";
      default:
        return false;
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
        activeStep={activeStep}
        activeColor={DARKER_REGULAR_BROWN}
        completeColor={LIGHTER_REGULAR_BROWN}
        circleFontSize={10}
      />
      <Box display={activeStep === 0 ? "block" : "none"}>
        <Box>
          <Heading my={4} size="md">
            {CHOOSE_CATEGORY_LABEL}
          </Heading>
          <CategorySelector category={category} setCategory={setCategory} />
        </Box>
        {category.main !== "" ? (
          <Box>
            <Heading my={4} size="md">
              {CHOOSE_SUBCATEGORY_LABEL}
            </Heading>
            <CategorySelector
              category={category}
              setCategory={setCategory}
              sub
            />
          </Box>
        ) : null}
      </Box>
      <Formik
        initialValues={{
          title: "",
          price: "",
          desc: "",
        }}
        validationSchema={PostValidator}
        onSubmit={() => {}}
      >
        {({ isSubmitting, isValid, dirty }) => {
          setValid(isValid && dirty);
          return (
            <Form>
              <Box>
                <PostDetailsForm
                  display={activeStep === 1}
                  category={category}
                  setCategory={setCategory}
                />
              </Box>
              {/* <PostImagesForm/> */}
            </Form>
          );
        }}
      </Formik>
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
          disabled={!canContinue()}
          onClick={() => {
            setStep(activeStep + 1);
          }}
        >
          {CONTINUE_BUTTON}
        </RegularButton>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(PostAd);
