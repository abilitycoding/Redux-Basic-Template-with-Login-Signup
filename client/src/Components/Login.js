import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUserEmail } from "./Redux/ReduxUserData/UserDataAction";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const Data = {
    email: Email,
    password: Password
  };

  const handleLoginData = async (e) => {
    e.preventDefault();

    const Data = {
      email: Email,
      password: Password
    };
    // console.log(Data);

    await axios
      .post("http://localhost:5000/login", Data)
      .then((res) => {
        console.log(res.response);
        dispatch(loginUserEmail(res.data.loginData));
        toast(`${res.data.message}`, {
          type: "success",
          autoClose: 1500
        });
        if (res.data.message === "Login successful") {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      })
      .catch((err) => {
        console.log(err.response.data.error);
        toast(`${err.response.data.error}`, {
          type: "error",
          autoClose: 1500
        });
      });
  };

  return (
    <div className="SignIn_Container position-absolute start-0 end-0 top-0 bottom-0">
      <div className="Form_Container vh-100 d-flex flex-column justify-content-center align-items-center">
        <Form>
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

          <div className="d-flex gap-3">
            <Button variant="primary" type="submit" onClick={handleLoginData}>
              Login
            </Button>
            <Link to={"/signup"}>
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </Link>
          </div>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
