import React from "react";
import "./App.css";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import { getSubject } from "./graphql/queries";

import aws_exports from "./aws-exports";
Amplify.configure(aws_exports);

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
export default App;
