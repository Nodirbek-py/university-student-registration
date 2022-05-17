import { Spacer, Text } from "@nextui-org/react";
import { Link, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Students from "./pages/Students";
import Registration from "./pages/Registration";

function App() {
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
    {
      name: "Registrations page for teachers",
      path: "/registration",
    },
  ];
  return (
    <Switch>
      <Route exact path="/">
        <Text color="white" h1>
          Here are same sample pages
        </Text>
        <Spacer y={1} />
        {pages.map((page, index) => {
          return (
            <div>
              <Link to={page.path} key={index}>
                {page.name}
              </Link>
            </div>
          );
        })}
      </Route>
      <Route exact path="/login" component={Login} />
      <Route exact path="/students/:type" component={Students} />
      <Route exact path="/registration" component={Registration} />
    </Switch>
  );
}

export default App;
