import React, { useState } from 'react'
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { acceptContratacion, acceptFeedback, blockFeedback } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";


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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin: 1% 1%;
  width: 100%;
`;

const Bar = styled.div`
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
const Bar2 = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  margin: 2% 0%;
`;

const Course = styled.div`
  width: 100%;
  border-radius: 5px;
  background-color: white;
  align-items: center;
  text-align: center;
  margin: 2% 2%;
`;

const NuevoCurso = styled.div`
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

const Modal = styled.div`
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

const CourseCard = styled.div`
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  align-text: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
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
  }, {
    curso: "matematica",
    alumno: "userPrueba2",
    tipo: "grupal",
    frecuencia: "unica",
    estado: "ACEPTADA",
    comentario: "Sin comentarios",
    calificacion: 4
  }, {
    curso: "historia",
    alumno: "userPrueba3",
    tipo: "individual",
    frecuencia: "semanal",
    estado: "CANCELADA",
    comentario: "Un irresponsable, nunca apareció. Nunca más!",
    calificacion: 1
  }, {
    curso: "ingles",
    alumno: "userPruebaX",
    tipo: "individual",
    frecuencia: "mensual",
    estado: "FINALIZADA",
    comentario: "De diez, un capo el profe!",
    calificacion: 5
  },
]


