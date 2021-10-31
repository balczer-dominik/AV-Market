import {
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PriceTag } from "@components/ad/PriceTag";
import { RegularButton } from "@components/RegularButton";
import { Delivery } from "@generated/graphql";
import {
  ACCEPT_DELIVERY_REQUEST,
  DECLINE_DELIVERY_REQUEST,
  DELETE_DELIVERY,
  FINALIZE_DELIVERY,
} from "@resources/strings";
import {
  formatAdLink,
  formatAdSrc,
  formatAvatarLink as formatAvatarSrc,
  formatProfileLink,
} from "@utils/formatters/formatLinks";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { useMeId } from "@utils/hooks/useMeId";
import NextLink from "next/link";
import React, { useContext } from "react";
import { FaLocationArrow, FaUser } from "react-icons/fa";
import { ImPriceTag } from "react-icons/im";
import { IoCalendarClear } from "react-icons/io5";
import { MdClose, MdDone } from "react-icons/md";
import { RiStickyNoteFill } from "react-icons/ri";

export interface DeliveryPerson {
  id: number;
  avatar?: string;
  username: string;
  city?: string;
}

interface DeliveryEntryProps {
  type: "incoming-request" | "ongoing-delivery" | "delivery-history";
  delivery: Partial<Delivery>;
  onAccept?: (delivery: Partial<Delivery>) => Promise<void>;
  onDecline?: (delivery: Partial<Delivery>) => Promise<void>;
}

