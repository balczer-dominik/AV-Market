import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { MenuLinks } from "./MenuLinks";
import { MenuToggle } from "./MenuToggle";
import { NavBarContainer } from "./NavBarContainer";
import { ProfileSection } from "./ProfileSection";
import { Title } from "./Title";

export const NavBar: React.FC = (props) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <NavBarContainer {...props}>
      <Title />
      <MenuToggle toggle={onToggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
      <ProfileSection isOpen={isOpen} />
    </NavBarContainer>
  );
};
