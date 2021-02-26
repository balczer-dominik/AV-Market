import { Box, Heading, Link, Text, Image } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export const Title: React.FC = () => {
  return (
    <Box py={3}>
      <Heading fontSize="25px">
        <NextLink href="/">
          <Link style={{ textDecoration: "none" }}>
            <Image src={"/av_logo_brown_long.png"} h={10} />
          </Link>
        </NextLink>
      </Heading>
    </Box>
  );
};
