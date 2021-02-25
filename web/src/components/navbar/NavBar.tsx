import { Box, Flex, SlideFade, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { MenuLinks } from "./MenuLinks";
import { MenuToggle } from "./MenuToggle";
import { NavBarContainer } from "./NavBarContainer";
import { ProfileLinks } from "./ProfileLinks";
import { Title } from "./Title";

export const NavBar: React.FC = (props) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <NavBarContainer {...props}>
      <Title />
      <MenuToggle toggle={onToggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
      <ProfileLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};
