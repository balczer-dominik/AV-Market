import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useContext } from "react";
import { ThemeContext } from "../../utils/ThemeProvider";

type BreadItem = {
  label: string;
  href: string;
};

interface BreadcrumbsProps {
  items: BreadItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const {
    theme: { FRONT_COLOR },
  } = useContext(ThemeContext);
  return (
    <Breadcrumb separator={<ChevronRightIcon color={FRONT_COLOR} />}>
      {items ? (
        items.map(({ href, label }, i) => (
          <BreadcrumbItem isCurrentPage={i === items.length - 1}>
            <NextLink href={href}>
              <BreadcrumbLink
                as={Link}
                fontWeight="bold"
                style={{ textDecoration: "none" }}
              >
                <Text isTruncated>{label}</Text>
              </BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        ))
      ) : (
        <BreadcrumbItem>
          <NextLink href={"/"}>
            <BreadcrumbLink as={Link}>nincs item</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
};
