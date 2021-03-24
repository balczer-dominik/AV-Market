import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Text,
} from "@chakra-ui/react";
import { AdListing } from "@components/AdListing";
import { Layout } from "@components/Layout";
import { useUserAdsQuery } from "@generated/graphql";
import { createUrqlClient } from "@utils/createUrqlClient";
import { formatProfileLink } from "@utils/formatLinks";
import { isServer } from "@utils/isServer";
import { LOADING_TITLE, USERS_ADS_LABEL } from "@utils/strings";
import { ThemeContext } from "@utils/ThemeProvider";
import { useGetIdFromUrl } from "@utils/useGetIdFromUrl";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useContext, useState } from "react";

const UserAds: React.FC<{}> = () => {
  const {
    theme: {
      FRONT_COLOR_DARKER,
      FRONT_COLOR_LIGHTER,
      FRONT_COLOR_LIGHTEST,
      WHITE,
    },
  } = useContext(ThemeContext);
  const [page, setPage] = useState(0);
  const intId = useGetIdFromUrl();
  const [{ data }] = useUserAdsQuery({
    variables: { userId: intId, limit: 10, offset: 10 * page },
    pause: isServer() || intId === -1,
  });

  return (
    <Layout
      title={
        data && data.userAds.owner
          ? `${data.userAds.owner.username} ${USERS_ADS_LABEL}`
          : LOADING_TITLE
      }
      variant="regular"
    >
      {data ? (
        <Box>
          <HStack>
            <NextLink href={formatProfileLink(intId)} passHref>
              <Link style={{ textDecoration: "none" }}>
                <Heading size="xl" color={FRONT_COLOR_DARKER}>
                  {data.userAds.owner.username}
                </Heading>
              </Link>
            </NextLink>
            <Heading size="xl" color={FRONT_COLOR_LIGHTER}>
              {USERS_ADS_LABEL}
            </Heading>
          </HStack>
          {data.userAds.ads.map((ad) => (
            <Box my={2}>
              <AdListing ad={ad} />
            </Box>
          ))}

          <Flex justify="space-between" my={10} align="center">
            <Flex w={"40%"} justify="flex-start">
              <Button
                color={WHITE}
                bgColor={FRONT_COLOR_LIGHTER}
                _hover={{ bgColor: FRONT_COLOR_LIGHTEST }}
                display={page !== 0 ? "block" : "none"}
                onClick={() => setPage(page - 1)}
              >
                Previous page
              </Button>
            </Flex>
            <Box w={"20%"} textAlign="center">
              <Text>Page {page + 1}</Text>
            </Box>

            <Flex w={"40%"} justify="flex-end">
              <Button
                bgColor={FRONT_COLOR_LIGHTER}
                _hover={{ bgColor: FRONT_COLOR_LIGHTEST }}
                color={WHITE}
                display={data?.userAds.hasMore ? "block" : "none"}
                onClick={() => setPage(page + 1)}
              >
                Next page
              </Button>
            </Flex>
          </Flex>
        </Box>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(UserAds);
