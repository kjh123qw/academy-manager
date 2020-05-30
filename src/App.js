import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Amplify from "aws-amplify";

import { ApolloProvider, useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { ApolloLink } from "apollo-link";
import { createAuthLink } from "aws-appsync-auth-link";
import { createHttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

import {
  listTeachers,
  listSubjects,
  getSubject,
  getStudent,
  getTeacher,
} from "./graphql/queries";
import aws_exports from "./aws-exports";

import Header from "./components/Header";
import Students from "./components/Students";
import Subjects from "./components/Subjects";
import Teachers from "./components/Teachers";
import "./App.css";

Amplify.configure(aws_exports);

const url = aws_exports.aws_appsync_graphqlEndpoint;
const region = aws_exports.aws_appsync_region;
const auth = {
  type: aws_exports.aws_appsync_authenticationType,
  apiKey: aws_exports.aws_appsync_apiKey,
};
const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createHttpLink({ uri: url }),
]);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const Home = () => {
  return (
    <div className="home-wrap">
      <div className="item-student">
        <div className="studnet-type">STUDENT</div>
        <div className="studnet-name">KIM JEONGHO</div>
        <div className="student-class">HTML5</div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <Route exact={true} path="/" component={Home} />
        <Route path="/students" component={Students} />
        <Route path="/subjects" component={Subjects} />
        <Route path="/teachers" component={Teachers} />
      </div>
    </Router>
  );
};

const WithProvider = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default WithProvider;
