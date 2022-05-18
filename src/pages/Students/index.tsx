import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Spacer,
  Table,
  Button,
  Text,
  Radio,
  Row,
} from "@nextui-org/react";

import Popup from "./modal";
interface IParams {
  type: string;
}

const Students: React.FC = () => {
  const params: IParams = useParams();
  const [open, setOpen] = useState(false);

  const headers = [
    "Full name",
    "Unique ID",
    "Branch",
    "Year",
    "Payment Status",
    "Registration Status",
    "Register",
  ];

  const students = [
    {
      name: "Nodirbek Vositov",
      id: "01921102N002",
      branch: "B.Tech",
      year: 3,
      payment: true,
      registration: true,
      register: "",
    },
    {
      name: "Akbarshox Ravshanbekov",
      id: "01921102N003",
      branch: "B.Tech",
      year: 2,
      payment: false,
      registration: false,
      register: "",
    },
    {
      name: "Polonchi Pistonchiyev",
      id: "01921102N202",
      branch: "B.Tech",
      year: 1,
      payment: true,
      registration: false,
      register: "",
    },
  ];

  return (
    <Container>
      <Spacer y={1} />
      <Row>
        <div>
          <Text h3>Choose Year</Text>
          <Radio.Group size="xs" value="A">
            <Radio value="1">1st year</Radio>
            <Radio value="2">2nd year</Radio>
            <Radio value="3">3rd year</Radio>
            <Radio value="4" disabled>
              4th year
            </Radio>
          </Radio.Group>
        </div>
        <Spacer x={2} />
        <div>
          <Text h3>Choose Branch</Text>
          <Radio.Group size="xs" value="btech">
            <Radio value="btech">B.Tech</Radio>
            <Radio value="bba">B.BA</Radio>
            <Radio value="bae">B.AE</Radio>
          </Radio.Group>
        </div>
        <Spacer x={2} />
        <div>
          <Text h3>Choose Registration status</Text>
          <Radio.Group size="xs" value="false">
            <Radio value="false">Not Registered</Radio>
            <Radio value="true">Registered</Radio>
          </Radio.Group>
        </div>
        <Spacer x={2} />
        <div>
          <Text h3>Choose Payment status</Text>
          <Radio.Group size="xs" value="false">
            <Radio value="false">Not Paid</Radio>
            <Radio value="true">Paid</Radio>
          </Radio.Group>
        </div>
        <Spacer x={2} />
        <div>
          <Button size="sm" shadow rounded>
            Apply filter
          </Button>
          <Spacer y={2.5} />
          <Button size="sm" color="secondary" shadow rounded>
            Reset filter
          </Button>
        </div>
      </Row>
      <Table
        selectionMode="single"
        shadow={false}
        aria-label="Example table with static content"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          {headers.map((header, index) => {
            return <Table.Column key={index}>{header}</Table.Column>;
          })}
        </Table.Header>
        <Table.Body>
          {students.map((student, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>{student.name}</Table.Cell>
                <Table.Cell>{student.id}</Table.Cell>
                <Table.Cell>{student.branch}</Table.Cell>
                <Table.Cell>{student.year}</Table.Cell>
                <Table.Cell>
                  <Button
                    rounded
                    size="xs"
                    flat
                    color={student.payment ? "success" : "error"}
                  >
                    {student.payment ? "PAID" : "NOT PAID"}
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    rounded
                    size="xs"
                    flat
                    color={student.registration ? "success" : "error"}
                  >
                    {student.registration ? "REGISTERED" : "NOT REGISTERED"}
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  {params.type === "teacher" ? (
                    <Button
                      rounded
                      size="xs"
                      onClick={() => setOpen(true)}
                      color={student.registration ? "error" : "success"}
                    >
                      {student.registration ? "Edit" : "Register"}
                    </Button>
                  ) : (
                    <Button
                      rounded
                      size="xs"
                      onClick={() => setOpen(true)}
                      color={student.payment ? "error" : "success"}
                    >
                      Edit Payment status
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <Popup open={open} handler={setOpen} type={params.type} />
    </Container>
  );
};

export default Students;
