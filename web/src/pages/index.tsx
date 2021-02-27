import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => (
  <Layout variant="regular">
    <div>Hello World</div>
  </Layout>
);

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
