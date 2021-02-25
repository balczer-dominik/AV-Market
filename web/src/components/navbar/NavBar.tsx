import React, { useState } from "react";
import { MenuLinks } from "./MenuLinks";
import { MenuToggle } from "./MenuToggle";
import { NavBarContainer } from "./NavBarContainer";
import { ProfileLinks } from "./ProfileLinks";
import { Title } from "./Title";

export const NavBar: React.FC = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Title />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
      <ProfileLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};
