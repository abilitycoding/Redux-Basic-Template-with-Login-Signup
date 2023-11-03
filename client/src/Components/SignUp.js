import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const handleRegisterData = async (e) => {
    e.preventDefault();
    const Data = {
      username: UserName,
      email: Email,
      password: Password
    };

    console.log(Data);

    await axios
      .post("http://localhost:5000/register", Data)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "Successfully registered") {
          toast(`${res.data.message}`, {
            type: "success",
            autoClose: 1500
          });
        }
        if (res.data.message === "Successfully registered") {
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err);
        toast(`${err.response.data.message}`, {
          type: "error",
          autoClose: 1500
        });
      });
  };

  return (
    <div className="SignIn_Container position-absolute start-0 end-0 top-0 bottom-0">
      <div className="Form_Container vh-100 d-flex flex-column justify-content-center align-items-center">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User Name"
              value={UserName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={Email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleRegisterData}>
            Sign Up
          </Button>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
