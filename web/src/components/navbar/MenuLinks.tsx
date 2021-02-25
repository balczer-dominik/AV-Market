import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { FaCar, FaDesktop, FaTools, FaTshirt } from "react-icons/fa";
import { IoIosTennisball } from "react-icons/io";
import { MdSmartphone } from "react-icons/md";
import { MenuItem } from "./MenuItem";
import { CategoryDropDown } from "./CategoryDropDown";

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
        <MenuItem icon={FaTools} categoryName={"OTTHON"} />
        <MenuItem icon={FaDesktop} categoryName={"SZAMTECH"} />
        <MenuItem icon={MdSmartphone} categoryName={"MUSZAKI"} />
        <MenuItem icon={FaTshirt} categoryName={"RUHAZAT"} />
        <MenuItem icon={FaCar} categoryName={"JARMU"} />
        <MenuItem icon={IoIosTennisball} categoryName={"SZABADIDO"} />
        <MenuItem icon={BsFillHouseDoorFill} categoryName={"INGATLAN"} />
      </Stack>
    </Box>
  );
};
