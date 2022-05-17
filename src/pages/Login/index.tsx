import React from "react";
import {
  Container,
  Card,
  Text,
  Input,
  Button,
  Col,
  Spacer,
} from "@nextui-org/react";

const Login: React.FC = () => {
  return (
    <Container
      display="flex"
      justify="center"
      alignItems="center"
      css={{ height: "100vh" }}
    >
      <Card css={{ mw: "400px" }} color="primary">
        <Col>
          <Text h3 size={20} color="white">
            Please sign in to use the platform
          </Text>
          <Spacer y={1} />
          <Input size="sm" rounded status="primary" placeholder="Login" />
          <Spacer y={1} />
          <Input.Password
            size="sm"
            status="primary"
            rounded
            placeholder="Password"
          />
          <Spacer y={1} />
          <Button size="sm" color="secondary" rounded>
            Sign in
          </Button>
        </Col>
      </Card>
    </Container>
  );
};

export default Login;
