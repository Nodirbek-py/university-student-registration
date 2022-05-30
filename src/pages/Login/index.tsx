import React, { useState } from "react";
import {
  Container,
  Card,
  Text,
  Input,
  Button,
  Col,
  Spacer,
} from "@nextui-org/react";
import { signIn } from "../../core/nhost";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const [error, setError] = useState("");
  const handleLogin = () => {
    signIn(form.email, form.password).then((res) => {
      if (res?.error) {
        setError(res?.error?.message);
      } else {
        history.go("/");
      }
    });
  };
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
          <Input
            aria-label="Login"
            size="sm"
            rounded
            status="primary"
            placeholder="Login"
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
          />
          <Spacer y={1} />
          <Input.Password
            aria-label="Password"
            size="sm"
            status="primary"
            rounded
            placeholder="Password"
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
          />
          <Spacer y={1} />
          <Button onPress={handleLogin} size="sm" color="secondary" rounded>
            Sign in
          </Button>
          <Spacer y={1} />
          <Text h6 color="warning">
            {error}
          </Text>
        </Col>
      </Card>
    </Container>
  );
};

export default Login;
