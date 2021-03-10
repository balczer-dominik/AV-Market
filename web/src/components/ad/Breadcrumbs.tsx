import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { REGULAR_BROWN } from "../../utils/colors";
import { HOME_PAGE } from "../../utils/strings";
import NextLink from "next/link";

type BreadItem = {
  label: string;
  href: string;
};

interface BreadcrumbsProps {
  items: BreadItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <Breadcrumb separator={<ChevronRightIcon color={REGULAR_BROWN} />}>
      {items ? (
        items.map(({ href, label }, i) => (
          <BreadcrumbItem isCurrentPage={i === items.length - 1}>
            <NextLink href={href}>
              <BreadcrumbLink as={Link} style={{ textDecoration: "none" }}>
                {label}
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
