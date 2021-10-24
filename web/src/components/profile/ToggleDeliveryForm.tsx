import Icon from "@chakra-ui/icon";
import { Flex, Text } from "@chakra-ui/layout";
import {
  useMeDeliversQuery,
  useToggleDeliversMutation,
} from "@generated/graphql";
import {
  DELIVER_TURN_OFF_SUCCESS as DELIVERS_TURN_OFF_SUCCESS,
  DELIVE_TURN_ON_SUCCESS as DELIVERS_TURN_ON_SUCCESS,
  SUCCESS,
  TURN_OFF_DELIVER,
  TURN_ON_DELIVER,
  USER_DELIVERS,
  USER_DOESNT_DELIVER,
} from "@resources/strings";
import { ThemeContext } from "@utils/hooks/ThemeProvider";
import { useBetterToast } from "@utils/hooks/useBetterToast";
import React, { useContext } from "react";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { RegularButton } from "../RegularButton";

export const ToggleDeliveryForm: React.FC<{}> = () => {
  const [{ data }, fetchDelivers] = useMeDeliversQuery();
  const delivers = data ? data.me.delivers : false;
  const [{ fetching: isSubmitting }, toggleDelivers] =
    useToggleDeliversMutation();
  const toast = useBetterToast();
  const {
    theme: { ACCENT_COLOR },
  } = useContext(ThemeContext);

  return (
    <>
      <Flex mt={3} justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold" color={ACCENT_COLOR}>
          {delivers ? USER_DELIVERS : USER_DOESNT_DELIVER}
        </Text>
        <Icon
          as={delivers ? IoCheckmarkCircle : IoCloseCircle}
          h={30}
          w={30}
          color={ACCENT_COLOR}
        />
      </Flex>
      <RegularButton
        mt={2}
        onClick={async () => {
          const to = !delivers;
          const success = await toggleDelivers({ to });
          toast(
            success ? "success" : "error",
            SUCCESS,
            to ? DELIVERS_TURN_ON_SUCCESS : DELIVERS_TURN_OFF_SUCCESS
          );
          fetchDelivers();
        }}
        disabled={isSubmitting}
      >
        {delivers ? TURN_OFF_DELIVER : TURN_ON_DELIVER}
      </RegularButton>
    </>
  );
};
