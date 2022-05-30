import React from "react";
import { Avatar, Button, Row, Spacer, Text } from "@nextui-org/react";
import { useHistory } from "react-router-dom";

import { logOut } from "../../core/nhost";

interface IUserData {
  displayName: string;
  role: string;
  avatarUrl: string;
}

const Navbar = (props: IUserData) => {
  const history = useHistory();
  const handleLogout = () => {
    logOut().then(() => {
      history.go("/");
    });
  };

  return (
    <Row
      css={{
        display: "flex",
        background: "$blue600",
        justifyContent: "space-between",
        height: 100,
        width: "100%",
        position: "fixed",
        padding: "0 10px",
        top: 0,
        left: 0,
      }}
    >
      <Row
        css={{
          alignItems: "center",
        }}
      >
        <Avatar squared src={props.avatarUrl} />
        <Spacer x={1} />
        <div>
          <Text color="white" h1>
            Hello {props.displayName}
          </Text>
          <Text color="success" h6>
            {props.role}
          </Text>
        </div>
      </Row>
      <Row
        css={{
          alignItems: "center",
          height: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={handleLogout} size="sm" shadow rounded color="error">
          Log out
        </Button>
      </Row>
    </Row>
  );
};

export default Navbar;
