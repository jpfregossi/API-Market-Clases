import React from 'react'
import styled from "styled-components";
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import {Link} from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
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
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
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

const Blank = styled.div`
  flex: 1;
  min-width: 40%;
  margin: 0px 10px 0px 4px;
  padding: 10px;
  height: 2px;
`;

const Select = styled.select`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
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

export default function Register() {
  const { isFetching, error } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [studies, setStudies] = useState("");

  const dispatch = useDispatch();

  console.log("Error: ", error); // TODO: ver por qué error = true por default

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("registrando, ponele...", {name, lastname, username, email, password});
    register(dispatch, {name, lastname, username, email, password});
  };

  const handleAccountTypeChange = (e) => {
    e.preventDefault();
    setAccountType(e.target.value);
  };

  const handleStudies = (e) => {
    e.preventDefault();
    setStudies(e.target.value);
  };

  console.log("Account: ", accountType);

  // {error && <Error>Ups...</Error>}

  return (
    <Container>
      <Wrapper>
        <Title>CREAR CUENTA</Title>
        <Form onSubmit={handleSubmit}>
          <Input 
            value={name} 
            placeholder="nombre"
            onChange={(e) => setName(e.target.value)} required/>
          <Input 
            value={lastname} 
            placeholder="apellido"
            onChange={(e) => setLastName(e.target.value)} required/>
          <Input 
            value={username} 
            placeholder="nombre usuario"
            onChange={(e) => setUserName(e.target.value)} required/>
          <Input 
            value={email} 
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)} required/>
          <Input 
            value={telephone} 
            placeholder="teléfono"
            onChange={(e) => setTelephone(e.target.value)} required/>
          <Select id="accountType" value={accountType} 
            onChange={(e) => handleAccountTypeChange(e)} 
            required>
              <option value="" disabled selected>tipo de cuenta</option>
              <option value="alumno">Alumno</option>
              <option value="profesor">Profesor</option>
          </Select>
          <Input 
            value={title} 
            placeholder="título"
            onChange={(e) => setTitle(e.target.value)} 
            hidden={accountType !== "profesor"} />
          <Input 
            value={experience} 
            placeholder="experiencia"
            onChange={(e) => setExperience(e.target.value)}
            hidden={accountType !== "profesor"} />
          <Input 
            value={birthDate} 
            placeholder="fecha nacimiento"
            type="date"
            lang="es"
            onChange={(e) => setBirthDate(e.target.value)} 
            hidden={accountType !== "alumno"} />
          <Select id="studies" value={studies} 
            onChange={(e) => handleStudies(e)}
            hidden={accountType !== "alumno"}
            required>
              <option value="" disabled selected>estudios</option>
              <option value="0">Primaria - en curso</option>
              <option value="1">Primaria - terminada</option>
              <option value="0">Secundaria - en curso</option>
              <option value="1">Secundaria - terminada</option>
              <option value="0">Universidad - en curso</option>
              <option value="1">Universidad - terminada</option>
          </Select>
          <Input 
            value={password} 
            placeholder="contraseña"
            onChange={(e) => setPassword(e.target.value)} required/>
          <Blank/>
          <Input placeholder="confirme contraseña" />
          <Blank/>
          <Agreement>
              Al crear una cuenta, doy consentimiento al proceso de my información
              personal de acuerdo con la <b>POLITICA DE PRIVACIDAD</b>
            </Agreement>
          <Buttons>
            <Button type="submit" value="Submit" disabled={isFetching}>CREAR</Button>
            <Link to="/" style={{width: '50%'}}>
              <Button type="cancel" value="Cancel" disabled={isFetching}>CANCELAR</Button>
            </Link>
          </Buttons>
        </Form>
      </Wrapper>
    </Container>
  )
}