export const DeliveryEntry: React.FC<DeliveryEntryProps> = ({
  type,
  delivery,
  onAccept,
  onDecline,
}) => {
  const {
    theme: { FRONT_COLOR_ALT, WHITE },
  } = useContext(ThemeContext);
  const meId = useMeId();
  const date = new Date(delivery.time);

  return (
    <Box bg={FRONT_COLOR_ALT} color={WHITE} borderRadius="0.6rem" my={1}>
      <Flex p={3} alignItems="center">
        <Image src={formatAdSrc(delivery.ad.thumbnail)} h="85%" w="15%" />
        <VStack
          ml={2}
          alignItems="flex-start"
          justifyContent="space-between"
          pb={1}
        >
          <NextLink href={formatAdLink(delivery.ad.id)} passHref>
            <Link
              fontWeight="bold"
              fontSize={{ base: "2.3vw", md: "1.2em" }}
              style={{ textDecoration: "none" }}
              isTruncated
            >
              {delivery.ad.title}
            </Link>
          </NextLink>
          <Flex alignItems="center" style={{ gap: "0.5em" }}>
            <IoCalendarClear />
            {`${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}`}
          </Flex>
          <Flex alignItems="center" style={{ gap: "0.5em" }}>
            <ImPriceTag />
            <PriceTag price={delivery.ad.price} invertColors />
          </Flex>
          {delivery.notes ? (
            <Flex alignItems="center" style={{ gap: "0.5em" }}>
              <RiStickyNoteFill />
              {delivery.notes}
            </Flex>
          ) : null}
        </VStack>
      </Flex>
      <Divider />
      <HStack justifyContent="space-around" p={3}>
        <VStack
          w="12%"
          as={Link}
          href={formatProfileLink(delivery.seller.id)}
          style={{ textDecoration: "none" }}
          pos="relative"
        >
          <Image
            src={formatAvatarSrc(delivery.seller.avatar)}
            h="60%"
            fallback={
              <Icon
                as={FaUser}
                h={{ base: "10vw", md: "5em" }}
                w={{ base: "10vw", md: "5em" }}
              />
            }
          />
          {typeof delivery.sellerApproval === "boolean" ? (
            <>
              <Box
                pos="absolute"
                h="75%"
                w="100%"
                bgColor={FRONT_COLOR_ALT}
                opacity="70%"
                m={3}
                top="-2"
                left="0"
              />
              <Icon
                as={delivery.sellerApproval ? MdDone : MdClose}
                pos="absolute"
                top="25%"
                h={6}
                w={6}
              />
            </>
          ) : null}
          <Text fontSize={{ base: "2vw", md: "1em" }}>
            {delivery.seller.username}
          </Text>
        </VStack>
        <VStack w="22%">
          {delivery.seller.city ? (
            <Text fontSize={{ base: "2vw", md: "1em" }}>
              <Icon mr={1} as={FaLocationArrow}></Icon>
              {delivery.seller.city}
            </Text>
          ) : null}

          <Divider variant="dashed" />
        </VStack>
        <VStack
          w="12%"
          as={Link}
          href={formatProfileLink(delivery.driver.id)}
          style={{ textDecoration: "none" }}
          pos="relative"
        >
          <Image
            src={formatAvatarSrc(delivery.driver.avatar)}
            h="60%"
            fallback={
              <Icon
                as={FaUser}
                h={{ base: "10vw", md: "5em" }}
                w={{ base: "10vw", md: "5em" }}
              />
            }
          />
          {typeof delivery.driverApproval === "boolean" ? (
            <>
              <Box
                pos="absolute"
                h="75%"
                w="100%"
                bgColor={FRONT_COLOR_ALT}
                opacity="70%"
                m={3}
                top="-2"
                left="0"
              />
              <Icon
                as={delivery.driverApproval ? MdDone : MdClose}
                pos="absolute"
                top="25%"
                h={6}
                w={6}
              />
            </>
          ) : null}
          <Text fontSize={{ base: "2vw", md: "1em" }}>
            {delivery.driver.username}
          </Text>
        </VStack>
        <VStack w="22%">
          {delivery.buyer.city ? (
            <Text fontSize={{ base: "2vw", md: "1em" }}>
              <Icon mr={1} as={FaLocationArrow}></Icon>
              {delivery.buyer.city}
            </Text>
          ) : null}

          <Divider variant="dashed" />
        </VStack>
        <VStack
          w="12%"
          as={Link}
          href={formatProfileLink(delivery.buyer.id)}
          style={{ textDecoration: "none" }}
          pos="relative"
        >
          <Image
            src={formatAvatarSrc(delivery.buyer.avatar)}
            h="60%"
            fallback={
              <Icon
                as={FaUser}
                h={{ base: "10vw", md: "5em" }}
                w={{ base: "10vw", md: "5em" }}
              />
            }
          />
          {typeof delivery.buyerApproval === "boolean" ? (
            <>
              <Box
                pos="absolute"
                h="75%"
                w="100%"
                bgColor={FRONT_COLOR_ALT}
                opacity="70%"
                m={3}
                top="-2"
                left="0"
              />
              <Icon
                as={delivery.buyerApproval ? MdDone : MdClose}
                pos="absolute"
                top="25%"
                h={6}
                w={6}
              />
            </>
          ) : null}
          <Text fontSize={{ base: "2vw", md: "1em" }}>
            {delivery.buyer.username}
          </Text>
        </VStack>
      </HStack>
      {(meId === delivery.buyer.id &&
        type === "ongoing-delivery" &&
        delivery.driverApproval &&
        delivery.sellerApproval) ||
      type === "incoming-request" ? (
        <>
          <Divider />
          <HStack p={3} justifyContent="space-around">
            <RegularButton
              onClick={() => {
                onAccept(delivery);
              }}
              variant="edit"
            >
              <Text fontSize={{ base: "3vw", md: "1em" }}>
                {type === "incoming-request"
                  ? ACCEPT_DELIVERY_REQUEST
                  : FINALIZE_DELIVERY}
              </Text>
              <Icon as={MdDone} w={6} h={6} ml={2} />
            </RegularButton>
            <RegularButton
              onClick={() => {
                onDecline(delivery);
              }}
              variant="edit"
            >
              <Text fontSize={{ base: "3vw", md: "1em" }}>
                {type === "incoming-request"
                  ? DECLINE_DELIVERY_REQUEST
                  : DELETE_DELIVERY}{" "}
              </Text>
              <Icon as={MdClose} w={6} h={6} ml={2} />
            </RegularButton>
          </HStack>
        </>
      ) : null}
    </Box>
  );
};
