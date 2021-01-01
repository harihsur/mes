import React from "react";
import Amplify from "aws-amplify";
import {AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, AmplifySignOut, AmplifyGreetings} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const App = () => {

  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
      return onAuthUIStateChange((nextAuthState, authData) => {
          setAuthState(nextAuthState);
          setUser(authData)
      });
  }, []);

  return authState === AuthState.SignedIn && user ? (
      <div className="App" style={{background: 'red', color: 'blue'}}>
        <AmplifyGreetings username={user.username}></AmplifyGreetings>
      </div>
    ) : (
    <AmplifyAuthenticator usernameAlias="email">
      <AmplifySignUp headerText = "MES Group Workforce Manager - Sign Up"
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: "email",
            label: "User",
            placeholder: "email",
            required: true
          },
          {
            type: "password",
            label: "Password",
            placeholder: "password",
            required: true
          },
          {
            type: "text",
            label: "Type",
            placeholder: "admin / worker",
            required: true
          },
        ]} 
      />
      <AmplifySignIn  headerText="MES Group Workforce Manager - Login" slot="sign-in" usernameAlias="email"/>
    </AmplifyAuthenticator>
  );
};

export default App;