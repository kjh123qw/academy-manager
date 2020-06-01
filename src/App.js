import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Amplify from "aws-amplify";

import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloLink } from "apollo-link";
import { createAuthLink } from "aws-appsync-auth-link";
import { createHttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

import aws_exports from "./aws-exports";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
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

const App = () => {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <Route exact={true} path="/" component={Home} />
        <Route path="/students" component={Students} />
        <Route path="/subjects" component={Subjects} />
        <Route path="/teachers" component={Teachers} />
        <Footer />
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
