import { Button, Flex, Icon, Image, Td, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaCheck, FaHammer } from "react-icons/fa";
import {
  useBanUserMutation,
  User,
  useUnbanUserMutation,
} from "../generated/graphql";
import { FRONT_COLOR_LIGHTER, WHITE } from "../utils/colors";
import { USER_BANNED, USER_UNBANNED } from "../utils/strings";
import { useBetterToast } from "../utils/useBetterToast";

interface UserAdminRowProps {
  user: {
    __typename?: "User";
  } & Pick<User, "id" | "username" | "email" | "banned">;
}

export const UserAdminRow: React.FC<UserAdminRowProps> = ({ user }) => {
  const [, banUser] = useBanUserMutation();
  const [, unbanUser] = useUnbanUserMutation();
  const { id, avatar, username, email, banned } = user;
  console.log(user);
  const [isBanned, setBanned] = useState(banned);
  const toast = useBetterToast();
  useEffect(() => {
    setBanned(banned);
  }, [user]);
  return (
    <Tr>
      <Td>{id}</Td>
      <Td>
        <Image
          mr={2}
          borderRadius={"5px"}
          border={`3px ${FRONT_COLOR_LIGHTER} solid`}
          h={10}
          w={10}
          src={`/avatar/${avatar}.png`}
          fallback={
            <Flex
              align={"center"}
              justify={"center"}
              h={10}
              w={10}
              borderRadius={"5px"}
              border={`3px ${FRONT_COLOR_LIGHTER} solid`}
            ></Flex>
          }
        />
      </Td>
      <Td>{username}</Td>
      <Td>{email}</Td>
      <Td>{isBanned ? "Banned" : ""}</Td>
      <Td textAlign="right">
        <Button
          color={WHITE}
          bgColor={isBanned ? "green.300" : "red.300"}
          _hover={{
            bgColor: isBanned ? "green.200" : "red.200",
          }}
          onClick={async () => {
            //Already banned -> Unban
            if (isBanned) {
              await unbanUser({ id });
              toast("success", username + USER_UNBANNED);
              setBanned(false);
              return;
            }
            //Not banned yet -> Ban
            await banUser({ id });
            toast("success", username + USER_BANNED);
            setBanned(true);
          }}
        >
          <Icon as={isBanned ? FaCheck : FaHammer} />
        </Button>
      </Td>
    </Tr>
  );
};
