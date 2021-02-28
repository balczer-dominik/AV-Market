import { Button, Icon, Td, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaCheck, FaHammer } from "react-icons/fa";
import { User } from "../generated/graphql";
import {
  useBanUserMutation,
  useGetUsersQuery,
  useUnbanUserMutation,
} from "../generated/graphql";

interface UserAdminRowProps {
  user: {
    __typename?: "User";
  } & Pick<User, "id" | "username" | "email" | "banned">;
}

export const UserAdminRow: React.FC<UserAdminRowProps> = ({ user }) => {
  const [, banUser] = useBanUserMutation();
  const [, unbanUser] = useUnbanUserMutation();
  const { id, username, email, banned } = user;
  const [isBanned, setBanned] = useState(banned);
  return (
    <Tr>
      <Td>{id}</Td>
      <Td>{username}</Td>
      <Td>{email}</Td>
      <Td>{isBanned ? "Banned" : ""}</Td>
      <Td textAlign="right">
        <Button
          color={"white"}
          bgColor={isBanned ? "green.300" : "red.300"}
          _hover={{
            bgColor: isBanned ? "green.200" : "red.200",
          }}
          onClick={async () => {
            console.log(isBanned);
            if (isBanned) {
              await unbanUser({ id });
              setBanned(false);
              return;
            }
            await banUser({ id });
            setBanned(true);
          }}
        >
          <Icon as={isBanned ? FaCheck : FaHammer} />
        </Button>
      </Td>
    </Tr>
  );
};
