import { withUrqlClient } from "next-urql";
import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import { Layout } from "../components/Layout";
import { NavBar } from "../components/navbar/NavBar";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => (
  <Layout>
    <div>Hello World</div>
  </Layout>
);

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
