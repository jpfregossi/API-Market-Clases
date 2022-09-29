import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;


export default function Announcement() {


  return (
    <div>
        <Container>50% de Descuento en la compra de 2 o mas clases !</Container>
    </div>
    
  )
}
