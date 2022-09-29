import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Clase from "./Clase";
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Clases = ({ cat, filters, sort, input }) => {
  const [clases, setClases] = useState([]);
  const [filteredClases, setFilteredClases] = useState([]);

  useEffect(()=>{
    const getClases = async () =>{
      try {                                   //si hay categoria se usa el primer url SINO va el segundo
        const res = await axios.get(cat ?  `http://localhost:5000/api/clases?category=${cat}` : "http://localhost:5000/api/clases");
        //console.log(res)// -> para ver el objeto Producto de la DB
        setClases(res.data)
      } catch (error) {};
    }
    getClases()
  },[cat])

  useEffect(() => {
    cat &&
      setFilteredClases(
        clases.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [clases, cat, filters]);

  useEffect(() => {
    cat &&
      setFilteredClases(
        clases.filter((item) => {
          if (input === '') {
            return item;
          }
          else {
            return item.title.toLowerCase().includes(input)
          }
        })
      )
  }, [clases, cat, input]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredClases((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredClases((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredClases((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);


  useEffect(() => {
    if (sort === "newest") {
      setFilteredClases((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredClases((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredClases((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);




  //console.log(cat,filters,sort)
  return (
    <Container>
      
      {cat ? filteredClases.map((item) => (<Clase item={item} key={item.id} />)) 
           : clases.slice(0,8).map((item) => ( <Clase item={item} key={item.id} />
           //Si esta filtrado usa la variable filteredProducts y sino products (se usa en home)
      ))}
    </Container>
  );
};

export default Clases;