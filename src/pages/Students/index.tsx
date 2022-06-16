import React, { useEffect, useState } from "react";
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
import Navbar from "./navbar";
import { getStudents } from "../../core/nhost";
interface IParams {
  type: string;
}

interface IProps {
  user: any;
  children?: React.ReactNode;
}

const Students: React.FC<IProps> = (props) => {
  const params: IParams = useParams();
  const [year, setYear] = useState(0);
  const [branch, setBranch] = useState("");
  const [registration, setRegistration] = useState(false);
  const [payment, setPayment] = useState(false);
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudent] = useState([]);
  const [studentIndex, setStudentIndex] = useState(0);
  useEffect(() => {
    getStudents().then((res) => {
      setStudents(res.students);
      setFilteredStudent(res.students);
    });
  }, [params.type]);

  const applyFilter = () => {
    let copyStudents = [...students];
    copyStudents = copyStudents.filter((student) => student.year === year);
    copyStudents = copyStudents.filter((student) => student.branch === branch);
    copyStudents = copyStudents.filter(
      (student) => student.registration === registration,
    );
    copyStudents = copyStudents.filter(
      (student) => student.payment === payment,
    );
    setFilteredStudent(copyStudents);
  };

  const resetFilter = () => {
    setFilteredStudent(students);
  };

  const changeStudent = (index: number, status: boolean) => {
    let studentsCopy = [...students];
    studentsCopy[index].registration = status;
    setFilteredStudent(studentsCopy);
  };

  const headers = [
    "Full name",
    "Unique ID",
    "Branch",
    "Year",
    "Payment Status",
    "Registration Status",
    "Register",
  ];

  return (
    <Container>
      <Navbar
        displayName={props.user?.displayName}
        role={props.user?.defaultRole}
        avatarUrl={props.user?.avatarUrl}
      />
      <Spacer y={8} />
      <Row>
        <div>
          <Text h3>Choose Year</Text>
          <Radio.Group size="xs" onChange={(e) => setYear(Number(e))}>
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
          <Radio.Group size="xs" onChange={(e) => setBranch(e)}>
            <Radio value="B.Tech">B.Tech</Radio>
            <Radio value="B.BA">B.BA</Radio>
            <Radio value="B.AE">B.AE</Radio>
          </Radio.Group>
        </div>
        <Spacer x={2} />
        <div>
          <Text h3>Choose Registration status</Text>
          <Radio.Group
            size="xs"
            onChange={(e) => setRegistration(e === "true" ? true : false)}
          >
            <Radio value="false">Not Registered</Radio>
            <Radio value="true">Registered</Radio>
          </Radio.Group>
        </div>
        <Spacer x={2} />
        <div>
          <Text h3>Choose Payment status</Text>
          <Radio.Group
            size="xs"
            onChange={(e) => setPayment(e === "true" ? true : false)}
          >
            <Radio value="false">Not Paid</Radio>
            <Radio value="true">Paid</Radio>
          </Radio.Group>
        </div>
        <Spacer x={2} />
        <div>
          <Button size="sm" shadow rounded onClick={applyFilter}>
            Apply filter
          </Button>
          <Spacer y={2.5} />
          <Button
            size="sm"
            color="secondary"
            shadow
            rounded
            onClick={resetFilter}
          >
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
          {filteredStudents.map((student, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>{student.full_name}</Table.Cell>
                <Table.Cell>{student.uid}</Table.Cell>
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
                      onClick={() => {
                        setOpen(true);
                        setStudentIndex(index);
                      }}
                      color={student.registration ? "error" : "success"}
                    >
                      {student.registration ? "Edit" : "Register"}
                    </Button>
                  ) : (
                    <Button
                      rounded
                      size="xs"
                      onClick={() => {
                        setOpen(true);
                        setStudentIndex(index);
                      }}
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
      <Popup
        open={open}
        handler={setOpen}
        type={params.type}
        index={studentIndex}
        changeStudent={changeStudent}
      />
    </Container>
  );
};

export default Students;
