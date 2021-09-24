import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { useMePreviewQuery } from "@generated/graphql";
import { FINALIZE_LABEL } from "src/resources/strings";
import { AdListing } from "@components/AdListing";

interface PostPreviewProps {
  values: {
    title: string;
    price: string;
    desc: string;
    images: any[];
  };
  details: {
    main: string;
    sub: string;
    wear: string;
  };
}

export const PostPreview: React.FC<PostPreviewProps> = ({
  values: { title, price, images },
  details: { wear },
}) => {
  const [{ data, fetching }] = useMePreviewQuery();
  return (
    <Box>
      <Heading my={4} size="md">
        {FINALIZE_LABEL}
      </Heading>

      {!fetching && data?.me ? (
        <AdListing
          ad={{
            owner: data.me,
            id: 0,
            title: title,
            price: parseInt(price),
            createdAt: "2012.12.21.",
            updatedAt: "2012.12.21",
            wear: wear,
          }}
          thumbPreview={images[0]}
        />
      ) : null}
    </Box>
  );
};
