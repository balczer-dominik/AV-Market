import { Box, Icon, Stack } from "@chakra-ui/react";
import React from "react";
import { MenuItem } from "./MenuItem";
import {
  FaTools,
  FaDesktop,
  FaTshirt,
  FaCar,
  FaBasketballBall,
} from "react-icons/fa";
import { MdSmartphone } from "react-icons/md";
import { IoIosTennisball } from "react-icons/io";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { Subcategory } from "./Subcategory";

export const MenuLinks: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={3}
        align="left"
        justify={["flex-start", "flex-start", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
      >
        <MenuItem icon={FaTools} alt="Otthon, Bútor">
          <Subcategory to="/"></Subcategory>
        </MenuItem>
        <MenuItem icon={FaDesktop} alt="Számitástechnika"></MenuItem>
        <MenuItem icon={MdSmartphone} alt="Műszaki cikk"></MenuItem>
        <MenuItem icon={FaTshirt} alt="Ruházat"></MenuItem>
        <MenuItem icon={FaCar} alt="Jármű"></MenuItem>
        <MenuItem icon={IoIosTennisball} alt="Szabadidő"></MenuItem>
        <MenuItem icon={BsFillHouseDoorFill} alt="Ingatlan"></MenuItem>
      </Stack>
    </Box>
  );
};
