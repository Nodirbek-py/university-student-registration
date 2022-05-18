import React from "react";
import { Modal, Input, Row, Checkbox, Button, Text } from "@nextui-org/react";

interface IPopup {
  open: boolean;
  handler: (boolean: boolean) => void;
  type: string;
}

const Popup: React.FC<IPopup> = ({ open, handler, type }) => {
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
        <Text b size={12}>
          This popup is not ready yet :)
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={() => handler(false)}>
          Close
        </Button>
        <Button auto onClick={() => handler(false)}>
          Sign in
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Popup;
