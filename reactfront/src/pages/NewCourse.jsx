import React, { useState } from 'react'
import styled from "styled-components";
import { registerClase, updateClase } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  margin-top: 15px;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://c.pxhere.com/images/60/b3/f599f64eeb5f3478024dd23de305-1575601.jpg!d")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 98%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border: 0px;
  border-bottom: 1px solid;
  margin-bottom: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Select = styled.select`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border: 0px;
  border-bottom: 1px solid;
`;

const Buttons = styled.div`
  display: inline-flex;
  width: 100%;
  flex-direction: row-reverse;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Cancel = styled.link`
  display: inline-flex;
  width: 50%;
`;

const Label = styled.label`
  color: inherit;
`;

const Checks = styled.div`
  padding-top: 26px;
  margin-bottom: 10px;
`;

const CourseCard = styled.div`
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  align-text: center;
`;

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

export default function NewCourse() {
  const location = useLocation();
  const clase = location.state?.clase;

  const { isFetching, error, currentUser } = useSelector((state) => state.user);
  const [title, setTitle] = useState(clase == null ? "" : clase.title);
  const [desc, setDesc] = useState(clase == null ? "" : clase.desc);
  const [img, setImg] = useState(clase == null ? "" : clase.img);
  const [categories, setCategories] = useState(clase == null ? "" : clase.categories[0]);
  const [price, setPrice] = useState(clase == null ? "" : clase.price);
  const [duracion, setDuracion] = useState(clase == null ? "" : clase.duracion);
  const [individual, setIndividual] = useState(clase == null ? true : (clase.tipo.includes("individual") ? true : false));
  const [grupal, setGrupal] = useState(clase == null ? false : (clase.tipo.includes("grupal") ? true : false));
  const [frecUnica, setFrecUnica] = useState(clase == null ? true : (clase.frecuencia.includes("unica") ? true : false));
  const [frecSemanal, setFrecSemanal] = useState(clase == null ? false : (clase.frecuencia.includes("semanal") ? true : false));
  const [frecMensual, setFrecMensual] = useState(clase == null ? false : (clase.frecuencia.includes("mensual") ? true : false));
  const [showModal, setShowModal] = useState(null);

  const nav = useNavigate();

  const dispatch = useDispatch();

  console.log("Error: ", error); // TODO: ver por qué error = true por default

  const handleSubmit = async (e) => {
    e.preventDefault();

    let frecuencia = [];
    if (frecUnica) frecuencia.push("unica");
    if (frecSemanal) frecuencia.push("semanal");
    if (frecMensual) frecuencia.push("mensual");

    let type = [];
    if (individual) type.push("individual");
    if (grupal) type.push("grupal");

    const nuevaClase = {
      title: title,
      desc: desc,
      img: img,
      categories: categories,
      price: price,
      duracion: duracion,
      tipo: type,
      frecuencia: frecuencia,
    };
    console.log("nuevo curso user: ", currentUser);
    console.log("registrando nuevo curso", nuevaClase);
    if (clase == null) await registerClase(dispatch, currentUser.accessToken, nuevaClase);
    else await updateClase(dispatch, currentUser.accessToken, nuevaClase, clase._id);
    setShowModal(true);
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setCategories(e.target.value);
  };

  console.log("CLASE A EDITAR: ", clase);

  return (
    <>
      {showModal && (
        <Modal>
          <CourseCard>
            <div>{clase == null ? "Nuevo curso registrado." : "Cambios registrados."}</div>
            <Link to={`/tutor`} style={{ color: "black", textDecoration: "none" }}>
              <Button>Aceptar</Button>
            </Link>
          </CourseCard>
        </Modal>)}
      <Navbar></Navbar>
      <Container>
        <Wrapper>
          <Title>{clase == null ? "REGISTRAR UNA NUEVA CLASE" : "EDITAR CLASE " + clase.title}</Title>
          <Form onSubmit={handleSubmit}>
            <Label>Título:
              <Input
                value={title}
                placeholder=""
                onChange={(e) => setTitle(e.target.value)} required />
            </Label>
            <Label>Descripción:
              <Input
                value={desc}
                placeholder=""
                onChange={(e) => setDesc(e.target.value)} required />
            </Label>
            <Label>Imagen (link):
              <Input
                value={img}
                placeholder=""
                onChange={(e) => setImg(e.target.value)} required />
            </Label>
            <Label>Categoría:
              <Select id="category" value={categories}
                onChange={(e) => handleCategoryChange(e)}
                required>
                <option value="" disabled selected>seleccione una</option>
                <option value="matematica">Matemática</option>
                <option value="fisica">Física</option>
                <option value="literatura">Literatura</option>
                <option value="pintura">Pintura</option>
                <option value="biología">Biología</option>
                <option value="ingles">Inglés</option>
                <option value="historia">Historia</option>
                <option value="musica">Música</option>
              </Select>
            </Label>
            <Checks>Tipo:
              <label>
                <input
                  type="checkbox"
                  checked={individual}
                  onChange={(e) => setIndividual(!individual)}
                />
                Individual
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={grupal}
                  onChange={(e) => setGrupal(!grupal)}
                />
                Grupal
              </label>
            </Checks>
            <Checks>Frecuencia:
              <label>
                <input
                  type="checkbox"
                  checked={frecUnica}
                  onChange={(e) => setFrecUnica(!frecUnica)}
                />
                Única
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={frecSemanal}
                  onChange={(e) => setFrecSemanal(!frecSemanal)}
                />
                Semanal
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={frecMensual}
                  onChange={(e) => setFrecMensual(!frecMensual)}
                />
                Mensual
              </label>
            </Checks>
            <Label>Valor: $
              <Input
                value={price}
                type="number"
                placeholder=""
                onChange={(e) => setPrice(e.target.value)} required />
            </Label>
            <Label>Duracion:
              <Input
                value={duracion}
                type="number"
                placeholder=""
                onChange={(e) => setDuracion(e.target.value)} required />
            </Label>
            <Buttons>
              <Button type="submit" value="Submit" disabled={isFetching}>{clase === undefined ? "CREAR" : "MODIFICAR"}</Button>
              <Link to="/" style={{ width: '50%' }}>
                <Button type="cancel" value="Cancel" disabled={isFetching}>CANCELAR</Button>
              </Link>
            </Buttons>
          </Form>
        </Wrapper>
      </Container>
      <Footer></Footer>
    </>
  )
}
