import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState } from "react";
import "./App.css";
import Routes from "./Routes/Routes";

import { GoogleOAuthProvider } from "@react-oauth/google";

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState();

  return (
    <div className="d-flex App">
      <GoogleOAuthProvider clientId="654905880674-dfd1lul50bf5u12a5cqmga32eaffktcs.apps.googleusercontent.com">
        <UserContext.Provider value={{ user, setUser }}>
          <Routes />
        </UserContext.Provider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
