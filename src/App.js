import React from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloLink } from "apollo-link";
import { createAuthLink } from "aws-appsync-auth-link";
import { createHttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

import { getSubject } from "./graphql/queries";
import aws_exports from "./aws-exports";

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

function App() {
  return (
    <Connect query={graphqlOperation(getSubject, { id: "1" })}>
      {({ data, loading }) => {
        if (loading) {
          return <div>Loading...</div>;
        }

        console.log(data);
        return (
          <div>
            <h1>Test Subject Information</h1>
            <div>id: {data.getSubject.id}</div>
            <div>subject: {data.getSubject.subject}</div>
            <div>teacher id: {data.getSubject.TeacherInfo.id}</div>
            <div>teacher name: {data.getSubject.TeacherInfo.id}</div>
            <div>age: {data.getSubject.TeacherInfo.age}</div>
          </div>
        );
      }}
    </Connect>
  );
}

const WithProvider = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default WithProvider;
