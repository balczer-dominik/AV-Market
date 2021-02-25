import { Box, SlideFade, Stack } from "@chakra-ui/react";
import React from "react";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { FaCar, FaDesktop, FaTools, FaTshirt } from "react-icons/fa";
import { IoIosTennisball } from "react-icons/io";
import { MdSmartphone } from "react-icons/md";
import { MenuItem } from "./MenuItem";
import { Categories } from "./MenuRoutes";

export const MenuLinks: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
      mb={{ base: 2, md: 0 }}
    >
      <Stack
        spacing={{ base: 0, md: 4 }}
        align="left"
        justify={["flex-start", "flex-start", "flex-end", "flex-end"]}
        direction={{ base: "column", md: "row" }}
        // height={{ base: isOpen ? "auto" : "0px", md: "auto" }}
        // opacity={{ base: isOpen ? null : "0", md: null }}
        // transition={{ base: "all 0.1s linear", md: "none" }}
      >
        <MenuItem category={"OTTHON"} />
        <MenuItem category={"SZAMTECH"} />
        <MenuItem category={"MUSZAKI"} />
        <MenuItem category={"RUHAZAT"} />
        <MenuItem category={"JARMU"} />
        <MenuItem category={"SZABADIDO"} />
        <MenuItem category={"INGATLAN"} />
      </Stack>
    </Box>
  );
};
