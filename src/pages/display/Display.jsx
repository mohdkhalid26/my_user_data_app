import { React, useEffect, useState } from "react";
import "./Display.scss";
import { useNavigate } from "react-router";
import { Button, Container, Table } from "react-bootstrap";
function Display({ editdata, isNotEdit }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("data")) || []);
  }, []);

  function deletedata(index) {
    const newdata = data.filter((data2, index2) => {
      return index2 !== index;
    });
    setData(newdata);
    localStorage.setItem("data", JSON.stringify(newdata));
  }

  return (
    <Container fluid className="display">
      <h1>
        <u>Display</u>
      </h1>
      <Button
        className="createbtn"
        onClick={() => {
          isNotEdit();
          navigate("/");
        }}
        variant="primary"
      >
        Create
      </Button>{" "}
      <Table className="table">
        <thead className="thead">
          <tr className="tr">
            <th className="th">S.No</th>
            <th className="th">Name</th>
            <th className="th">Email</th>
            <th className="th">Number</th>
          </tr>
        </thead>
        {data &&
          data.map((data, index) => {
            return (
              <tbody className="tbody" key={index}>
                <tr className="tr">
                  <td className="td">
                    <p>{index + 1}</p>
                  </td>
                  <td className="td">
                    <p>{data.username}</p>
                  </td>
                  <td className="td">
                    <p>{data.email}</p>
                  </td>
                  <td className="td">
                    <p>{data.number}</p>
                  </td>

                  <td className="td">
                    <Button
                      onClick={() => {
                        navigate("/");
                        editdata(index);
                      }}
                      variant="primary"
                    >
                      Edit
                    </Button>{" "}
                  </td>
                  <td className="td">
                    <Button
                      variant="danger"
                      onClick={() => {
                        deletedata(index);
                      }}
                    >
                      Delete
                    </Button>{" "}
                  </td>
                </tr>
              </tbody>
            );
          })}
      </Table>
      {data.length > 1 ? (
        <Button
          className="deleteallbtn"
          onClick={() => {
            setData([]);
            localStorage.clear();
          }}
          variant="danger"
        >
          {" "}
          Delete All{" "}
        </Button>
      ) : null}
    </Container>
  );
}

export default Display;
