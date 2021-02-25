import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps {}

export const register: React.FC<registerProps> = ({}) => {
  return (
    <Layout>
      <div>Register</div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(register);
