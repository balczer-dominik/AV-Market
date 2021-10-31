import { Heading } from "@chakra-ui/react";
import {
  DeliveryEntry,
  DeliveryPerson,
} from "@components/delivery/DeliveryEntry";
import { NoDeliveries } from "@components/delivery/NoDeliveries";
import { Layout } from "@components/Layout";
import {
  Delivery,
  useApproveDeliveryByDriverMutation,
  useApproveDeliveryBySellerMutation,
  useDeclineDeliveryMutation,
  useDeliveryHistoryQuery,
  useFinalizeDeliveryMutation,
  useIncomingRequestsQuery,
  useOngoingDeliveriesQuery,
} from "@generated/graphql";
import {
  APPROVE_DELIVERY_FAILURE,
  APPROVE_DELIVERY_SUCCESS,
  DECLINE_DELIVERY_FAILURE,
  DECLINE_DELIVERY_SUCCESS,
  DELIVERY_DASHBOARD_TITLE,
  DELIVERY_HISTORY,
  INCOMING_REQUESTS,
  UPCOMING_DELIVERIES,
} from "@resources/strings";
import { useBetterToast } from "@utils/hooks/useBetterToast";
import { useMeId } from "@utils/hooks/useMeId";
import { createUrqlClient } from "@utils/urql/createUrqlClient";
import { withUrqlClient } from "next-urql";
import React from "react";

const DeliveryDashboard: React.FC = () => {
  //Data
  const [incomingRequests, fetchIncomingRequests] = useIncomingRequestsQuery();
  const [ongoingDeliveries, fetchOngoingDeliveries] =
    useOngoingDeliveriesQuery();
  const [deliveryHistory, fetchHistory] = useDeliveryHistoryQuery({
    variables: { page: 1 },
  });
  const [, approveDeliveryByDriver] = useApproveDeliveryByDriverMutation();
  const [, approveDeliveryBySeller] = useApproveDeliveryBySellerMutation();
  const [, approveDeliveryByBuyer] = useFinalizeDeliveryMutation();
  const [, declineDeliveryByUser] = useDeclineDeliveryMutation();
  const toast = useBetterToast();
  const meId = useMeId();

  const incoming = incomingRequests.data
    ? incomingRequests.data.incomingRequests.length == 0
      ? null
      : incomingRequests.data.incomingRequests
    : null;
  const ongoing = ongoingDeliveries.data
    ? ongoingDeliveries.data.ongoingDeliveries.length == 0
      ? null
      : ongoingDeliveries.data.ongoingDeliveries
    : null;
  const history = deliveryHistory.data
    ? deliveryHistory.data.deliveryHistory.length == 0
      ? null
      : deliveryHistory.data.deliveryHistory
    : null;

  const approveDelivery = async ({
    seller,
    driver,
    buyer,
    id,
  }: Partial<Delivery>) => {
    const approve =
      meId === seller.id
        ? approveDeliveryBySeller
        : meId === driver.id
        ? approveDeliveryByDriver
        : approveDeliveryByBuyer;

    const success = await approve({ id: id });

    if (success) {
      toast("success", APPROVE_DELIVERY_SUCCESS);
      fetchIncomingRequests();
      fetchOngoingDeliveries();
      if (buyer.id === meId) {
        fetchHistory();
      }
    } else {
      toast("error", APPROVE_DELIVERY_FAILURE);
    }
  };

  const declineDelivery = async ({ id, buyer }: Partial<Delivery>) => {
    console.log(id);
    const success = await declineDeliveryByUser({ id });

    if (success) {
      toast("success", DECLINE_DELIVERY_SUCCESS);
      fetchHistory();
      if (buyer.id === meId) {
        fetchOngoingDeliveries();
      } else {
        fetchIncomingRequests();
      }
    } else {
      toast("error", DECLINE_DELIVERY_FAILURE);
    }
  };

  return (
    <Layout title={DELIVERY_DASHBOARD_TITLE}>
      <Heading>{INCOMING_REQUESTS}</Heading>
      {incoming?.map((delivery) => (
        <DeliveryEntry
          type="incoming-request"
          delivery={delivery}
          onAccept={approveDelivery}
          onDecline={declineDelivery}
        />
      )) ?? <NoDeliveries fetching={incomingRequests.fetching} />}
      <Heading>{UPCOMING_DELIVERIES}</Heading>
      {ongoing?.map((delivery) => (
        <DeliveryEntry
          type="ongoing-delivery"
          delivery={delivery}
          onAccept={approveDelivery}
          onDecline={declineDelivery}
        />
      )) ?? <NoDeliveries fetching={incomingRequests.fetching} />}
      <Heading>{DELIVERY_HISTORY}</Heading>
      {history?.map((delivery) => (
        <DeliveryEntry type="delivery-history" delivery={delivery} />
      )) ?? <NoDeliveries fetching={incomingRequests.fetching} />}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(DeliveryDashboard);
