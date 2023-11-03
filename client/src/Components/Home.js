import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";
import { LogoutHandleDeclaration } from "./Redux/ReduxUserData/UserDataAction";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.userData.userEmail);
  console.log(userEmail);

  const handleLogout = () => {
    dispatch(LogoutHandleDeclaration());
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <Row
        className="d-flex py-2 bg-dark text-light"
        bg="dark"
        data-bs-theme="dark"
      >
        <Col className="d-flex">
          <div className="w-100">
            <h3 className="text-center m-0">Welcome to Home</h3>
          </div>
          <span className="d-flex gap-3 mx-3">
            <Button variant="light" onClick={handleLogout}>
              Logout
            </Button>
            <Button variant="light" onClick={handleLogin}>
              Login
            </Button>
          </span>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          {userEmail ? (
            <p>
              <img
                src="https://www.hubspot.com/hubfs/Smiling%20Leo%20Perfect%20GIF.gif"
                alt="..."
                className="rounded mt-5"
              />
            </p>
          ) : (
            <p>Pay Now to get video subscription</p>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Home;
