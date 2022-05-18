import { Spacer, Text } from "@nextui-org/react";
import { Link, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Students from "./pages/Students";

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
  ];
  return (
    <Switch>
      <Route exact path="/">
        <Text h1>Here are same sample pages</Text>
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
    </Switch>
  );
}

export default App;
