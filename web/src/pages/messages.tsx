import { Layout } from "@components/Layout";
import { Messages } from "@components/messages/Messages";
import { createUrqlClient } from "@utils/urql/createUrqlClient";
import { withUrqlClient } from "next-urql";
import React from "react";

const messages: React.FC<{}> = () => {
  return (
    <Layout title="Üzenetek" variant="full">
      <Messages></Messages>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(messages);
