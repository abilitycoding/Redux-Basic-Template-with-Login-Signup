import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { LogoutHandleDeclaration } from "./Redux/ReduxUserData/UserDataAction";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.userData.userEmail);
  console.log(userEmail);

  const handleLogout = () => {
    dispatch(LogoutHandleDeclaration());
  };

  return (
    <div>
      <h3 className="text-center">Welcome to Home</h3>
      <Button onClick={handleLogout}>Logout</Button>
      <Link to={"/login"}>
        <Button>Login</Button>
      </Link>
      {userEmail ? <p>Video</p> : <p>Pay Now to get video subscription</p>}
    </div>
  );
};

export default Home;
