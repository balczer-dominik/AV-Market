import { Flex, Heading } from "@chakra-ui/react";
import { Breadcrumbs } from "@components/ad/Breadcrumbs";
import { InputField } from "@components/InputField";
import { Layout } from "@components/Layout";
import {
  Categories,
  MainCategories,
  MainCategory,
} from "@components/navbar/MenuRoutes";
import { WearTile } from "@components/post/WearTile";
import { RegularButton } from "@components/RegularButton";
import { Spinner } from "@components/Spinner";
import {
  BASIC_DETAILS_LABEL,
  CHOOSE_CATEGORY_LABEL,
  CHOOSE_SUBCATEGORY_LABEL,
  DESC_LABEL,
  EDIT_AD_SUCCESS,
  EDIT_LABEL,
  ERROR_GENERIC,
  ERROR_NOT_AUTHORIZED,
  HOME_PAGE,
  PRICE_LABEL,
  SEARCH_AD_PAGE_TITLE,
  SUBMIT_BUTTON,
  TITLE_LABEL,
  WearValues,
} from "@resources/strings";
import {
  formatBrowseCategory,
  formatBrowseSubCategory,
} from "@utils/formatters/formatLinks";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { useBetterToast } from "@utils/hooks/useBetterToast";
import { useGetAdFromUrl } from "@utils/hooks/useGetAdFromUrl";
import { useMeId } from "@utils/hooks/useMeId";
import { createUrqlClient } from "@utils/urql/createUrqlClient";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { BiText } from "react-icons/bi";
import { FaMoneyBillWave } from "react-icons/fa";
import { useEditAdMutation } from "@generated/graphql";
import { toErrorMap } from "@utils/toErrorMap";
import { EditAdImages } from "@components/edit-ad/EditAdImages";

const EditAd: React.FC<{}> = () => {
  const {
    theme: { FRONT_COLOR_LIGHTEST },
  } = useContext(ThemeContext);
  const { ad } = useGetAdFromUrl();
  const meId = useMeId();
  const [state, setState] = useState({ show: false, wear: "" });
  const toast = useBetterToast();
  const router = useRouter();
  useEffect(() => {
    if (ad) {
      if (ad.owner.id !== meId) {
        toast("error", ERROR_GENERIC, ERROR_NOT_AUTHORIZED);
        router.push("/");
      } else {
        setState({ show: true, wear: ad.wear });
      }
    }
  }, [ad]);
  const [, editAd] = useEditAdMutation();

  const breadItems = () =>
    state.show
      ? [
          {
            href: "/",
            label: HOME_PAGE,
          },
          {
            href: "/ad/search",
            label: SEARCH_AD_PAGE_TITLE,
          },
          {
            href: formatBrowseCategory(ad.category as MainCategory),
            label: Categories[ad.category].title,
          },
          {
            href: formatBrowseSubCategory(
              ad.category as MainCategory,
              ad.subCategory
            ),
            label: ad.subCategory,
          },
          {
            href: `/ad/view/${ad.id}`,
            label: ad.title,
          },
          {
            href: `/ad/edit/${ad.id}`,
            label: EDIT_LABEL,
          },
        ]
      : null;

  return (
    <Layout title="Edit">
      <Breadcrumbs items={breadItems()} />
      <br />
      {ad ? (
        <Formik
          initialValues={{
            title: ad.title,
            price: ad.price,
            desc: ad.desc,
            category: ad.category,
            subCategory: ad.subCategory,
          }}
          onSubmit={async (values, { setErrors }) => {
            const subCategory = Categories[values.category].subcategories.find(
              (sc) => sc.title === values.subCategory
            )
              ? values.subCategory
              : Categories[values.category].subcategories[0].title;

            const errorMap = toErrorMap(
              (
                await editAd({
                  adId: ad.id,
                  options: {
                    category: values.category,
                    subCategory: subCategory,
                    title: values.title,
                    price: parseInt(values.price.toString()),
                    desc: values.desc,
                    wear: state.wear,
                  },
                })
              ).data?.editAd.errors
            );

            if (errorMap) {
              if (errorMap["ad"]) {
                toast("error", ERROR_GENERIC, ERROR_NOT_AUTHORIZED);
                router.push("/");
                return;
              }
              setErrors(errorMap);
              return;
            }

            toast("success", EDIT_AD_SUCCESS);
            router.push(`/ad/view/${ad.id}`);
          }}
        >
          {({ values: { category } }) => {
            return (
              <Form>
                <Heading
                  size="lg"
                  my={2}
                  mt={4}
                  pb={2}
                  w="full"
                  borderBottom={`2px solid ${FRONT_COLOR_LIGHTEST}`}
                >
                  {BASIC_DETAILS_LABEL}
                </Heading>
                <InputField name="title" label={TITLE_LABEL} icon={BiText} />
                <InputField
                  name="category"
                  label={CHOOSE_CATEGORY_LABEL}
                  select={MainCategories.map((mc) => Categories[mc].title)}
                  values={MainCategories}
                />
                <InputField
                  name="subCategory"
                  label={CHOOSE_SUBCATEGORY_LABEL}
                  select={Categories[category].subcategories.map(
                    (sc) => sc.title
                  )}
                  values={Categories[category].subcategories.map(
                    (sc) => sc.key
                  )}
                />

                <InputField
                  name="price"
                  label={PRICE_LABEL}
                  icon={FaMoneyBillWave}
                  type="number"
                />
                <InputField name="desc" label={DESC_LABEL} type="textarea" />
                <Flex
                  w="100%"
                  justify="space-between"
                  borderRadius="10px"
                  h={24}
                  my={6}
                >
                  {WearValues.map((w, i) => (
                    <WearTile
                      leftmost={i === 0}
                      rightmost={i === WearValues.length - 1}
                      name={w}
                      disabled={state.wear !== w}
                      select={() => setState({ ...state, wear: w })}
                    />
                  ))}
                </Flex>
                <RegularButton>{SUBMIT_BUTTON}</RegularButton>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <Spinner height="500px" />
      )}
      <br />
      {ad ? <EditAdImages adId={ad.id} images={ad.images} /> : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditAd);
