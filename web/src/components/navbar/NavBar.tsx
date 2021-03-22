import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { MenuLinks } from "@components/MenuLinks";
import { MenuToggle } from "@components/MenuToggle";
import { NavBarContainer } from "@components/NavBarContainer";
import { ProfileSection } from "@components/ProfileSection";
import { Title } from "@components/Title";

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
