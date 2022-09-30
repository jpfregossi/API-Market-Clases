import React from 'react'
import Facebook from '@mui/icons-material/Facebook';
import Instagram from '@mui/icons-material/Instagram';
import MailOutline from '@mui/icons-material/EmailOutlined';
import Phone from '@mui/icons-material/Phone';
import Pinterest from '@mui/icons-material/Pinterest';
import Room from '@mui/icons-material/Apartment';
import Twitter from '@mui/icons-material/Twitter';
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from 'react';


const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const Courses = styled.div`
    height: 90vh;
    background-color: #cfcfcf;
    margin-top: 20px;
    width: 10vw;
    min-width: 150px;
`;

const Payment = styled.img`
    width: 50%;
`;

const Container = styled.div `
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin: 1% 1%;
  width: 100%;
`;

const Bar = styled.div `
  display: flex;
  justify-content: space-around;
  color: teal;
  padding: 1% 0%;
  font-size: 20px;
  font-weight: 600;
  font-family: 'Source Sans Pro', sans-serif;
  align-items: center;
  text-align: center;
`;
const Bar2 = styled.div `
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  margin: 2% 0%;
`;

const Course = styled.div `
  width: 100%;
  border-radius: 5px;
  background-color: white;
  align-items: center;
  text-align: center;
  margin: 2% 2%;
`;

const NuevoCurso = styled.div `
  width: 100%;
  border-radius: 5px;
  background-color: #57ff57;
  align-items: center;
  text-align: center;
  margin-top: 20px;
`;

const Tooltip = styled.div``;

const Div = styled(Tooltip)`
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;

  &:hover {
    visibility: visible;
  }
`

const Modal = styled.div `
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #8d8d8d4f;
  position: absolute;
  display: flex;
  align-content: center;
  justify-content: space-evenly;
  align-items: center;
`;

const CourseCard = styled.div `
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  align-text: center;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const datos = [
    {
        curso: "matematica",
        alumno: "nico",
        tipo: "individual",
        frecuencia: "semanal",
        estado: "SOLICITADA",
        comentario: "Por ahora viene bien, veremos...",
        calificacion: 4.5
    },{
        curso: "matematica",
        alumno: "userPrueba2",
        tipo: "grupal",
        frecuencia: "unica",
        estado: "ACEPTADA",
        comentario: "Sin comentarios",
        calificacion: 4
    },{
        curso: "historia",
        alumno: "userPrueba3",
        tipo: "individual",
        frecuencia: "semanal",
        estado: "CANCELADA",
        comentario: "Un irresponsable, nunca apareció. Nunca más!",
        calificacion: 1
    },{
        curso: "ingles",
        alumno: "userPruebaX",
        tipo: "individual",
        frecuencia: "mensual",
        estado: "FINALIZADA",
        comentario: "De diez, un capo el profe!",
        calificacion: 5
    },
]


export default function Footer() {
  const [showModal, setShowModal] = useState(null);

  const handleActionsClick = (order) => {
    console.log("Order: ", order);
    setShowModal(order);
  };

  const handleOutsideClick = (e) => {
    console.log("Clickeó afuera");
    setShowModal(null);
  };

  console.log("showModal: ", showModal);

  return (
    <div style={{display: 'flex'}}>
      { showModal && (
        <Modal onClick={handleOutsideClick}>
          <CourseCard>
            <div>{showModal.curso}</div>
            <div>{showModal.alumno}</div>
            <div>{showModal.tipo}</div>
            <div>{showModal.frecuencia}</div>
            <div>{showModal.estado}</div>
            <div>{showModal.calificacion}</div>
            <Button>{
              showModal.estado === "SOLICITADA" ? "ACEPTAR" : (showModal.estado == "ACEPTADA" ? "CANCELAR" : "FINALIZAR") 
            }</Button>
            <Button>RECHAZAR COMENTARIO</Button>
          </CourseCard>
        </Modal>) }
      <Courses>
        <Course>
            matematica
        </Course>
        <Course>
            historia
        </Course>
        <Course>
            ingles
        </Course>
        <Course>
            musica
        </Course>
        <Link to={`/tutor/newcourse`} style={{ color: "black", textDecoration: "none" }}>
            <NuevoCurso>
                Agregar Curso!
            </NuevoCurso>
        </Link>
      </Courses>
      <Container>
          <Bar>
            <span style={{flex:1}}>Curso</span>
            <span style={{flex:1}}>Alumno</span>
            <span style={{flex:1}}>Tipo</span>
            <span style={{flex:1}}>Frecuencia</span>
            <span style={{flex:1}}>Estado</span>
            <span style={{flex:1}}>Calificación</span>
            <span style={{flex:1}}>Acciones</span>
          </Bar>
          <div>
            {datos.map((order) => {
                return (
                <>
                  <hr />
                  <Bar2>
                    <span style={{flex:1}}>{order.curso}</span>
                    <span style={{flex:1}}>{order.alumno}</span>
                    <span style={{flex:1}}>{order.tipo}</span>
                    <span style={{flex:1}}>{order.frecuencia}</span>
                    <span style={{flex:1}}>{order.estado}</span>
                    <span style={{flex:1}}>{order.calificacion}<Tooltip class="tooltiptext">{order.comentario}</Tooltip></span>
                    <span style={{flex:1}}><input type="button" value="..." onClick={(e) => handleActionsClick(order)}/></span>
                  </Bar2>
                </>
                )
            })}
          </div>
        </Container>
    </div>
  )
}
