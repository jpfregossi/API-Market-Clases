import { useState } from 'react'
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, requestPasswordReset } from "../redux/apiCalls";
import { useNavigate } from "react-router";
import { useParams } from 'react-router-dom'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://st2.depositphotos.com/1075946/7936/i/600/depositphotos_79360604-stock-photo-people-sitting-in-park-to.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled{
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
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

const CourseCard = styled.div`
  width: 450px;
  height: 300px;
  background-color: red;
  color: white;
  border-radius: 10px;
  align-text: center;
`;

export default function PasswordReset() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [duplicatePassword, setDuplicatePassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorContraseñas, setErrorContraseñas] = useState("");
  const { isFetching, error } = useSelector((state) => state.user);

  const { id, token } = useParams();

  const history = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (password != duplicatePassword) setErrorContraseñas(true);
    else {
      setErrorContraseñas(false);
      resetPassword(dispatch, id, token, password);
      history("/login");
    }
  };

  const handleEnviarClick = (e) => {
    e.preventDefault();
    requestPasswordReset(email);
    history("/login");
  };

  console.log("id: ", id);

  return (
    <Container>
      <Wrapper>
        {id != null ?
          <>
            <Title>RESETEAR CONTRASEÑA</Title>
            <Form>
              <Input placeholder="nueva contraseña" type="password" onChange={(e) => setPassword(e.target.value)} />
              <Input placeholder="repita la contraseña" type="password" onChange={(e) => setDuplicatePassword(e.target.value)} />
              {errorContraseñas && <Error>Las contraseñas deben coincidir</Error>}
              {error && <Error>Algo salio mal...</Error>}
              <Button onClick={handleClick} disabled={isFetching}>RESETEAR</Button>
            </Form>
          </>
          :
          <>
            <Title>Reestablecer Contraseña</Title>
            <Form>
              <Input placeholder="email" type="email" onChange={(e) => setEmail(e.target.value)} />
              {error && <Error>Algo salio mal...</Error>}
              <Button onClick={handleEnviarClick} disabled={isFetching}>ENVIAR</Button>
            </Form>
          </>
        }
      </Wrapper>
    </Container>
  )
}

