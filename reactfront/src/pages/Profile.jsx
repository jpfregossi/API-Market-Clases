import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkCurrentPassword, getUserOrders } from "../redux/apiCalls";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const Button = styled.button`
  border: none;
  outline: 0;
  padding: 15px 20px;
  background-color: transparent;
  color: teal;
  cursor: pointer;
  font-weight: 600;
`;

const Duo = styled.div `
    display: flex;
    align-items: center;
    border: 2px solid teal;
    margin-right: 1%;
    width: 300px;
`;

const Input = styled.input`
  border-radius: 12px;
  border: none;
  flex: 1;
  min-width: 20%;
  padding: 10px;
  outline: 0;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 30vh;
  text-align: center;
`;



const Profile = () => {

  const [currentPassword, setCurrentPassword] = useState("");
  const id = useSelector((state) => state.user.currentUser._id) ;
  const confirmedPass = useSelector((state) => state.user.confirmedPassword);

  const dispatch = useDispatch();
  const orders = useSelector((state)=>state.tutor.orders);
  const token = useSelector((state)=>state.user.currentUser.accessToken);  

  useEffect(() => {
    getUserOrders(dispatch,  token);
  }, [dispatch]);

  const handleClick = () => {
    checkCurrentPassword(dispatch,  id, currentPassword);
  };

  return (
    <>
        <Announcement/>
        <Navbar/>
        <Form>
          <div style={{display:"flex", alignItems:"center", width:"fit-content"}}>
            <Duo>
              <Input placeholder="Ingrese su password" onChange={(e) => setCurrentPassword(e.target.value)}/>
              <Button onClick={() => handleClick()}>Seguridad</Button>
            </Duo>
            {confirmedPass === null ? <></> : confirmedPass === true ? <Navigate to="/profile/securitysettings" /> : <span color="black">Contraseña equivocada</span>}
          </div>
            <Link orders={orders} to="/profile/orders" style={{margin:"0.5% 0%"}}>
              <Button>Mis Clases</Button>
            </Link>
        </Form>
    </>
  );

};

export default Profile;