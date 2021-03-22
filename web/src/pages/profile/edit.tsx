import { Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import {
  FaKey,
  FaLocationArrow,
  FaMailBulk,
  FaRegUserCircle,
} from "react-icons/fa";
import { Layout } from "@components/Layout";
import { ChangeAvatarForm } from "@components/ChangeAvatarForm";
import { ChangeContactsForm } from "@components/ChangeContactsForm";
import { ChangeLocationForm } from "@components/ChangeLocationForm";
import { ChangePasswordForm } from "@components/ChangePasswordForm";
import { ProfileEditSection } from "@components/ProfileEditSection";
import { useMeQuery } from "@generated/graphql";
import { createUrqlClient } from "@utils/createUrqlClient";
import {
  CHANGE_AVATAR_LABEL,
  CHANGE_CONTACTS_LABEL,
  CHANGE_LOCATION_LABEL,
  CHANGE_PASSWORD_LABEL,
  EDIT_PROFILE_LABEL,
} from "@utils/strings";
import { useIsAuth } from "@utils/useIsAuth";

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
            <ProfileEditSection title={CHANGE_PASSWORD_LABEL} icon={FaKey}>
              <ChangePasswordForm />
            </ProfileEditSection>
            <ProfileEditSection title={CHANGE_CONTACTS_LABEL} icon={FaMailBulk}>
              <ChangeContactsForm />
            </ProfileEditSection>
            <ProfileEditSection
              title={CHANGE_AVATAR_LABEL}
              icon={FaRegUserCircle}
            >
              <ChangeAvatarForm />
            </ProfileEditSection>
            <ProfileEditSection
              title={CHANGE_LOCATION_LABEL}
              icon={FaLocationArrow}
            >
              <ChangeLocationForm />
            </ProfileEditSection>
          </SimpleGrid>
        </Stack>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Edit);
