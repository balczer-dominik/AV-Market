import { Flex, FormLabel, Heading, Icon, Link, Text } from "@chakra-ui/react";
import { Layout } from "@components/Layout";
import {
  useLeaveFeedbackMutation,
  useUserLeaveFeedbackQuery,
} from "@generated/graphql";
import {
  AD_NOT_FOUND,
  COMMENT_LABEL,
  FEEDBACK_AD_LABEL,
  GIVING_FEEDBACK_LABEL,
  LEAVE_FEEDBACK_LABEL,
  LEAVE_FEEDBACK_SUCCESS,
  SATISFIED_BUTTON_LABEL,
  SEND_LABEL,
  UNSATISFIED_BUTTON_LABEL,
  USER_HAS_NO_ADS,
  USER_NOT_FOUND,
  WERE_YOU_SATISFIED,
} from "@resources/strings";
import { formatAdLink, formatProfileLink } from "@utils/formatters/formatLinks";
import { useGetIdFromUrl } from "@utils/hooks/useGetIdFromUrl";
import { createUrqlClient } from "@utils/urql/createUrqlClient";
import { withUrqlClient } from "next-urql";
import React, { useContext } from "react";
import NextLink from "next/link";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { Spinner } from "@components/Spinner";
import { BiErrorCircle } from "react-icons/bi";
import { Form, Formik } from "formik";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { InputField } from "@components/InputField";
import { ImPriceTag } from "react-icons/im";
import { RegularButton } from "@components/RegularButton";
import { toErrorMap } from "@utils/toErrorMap";
import { useBetterToast } from "@utils/hooks/useBetterToast";
import { useRouter } from "next/router";

interface LeaveFeedbackProps {}

const LeaveFeedback: React.FC<LeaveFeedbackProps> = ({}) => {
  const recipientId = useGetIdFromUrl();
  const [{ data, fetching }] = useUserLeaveFeedbackQuery({
    variables: { id: recipientId },
    pause: recipientId === -1,
  });
  const [, leaveFeedback] = useLeaveFeedbackMutation();
  const {
    theme: {
      FRONT_COLOR_LIGHTER,
      FRONT_COLOR_DARKER,
      FRONT_COLOR_DARKER_ALT,
      WHITE,
      ACCENT_COLOR,
      FRONT_COLOR_LIGHTER_ALT,
    },
  } = useContext(ThemeContext);
  const toast = useBetterToast();
  const router = useRouter();

  const user = data ? data.user : null;

  return (
    <Layout title={LEAVE_FEEDBACK_LABEL}>
      {fetching ? (
        <Spinner height="400px" />
      ) : user && !user.banned ? (
        user.ads.length === 0 ? (
          <Flex flexDir="column" justify="center" align="center" height="500px">
            <Icon as={BiErrorCircle} h={50} w={50} />
            <Heading size="md">{USER_HAS_NO_ADS}</Heading>
          </Flex>
        ) : (
          <>
            <Heading size="xl" color={FRONT_COLOR_LIGHTER} mb={8}>
              <NextLink href={formatProfileLink(recipientId)} passHref>
                <Link
                  style={{ textDecoration: "none" }}
                  color={FRONT_COLOR_DARKER}
                >
                  <b>{user.username}</b>
                </Link>
              </NextLink>
              {}
              {" " + GIVING_FEEDBACK_LABEL}
            </Heading>
            <Formik
              initialValues={{
                satisfied: undefined,
                adId: user.ads[0].id,
                comment: "",
              }}
              onSubmit={async ({ adId, satisfied, comment }) => {
                const errors = (
                  await leaveFeedback({
                    options: { adId, recipientId, satisfied, comment },
                  })
                ).data.leaveFeedback.errors;

                if (errors) {
                  errors.forEach((error) => toast("error", error.message));
                  return;
                }

                toast("success", LEAVE_FEEDBACK_SUCCESS);
                router.push(formatAdLink(adId));
              }}
            >
              {({ setFieldValue, values, isSubmitting }) => (
                <Form>
                  <FormLabel color={ACCENT_COLOR}>
                    {WERE_YOU_SATISFIED}
                  </FormLabel>
                  <Flex
                    width="full"
                    p={4}
                    color={WHITE}
                    height="150px"
                    justify="space-between"
                  >
                    <Flex
                      py={6}
                      flexDir="column"
                      justify="space-between"
                      align="center"
                      height="full"
                      borderStartRadius="10px"
                      borderWidth="2px"
                      width="50%"
                      bgColor={
                        values.satisfied === true
                          ? FRONT_COLOR_DARKER_ALT
                          : FRONT_COLOR_LIGHTER_ALT
                      }
                      onClick={() => {
                        setFieldValue("satisfied", true);
                      }}
                    >
                      <Icon as={FaHeart} h={10} w={10} />
                      <Text>{SATISFIED_BUTTON_LABEL}</Text>
                    </Flex>
                    <Flex
                      py={6}
                      flexDir="column"
                      justify="space-between"
                      align="center"
                      height="full"
                      borderEndRadius="10px"
                      borderWidth="2px"
                      width="50%"
                      bgColor={
                        values.satisfied === false
                          ? FRONT_COLOR_DARKER_ALT
                          : FRONT_COLOR_LIGHTER_ALT
                      }
                      onClick={() => {
                        setFieldValue("satisfied", false);
                      }}
                    >
                      <Icon as={FaHeartBroken} h={10} w={10} />
                      <Text>{UNSATISFIED_BUTTON_LABEL}</Text>
                    </Flex>
                  </Flex>
                  <InputField
                    label={FEEDBACK_AD_LABEL}
                    name="adId"
                    icon={ImPriceTag}
                    select={user.ads.map((ad) => ad.title)}
                    values={user.ads.map((ad) => ad.id)}
                  />
                  <InputField
                    label={COMMENT_LABEL}
                    name="comment"
                    type="textarea"
                  />
                  <RegularButton
                    mt={4}
                    disabled={
                      typeof values.satisfied === "undefined" || isSubmitting
                    }
                    spinner={isSubmitting}
                  >
                    {SEND_LABEL}
                  </RegularButton>
                </Form>
              )}
            </Formik>
          </>
        )
      ) : (
        <Flex flexDir="column" justify="center" align="center" height="500px">
          <Icon as={BiErrorCircle} h={50} w={50} />
          <Heading size="md">{USER_NOT_FOUND}</Heading>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(LeaveFeedback);
