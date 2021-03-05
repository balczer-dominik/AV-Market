import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";

interface PostAdProps {}

const PostAd: React.FC<PostAdProps> = ({}) => {
  return <Layout></Layout>;
};

export default withUrqlClient(createUrqlClient)(PostAd);
