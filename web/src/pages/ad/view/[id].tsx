import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../../components/Layout";
import { createUrqlClient } from "../../../utils/createUrqlClient";

interface ViewAdProps {}

const ViewAd: React.FC<ViewAdProps> = ({}) => {
  return <Layout></Layout>;
};

export default withUrqlClient(createUrqlClient)(ViewAd);