export default function Dashboard({ clases }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(null);
  const [showDescargo, setShowDescargo] = useState(null);
  const [descargo, setDescargo] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser)

  const history = useNavigate();

  const handleActionsClick = (contratacion) => {
    console.log("Order: ", contratacion);
    setShowModal(contratacion);
  };

  const handleBloquearClick = (e, id) => {
    e.preventDefault();
    console.log("Bloquear: ", id);
    setShowDescargo(id);
  };

  const handleOutsideClick = (e) => {
    console.log("Clickeó afuera: " + showModal + " | " + showDescargo);
    if (showModal == null && descargo != null) setShowDescargo(null);
    setShowModal(null);
  };

  const handleAcceptClick = (e, action, id) => {
    e.preventDefault();
    console.log("Clickeó " + action + " para " + id);
    acceptContratacion(dispatch, id, action, currentUser.accessToken);
  };

  const handleEditarClick = (e, clase) => {
    e.preventDefault();
    console.log("Editar clase: ", clase);
    history("/tutor/newcourse", {state:{clase: clase,}});
  };

  const handleCommentAction = (e, action, id) => {
    e.preventDefault();
    console.log("Clickeó Comentario para ", id);
    acceptFeedback(dispatch, id, currentUser.accessToken);
  };

  const handleEnviarDescargo = (e, id) => {
    e.preventDefault();
    console.log("Clickeó Bloquear Comentario para ", id);
    blockFeedback(dispatch, id, descargo, currentUser.accessToken);
  };

  console.log("clases: ", clases);

  return (
    <div style={{ display: 'flex' }}>
      {showModal && (
        <Modal onClick={handleOutsideClick}>
          <CourseCard>
            <div>{showModal.title}</div>
            <div>{showModal.alumno_id}</div>
            <div>{showModal.tipo}</div>
            <div>{showModal.frecuencia}</div>
            <div>{showModal.estado}</div>
            <div>{showModal.rating}</div>
            {(showModal.estado === "SOLICITADA") && (
              <>
                <Bar><span style={{ flex: 1 }}>Contratación:</span></Bar>
                <ButtonsContainer>
                  <Button onClick={(e) => handleAcceptClick(e, "ACEPTADA", showModal._id)}>ACEPTAR</Button>
                  <Button onClick={(e) => handleAcceptClick(e, "CANCELADA", showModal._id)}>RECHAZAR</Button>
                </ButtonsContainer>
              </>
            )}
            {(showModal.feedback?.state === "PENDIENTE") && (
              <>
                <Bar><span style={{ flex: 1 }}>Comentario:</span></Bar>
                <ButtonsContainer>
                  <Button onClick={(e) => handleCommentAction(e, "APROBADO", showModal.feedback._id)}>APROBAR</Button>
                  <Button onClick={(e) => handleBloquearClick(e, showModal.feedback._id)}>BLOQUEAR</Button>
                </ButtonsContainer>
              </>
            )}
          </CourseCard>
        </Modal>
      )}
      {showDescargo && (
        <Modal onClick={handleOutsideClick}>
          <CourseCard>
            <ButtonsContainer>
              <div>Enviar Descargo</div>
            </ButtonsContainer>
            <ButtonsContainer>
              <textarea
                type="textarea"
                name="textValue"
                value={descargo}
                style={{ width: '200px', height: '100px' }}
                onChange={(e) => setDescargo(e.target.value)}
              />
            </ButtonsContainer>
            <ButtonsContainer>
              <Button onClick={(e) => handleEnviarDescargo(e, showDescargo)}>ACEPTAR</Button>
            </ButtonsContainer>
          </CourseCard>
        </Modal>
      )}
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
          <span style={{ flex: 1 }}>Acciones Pendientes</span>
        </Bar>
        <Bar>
          <span style={{ flex: 1 }}>Curso</span>
          <span style={{ flex: 1 }}>Alumno</span>
          <span style={{ flex: 1 }}>Tipo</span>
          <span style={{ flex: 1 }}>Frecuencia</span>
          <span style={{ flex: 1 }}>Estado</span>
          <span style={{ flex: 1 }}>Calificación</span>
          <span style={{ flex: 1 }}>Acciones</span>
        </Bar>
        <div>
          {clases.map((clase) => clase.contrataciones.map((contratacion) => {
            if (contratacion.estado === "SOLICITADA" || contratacion.feedback?.state === "PENDIENTE") {
              return (
                <>
                  <hr />
                  <Bar2>
                    <span style={{ flex: 1 }}>{clase.title}</span>
                    <span style={{ flex: 1 }}>{contratacion.alumno_id}</span>
                    <span style={{ flex: 1 }}>{contratacion.tipo}</span>
                    <span style={{ flex: 1 }}>{contratacion.frecuencia}</span>
                    <span style={{ flex: 1 }}>{contratacion.estado}</span>
                    <span style={{ flex: 1 }}>{contratacion.feedback?.rating}<Tooltip class="tooltiptext">{contratacion.feedback?.message}</Tooltip></span>
                    <span style={{ flex: 1 }}><input type="button" value="..." onClick={(e) => handleActionsClick(contratacion)} /></span>
                  </Bar2>
                </>
              )
            }
          })
          )}
        </div>
        <Bar>
          <span style={{ flex: 1 }}>Clases Contratadas</span>
        </Bar>
        <Bar>
          <span style={{ flex: 1 }}>Curso</span>
          <span style={{ flex: 1 }}>Alumno</span>
          <span style={{ flex: 1 }}>Tipo</span>
          <span style={{ flex: 1 }}>Frecuencia</span>
          <span style={{ flex: 1 }}>Estado</span>
          <span style={{ flex: 1 }}>Calificación</span>
          <span style={{ flex: 1 }}>Acciones</span>
        </Bar>
        <div>
          {clases.map((clase) => clase.contrataciones.map((contratacion) => {
            return (
              <>
                <hr />
                <Bar2>
                  <span style={{ flex: 1 }}>{clase.title}</span>
                  <span style={{ flex: 1 }}>{contratacion.alumno_id}</span>
                  <span style={{ flex: 1 }}>{contratacion.tipo}</span>
                  <span style={{ flex: 1 }}>{contratacion.frecuencia}</span>
                  <span style={{ flex: 1 }}>{contratacion.estado}</span>
                  <span style={{ flex: 1 }}>{contratacion.feedback?.rating}<Tooltip class="tooltiptext">{contratacion.feedback?.message}</Tooltip></span>
                  <span style={{ flex: 1 }}><input type="button" value="..." onClick={(e) => handleActionsClick(contratacion)} /></span>
                </Bar2>
              </>
            )
          })
          )}
        </div>
        <Bar>
          <span style={{ flex: 1 }}>Clases Finalizadas</span>
        </Bar>
        <Bar>
          <span style={{ flex: 1 }}>Curso</span>
          <span style={{ flex: 1 }}>Alumno</span>
          <span style={{ flex: 1 }}>Tipo</span>
          <span style={{ flex: 1 }}>Frecuencia</span>
          <span style={{ flex: 1 }}>Calificación</span>
        </Bar>
        <div>
          {clases.map((clase) => clase.contrataciones.map((contratacion) => {
            return (
              <>
                <hr />
                <Bar2>
                  <span style={{ flex: 1 }}>{clase.title}</span>
                  <span style={{ flex: 1 }}>{contratacion.alumno_id}</span>
                  <span style={{ flex: 1 }}>{contratacion.tipo}</span>
                  <span style={{ flex: 1 }}>{contratacion.frecuencia}</span>
                  <span style={{ flex: 1 }}>{contratacion.feedback?.rating}<Tooltip class="tooltiptext">{contratacion.feedback?.message}</Tooltip></span>
                </Bar2>
              </>
            )
          })
          )}
        </div>
        <Bar>
          <span style={{ flex: 1 }}>Clases Creadas</span>
        </Bar>
        <Bar>
          <span style={{ flex: 1 }}>Curso</span>
          <span style={{ flex: 1 }}>Acciones</span>
        </Bar>
        <div>
          {clases.map((clase) => {
            return (
              <>
                <hr />
                <Bar2>
                  <span style={{ flex: 1 }}>{clase.title}</span>
                  <span style={{ flex: 1 }}>
                    <input type="button" value="ELIMINAR" onClick={(e) => handleEditarClick(e, clase)} />
                    <input type="button" value="EDITAR" onClick={(e) => handleEditarClick(e, clase)} />
                  </span>
                </Bar2>
              </>
            )
          })
          }
        </div>
      </Container>
    </div>
  )
}
