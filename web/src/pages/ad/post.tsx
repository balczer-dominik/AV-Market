import { Box, Button, Divider, Flex, Heading, Link } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
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
import Stepper from "react-stepper-horizontal";
import { LIGHTER_REGULAR_BROWN, REGULAR_BROWN } from "../../utils/colors";
import { Categories, MainCategory } from "../../components/navbar/MenuRoutes";
import { CategoryTile } from "../../components/post/CategoryTile";
import { FaGhost } from "react-icons/fa";
import { CategorySelector } from "../../components/post/CategorySelector";
import { Form, Formik } from "formik";
import { RegularButton } from "../../components/RegularButton";
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
  const [selectedMain, selectMain] = useState("");
  const [selectedSub, selectSub] = useState("");

  const continueDisabled = (): boolean => {
    switch (activeStep) {
      case 0:
        return selectedSub === "";
      default:
        return true;
    }
  };

  useEffect(() => selectSub(""), [selectedMain]);

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
        activeColor={REGULAR_BROWN}
        completeColor={LIGHTER_REGULAR_BROWN}
        circleFontSize={10}
      />
      <Box display={activeStep === 0 ? "block" : "none"}>
        <Box>
          <Heading my={4} size="md">
            {CHOOSE_CATEGORY_LABEL}
          </Heading>
          <CategorySelector selected={selectedMain} select={selectMain} />
        </Box>
        {selectedMain !== "" ? (
          <Box>
            <Heading my={4} size="md">
              {CHOOSE_SUBCATEGORY_LABEL}
            </Heading>
            <CategorySelector
              selected={selectedSub}
              select={selectSub}
              main={selectedMain as MainCategory}
            />
          </Box>
        ) : null}
      </Box>
      {/* <Formik
          initialValues={{
            title: "",
            price: "",
            condition: "",
          }}
          validationSchema={}
          onSubmit={}
        >
          {({ isSubmitting }) => (
            <Form>
              
            </Form>
          )}
        </Formik> */}
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
          disabled={continueDisabled()}
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
