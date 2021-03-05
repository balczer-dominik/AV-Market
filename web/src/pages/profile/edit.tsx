import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import {
  FaKey,
  FaLocationArrow,
  FaMailBulk,
  FaRegUserCircle,
} from "react-icons/fa";
import { Layout } from "../../components/Layout";
import { ChangeAvatarForm } from "../../components/profile/ChangeAvatarForm";
import { ChangeEmailForm } from "../../components/profile/ChangeEmailForm";
import { ChangeLocationForm } from "../../components/profile/ChangeLocationForm";
import { ChangePasswordForm } from "../../components/profile/ChangePasswordForm";
import { ProfileSection } from "../../components/profile/ProfileSection";
import { useMeQuery } from "../../generated/graphql";
import { REGULAR_BROWN } from "../../utils/colors";
import { createUrqlClient } from "../../utils/createUrqlClient";
import {
  CHANGE_AVATAR_LABEL,
  CHANGE_EMAIL_LABEL,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_LOCATION_LABEL,
  CHANGE_PASSWORD_LABEL,
  EDIT_PROFILE_LABEL,
} from "../../utils/strings";
import { useIsAuth } from "../../utils/useIsAuth";

const Edit: React.FC<{}> = ({}) => {
  useIsAuth();
  const [{ data, fetching }] = useMeQuery();

  return (
    <Layout variant="regular">
      {!fetching && data.me ? (
        <Stack spacing={4} px={2}>
          <Heading
            fontSize={"4xl"}
            textAlign="center"
            verticalAlign="center"
            mb={5}
          >
            {EDIT_PROFILE_LABEL}
          </Heading>
          <SimpleGrid spacing="40px" minChildWidth="300px">
            <ProfileSection title={CHANGE_PASSWORD_LABEL} icon={FaKey}>
              <ChangePasswordForm />
            </ProfileSection>
            <ProfileSection
              title={CHANGE_LOCATION_LABEL}
              icon={FaLocationArrow}
            >
              <ChangeLocationForm />
            </ProfileSection>
            <ProfileSection title={CHANGE_AVATAR_LABEL} icon={FaRegUserCircle}>
              <ChangeAvatarForm />
            </ProfileSection>
            <ProfileSection title={CHANGE_EMAIL_LABEL} icon={FaMailBulk}>
              <ChangeEmailForm />
            </ProfileSection>
          </SimpleGrid>
        </Stack>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Edit);
