import React from 'react'
import styled from "styled-components";
import { registerClase } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { Link } from "react-router-dom";
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { duration } from '@material-ui/core';
import { useNavigate } from "react-router-dom"

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

const CourseCard = styled.div `
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  align-text: center;
`;

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

export default function NewCourse() {
  const { isFetching, error, currentUser } = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [categories, setCategories] = useState("");
  const [price, setPrice] = useState("");
  const [duracion, setDuracion] = useState("");
  const [individual, setIndividual] = useState(true);
  const [grupal, setGrupal] = useState(false);
  const [frecUnica, setFrecUnica] = useState(true);
  const [frecSemanal, setFrecSemanal] = useState(false);
  const [frecMensual, setFrecMensual] = useState(false);
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

    const clase = {
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
    console.log("registrando nuevo curso", clase);
    await registerClase(dispatch, currentUser.accessToken, clase);
    setShowModal(true);
    //nav('/tutor');
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setCategories(e.target.value);
  };



  return (
    <>
      {showModal && (
        <Modal>
          <CourseCard>
            <div>Nuevo curso registrado.</div>
            <Link to={`/tutor`} style={{ color: "black", textDecoration: "none" }}>
              <Button>Aceptar</Button>
            </Link>
          </CourseCard>
        </Modal>)}
      <Navbar></Navbar>
      <Container>
        <Wrapper>
          <Title>REGISTRAR UNA NUEVA CLASE</Title>
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
              <Button type="submit" value="Submit" disabled={isFetching}>CREAR</Button>
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
