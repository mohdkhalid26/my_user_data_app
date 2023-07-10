import React, { useState } from "react";
import "./Create.scss";
import { useNavigate } from "react-router";
import { Button, Col, Container, Row } from "react-bootstrap";
function Create({ test, isEdit, selectkey }) {
  const navigate = useNavigate();
  const [isEdit2, setIsEdit2] = useState(isEdit);
  const [isEdit3, setIsEdit3] = useState(isEdit);
  const [isEdit4, setIsEdit4] = useState(isEdit);
  const [reqname, setReqname] = useState(false);
  const [reqemail, setReqemail] = useState(false);
  const [reqnumber, setReqnumber] = useState(false);
  const [username, setUsername] = useState(isEdit2 ? test.username : "");
  const [email, setEmail] = useState(isEdit3 ? test.email : "");
  const [number, setNumber] = useState(isEdit4 ? test.number : "");
  const handlename = (e) => {
    setIsEdit2(false);
    setUsername(e.target.value);
    setReqname(false);
  };
  function handlemail(e) {
    setIsEdit3(false);
    setEmail(e.target.value);
    setReqemail(false);
  }
  function handlenumber(e) {
    setIsEdit4(false);
    setNumber(e.target.value);
    setReqnumber(false);
  }

  function submit() {
    const retain = JSON.parse(localStorage.getItem("data"));
    if (retain) {
      localStorage.setItem(
        "data",
        JSON.stringify([
          ...retain,
          { username: username, email: email, number: number },
        ])
      );
    } else {
      localStorage.setItem(
        "data",
        JSON.stringify([{ username: username, email: email, number: number }])
      );
    }
    setUsername("");
    setEmail("");
    setNumber("");
    navigate("/display");
  }

  function update() {
    setUsername(username);
    setEmail(email);
    setNumber(number);
    const retain = JSON.parse(localStorage.getItem("data"));
    retain.splice(selectkey, 1, {
      username: username,
      email: email,
      number: number,
    });
    localStorage.setItem("data", JSON.stringify(retain));
    setUsername("");
    setEmail("");
    setNumber("");
    navigate("/display");
  }

  let isreq = () => {
    setReqname(true);
    setReqemail(true);
    setReqnumber(true);
  };

  const display = () => {
    navigate("/display");
  };

  return (
    <Container fluid className="create">
      <Row className="row">
        <h1>
          <u>Enter User Details</u>
        </h1>
        <Col className="col">
          <input
            className={reqname ? "red" : ""}
            required="required"
            type="text"
            placeholder={reqname ? "username is required !" : "username"}
            value={username}
            onChange={handlename}
          />
          <input
            required="required"
            className={reqemail ? "red" : ""}
            type="email"
            placeholder={reqemail ? "email is required !" : "email"}
            value={email}
            onChange={handlemail}
          />
          <input
            required="required"
            className={reqnumber ? "red" : ""}
            type="number"
            placeholder={
              reqnumber ? "contact no. is required !" : "contact no."
            }
            value={number}
            onChange={handlenumber}
          />
          {isEdit ? (
            <Button
              onClick={username && email && number ? update : isreq}
              variant="warning"
            >
              Update{" "}
            </Button>
          ) : (
            <Button
              onClick={username && email && number ? submit : isreq}
              variant="success"
            >
              Submit{" "}
            </Button>
          )}
        </Col>
      </Row>
      <Button onClick={display} variant="primary">
        Display
      </Button>{" "}
    </Container>
  );
}

export default Create;
