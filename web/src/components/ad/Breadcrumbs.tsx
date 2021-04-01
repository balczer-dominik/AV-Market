import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
  Text,
} from "@chakra-ui/react";
import { Spinner } from "@components/Spinner";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import NextLink from "next/link";
import React, { useContext } from "react";

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
          <BreadcrumbItem isCurrentPage={i === items.length - 1} maxW="100%">
            <NextLink href={href} passHref>
              <BreadcrumbLink
                as={Link}
                fontWeight="bold"
                style={{ textDecoration: "none" }}
                maxW="100%"
              >
                <Text isTruncated>{label}</Text>
              </BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        ))
      ) : (
        <Spinner height="40px" />
      )}
    </Breadcrumb>
  );
};
