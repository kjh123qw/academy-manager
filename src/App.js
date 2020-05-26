import React from "react";
import "./App.css";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import { getAcademyDb } from "./graphql/queries";

import aws_exports from "./aws-exports";
Amplify.configure(aws_exports);

function App() {
  return (
    <Connect query={graphqlOperation(getAcademyDb, { Id: "3" })}>
      {({ data, loading }) => {
        if (loading) {
          return <div>Loading...</div>;
        }

        console.log(data);
        return <div>Hello!! {data.getAcademyDB.Subject}</div>;
      }}
    </Connect>
  );
}
export default App;
