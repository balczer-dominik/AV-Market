import { Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import {
  FaKey,
  FaLocationArrow,
  FaMailBulk,
  FaRegUserCircle,
} from "react-icons/fa";
import { Layout } from "../../components/Layout";
import { ChangeAvatarForm } from "../../components/profile/ChangeAvatarForm";
import { ChangeContactsForm } from "../../components/profile/ChangeContactsForm";
import { ChangeLocationForm } from "../../components/profile/ChangeLocationForm";
import { ChangePasswordForm } from "../../components/profile/ChangePasswordForm";
import { ProfileSection } from "../../components/profile/ProfileSection";
import { useMeQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import {
  CHANGE_AVATAR_LABEL,
  CHANGE_CONTACTS_LABEL,
  CHANGE_LOCATION_LABEL,
  CHANGE_PASSWORD_LABEL,
  EDIT_PROFILE_LABEL,
} from "../../utils/strings";
import { useIsAuth } from "../../utils/useIsAuth";

const Edit: React.FC<{}> = ({}) => {
  useIsAuth();
  const [{ data, fetching }] = useMeQuery();

  return (
    <Layout title={EDIT_PROFILE_LABEL} variant="regular">
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
            <ProfileSection title={CHANGE_CONTACTS_LABEL} icon={FaMailBulk}>
              <ChangeContactsForm />
            </ProfileSection>
            <ProfileSection title={CHANGE_AVATAR_LABEL} icon={FaRegUserCircle}>
              <ChangeAvatarForm />
            </ProfileSection>
            <ProfileSection
              title={CHANGE_LOCATION_LABEL}
              icon={FaLocationArrow}
            >
              <ChangeLocationForm />
            </ProfileSection>
          </SimpleGrid>
        </Stack>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Edit);
