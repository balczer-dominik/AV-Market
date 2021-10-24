import { Heading } from "@chakra-ui/react";
import { AdPreview } from "@components/delivery/AdPreview";
import { DeliveryLocationSelect } from "@components/delivery/DeliveryLocationSelect";
import { NearbyDriverChoice } from "@components/delivery/NearbyDriverChoice";
import { SubmitDeliveryForm } from "@components/delivery/SubmitDeliveryForm";
import { Layout } from "@components/Layout";
import {
  useAdPreviewQuery,
  useMeLocationQuery,
  useNearbyDriversQuery,
} from "@generated/graphql";
import {
  NEARBY_DRIVERS_LABEL,
  SUBMIT_DELIVERY_TITLE,
} from "@resources/strings";
import { useGetIdFromUrl } from "@utils/hooks/useGetIdFromUrl";
import { useIsAuth } from "@utils/hooks/useIsAuth";
import { createUrqlClient } from "@utils/urql/createUrqlClient";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";

const SubmitDelivery: React.FC<{}> = ({}) => {
  useIsAuth();
  const adId: number = useGetIdFromUrl();
  const [{ data: adPreviewData }] = useAdPreviewQuery({ variables: { adId } });
  const [{ data: meData }] = useMeLocationQuery();
  const me = meData?.me ?? null;
  const adPreview = adPreviewData?.ad.ad ?? null;
  const [{ data: nearbyDriversData }] = useNearbyDriversQuery({
    variables: { sellerId: adPreview?.owner.id },
    pause: !adPreview,
  });
  const nearbyDrivers = nearbyDriversData?.nearbyDrivers ?? null;
  const [selectedDriver, setDriver] = useState(null as number);

  return (
    <Layout title={SUBMIT_DELIVERY_TITLE} variant="regular">
      <AdPreview ad={adPreview} />
      <DeliveryLocationSelect
        sellerCoords={{
          longitude: adPreview?.owner.longitude,
          latitude: adPreview?.owner.latitude,
        }}
        buyerCoords={{
          longitude: me?.longitude,
          latitude: me?.latitude,
        }}
      />
      <Heading mt={4}>{NEARBY_DRIVERS_LABEL}</Heading>
      {nearbyDrivers
        ? nearbyDrivers.map((driver) => (
            <NearbyDriverChoice
              driver={driver}
              state={{ selectedDriver, setDriver }}
            />
          ))
        : null}
      {!selectedDriver ? null : (
        <SubmitDeliveryForm
          adId={adId}
          driverId={selectedDriver}
          sellerId={adPreview.owner.id}
        />
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(SubmitDelivery);
