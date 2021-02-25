import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { FaCar, FaDesktop, FaTools, FaTshirt } from "react-icons/fa";
import { IoIosTennisball } from "react-icons/io";
import { MdSmartphone } from "react-icons/md";
import { MenuItem } from "./MenuItem";

export const MenuLinks: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
      mb={{ base: 2, md: 0 }}
    >
      <Stack
        spacing={3}
        align="left"
        justify={["flex-start", "flex-start", "flex-end", "flex-end"]}
        direction={{ base: "column", md: "row" }}
      >
        <MenuItem icon={FaTools} category={"OTTHON"} />
        <MenuItem icon={FaDesktop} category={"SZAMTECH"} />
        <MenuItem icon={MdSmartphone} category={"MUSZAKI"} />
        <MenuItem icon={FaTshirt} category={"RUHAZAT"} />
        <MenuItem icon={FaCar} category={"JARMU"} />
        <MenuItem icon={IoIosTennisball} category={"SZABADIDO"} />
        <MenuItem icon={BsFillHouseDoorFill} category={"INGATLAN"} />
      </Stack>
    </Box>
  );
};
