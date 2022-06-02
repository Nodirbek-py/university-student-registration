import { Spacer, Text } from "@nextui-org/react";
import { Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Students from "./pages/Students";
import {
  checkSign,
  client,
  getAccessToken,
  getStudents,
  getTypeOfUser,
  signIn,
} from "./core/nhost";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState<any>();
  const history = useHistory();
  const pages = [
    {
      name: "Login Page",
      path: "/login",
    },
    {
      name: "Students List for teacher",
      path: "/students/teacher",
    },
    {
      name: "Students List for accountant",
      path: "/students/accountant",
    },
  ];
  useEffect(() => {
    checkSign().then((res) => {
      if (res) {
        setSignedIn(true);
        getTypeOfUser().then((res) => {
          if (res) {
            setUser(res);
          }
          if (res?.defaultRole === "teacher") {
            history.push("/students/teacher");
          } else {
            history.push("/students/accountant");
          }
        });
      } else {
        setSignedIn(false);
        history.push("/login");
      }
    });
  }, [signedIn]);
  return (
    <Switch>
      <Route exact path="/"></Route>
      <Route exact path="/login" component={Login} />
      <Route
        exact
        path="/students/:type"
        render={() => <Students user={user} />}
      />
    </Switch>
  );
}

export default App;
