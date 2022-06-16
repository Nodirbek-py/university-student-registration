import React, { useState } from "react";
import { Modal, Button, Text, Radio } from "@nextui-org/react";

interface IPopup {
  open: boolean;
  handler: (boolean: boolean) => void;
  type: string;
  index: number;
  changeStudent: (index: number, status: boolean) => void;
}

const Popup: React.FC<IPopup> = ({
  open,
  handler,
  type,
  index,
  changeStudent,
}) => {
  const [registration, setRegistration] = useState(false);
  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={open}
      onClose={() => handler(false)}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          {type === "teacher"
            ? `Registration for${" "}`
            : `Update payment for${" "}`}
          <Text b size={18}>
            the Student
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text h3>Update the Registration Status</Text>
        <Radio.Group
          size="xs"
          onChange={(e) => setRegistration(e === "true" ? true : false)}
        >
          <Radio value="false">Not Registered</Radio>
          <Radio value="true">Registered</Radio>
        </Radio.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={() => handler(false)}>
          Close
        </Button>
        <Button auto onClick={() => changeStudent(index, registration)}>
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Popup;
