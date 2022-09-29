import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Clases from "../components/Clases";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useState } from "react";
import { Refresh, Search } from "@material-ui/icons";
import CachedIcon from '@mui/icons-material/Cached';


const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  display:flex;
  justify-content: left;
  align-items: center;
  cursor: pointer;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  padding: 5px;
  height: 60%;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;


const Option = styled.option``;

const ClaseList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  const ref = () => {
    window.location.reload(false)
  }

  var [inputText, setInputText] = useState("");
  const InputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <div style={{display:"flex", marginRight:"10px", alignItems:"center"}}>
      <Title>{cat}</Title>
      <SearchContainer>
        <Input placeholder="Search" style={{outline:"none"}} onChange={InputHandler} />
        <Search style={{ color: "gray", fontSize: 16, cursor: "pointer" }} />
      </SearchContainer>
      </div>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="tipo" onChange={handleFilters}>
            <Option selected disabled>Tipo</Option>
            <Option>individual</Option>
            <Option>grupal</Option>
          </Select>
          <Select name="frecuencia" onChange={handleFilters}>
            <Option selected disabled>Frecuencia</Option>
            <Option>unica</Option>
            <Option>semanal</Option>
            <Option>mensual</Option>
            <Option>anual</Option>
          </Select>
          <Select name="calificacion" onChange={handleFilters}>
            <Option selected disabled>Calificacion</Option>
            <Option>1</Option>
            <Option>2</Option>
            <Option>3</Option>
            <Option>4</Option>
            <Option>5</Option>
          </Select>
          <CachedIcon onClick={()=>ref()}/>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
        
      </FilterContainer>
      <Clases cat={cat} filters={filters} sort={sort} input={inputText}/>
      <Footer />
    </Container>
  );
};

export default ClaseList;