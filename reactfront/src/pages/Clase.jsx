import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import ReactStars from 'react-stars';
import { addComment, deleteComment, updateComment, setEditMode } from "../redux/apiCalls";
import { getCommentsratings } from "../redux/apiCalls";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
  
`;

const ImgContainer = styled.div`
  flex: 2;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  margin-top: 12%;
  padding: 50px;
  height: fit-content;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 1.0);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 1.0);
  border-radius: 12px;
  ${mobile({ padding: "10px" })}
`;

const CommentContainer = styled.div`
  flex: 2;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
  margin-left: 20px;
  
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  border: 1px solid black;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const Duo = styled.div`
  display: flex;
  flex-direction: row;
    
  align-items: center;
  width: 100%;
  border-radius: 12px;
  padding: 10px 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 1.0);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 1.0);
  margin-top:10px;
`;

const Cwrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  padding: 20px;
  border-radius: 12px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 1.0);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 1.0);
  
`;

const Duo2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const Duo3 = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  flex: 1;
  min-width: 30%;
  margin: 10px 0;
  padding: 5px;
`;
const Input2 = styled.textarea`
  flex: 1;
  width: 100%;
  height: 100%;
`;


const Product = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [horario, setHorario] = useState("");
  const [contacto, setContacto] = useState("");
  const [mensaje, setMensaje] = useState("");

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.products);

  

  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  
  const usr = useSelector((state)=>state.user.currentUser?  state.user.currentUser.username : "")
  const currentUser = useSelector((state)=>state.user.currentUser)
  const admin = useSelector((state)=>state.user.currentUser? state.user.currentUser.isAdmin : false)

  const comments = useSelector((state)=>state.commentsratings.commentsratings)


  const ratingChanged = (newRating) => {
    setRating(newRating)
  }

  const ratingChanged2 = (newRating2) => {
    setRating2(newRating2)
  }
  const handleClick4 = () => {
    addComment(dispatch, id, rating, text, currentUser.accessToken )
  }

  const totalCalcul = () => {
    let rslt = 0;
    for (let i=0; i < comments.length; i++) {
      rslt += comments[i].rating
    }
    return rslt / comments.length
  }

  let totalrating = totalCalcul()

  const [editId, setEditId] = useState("");
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(0);

  const handleEdit = (d, t, r) => {
    setEditId(d)
    setEditText(t)
    setEditRating(r)
    setEditMode(dispatch)
  }

  const [text2, setText2] = useState("")
  const [rating2, setRating2] = useState(0)

  const handleEdit2 = (commentid, text, rating) => {

    let txt = "";
    let rt = 0;

    if (text2 === text || text2 === "") {
      txt = text
    } else { txt = text2 }
    if (rating2 === rating || rating2 === 0) {
      rt = rating
    } else { rt = rating2 }

    updateComment(dispatch, commentid, txt, rt)

  }

  

  useEffect(() => {
    getCommentsratings(dispatch, id);
  }, [dispatch]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/clases/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = (clr, sz) => {
    dispatch(
      addProduct({ ...product, quantity, clr, sz, horario, contacto, mensaje})
    );
  };

  const checkIfExist = () => {
    let crt = false;
    for (let i=0; i < cart.length; i++) {
      if (product.title === cart[i].title) {
        crt = true 
      } else {crt = false}
    }
    return crt;
  }



  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <div style={{display:'flex', justifyContent:'space-between'}}>
          <div>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          
          </div>
          <div>
            
          <Price>$ {product.price}</Price>
          <ReactStars count={5} size={24} value={totalrating} color2={'#008080'} edit={false}/>
          </div>
          </div>

          <Desc>Profesor ID: {product.teacher_id}</Desc>
          <FilterContainer>  
          <Filter>
              <FilterTitle>Tipo</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.tipo?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
            <Filter>
              <FilterTitle>frecuencia</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.frecuencia?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          Horario: <Input placeholder="Ej: 9 PM" onChange={(e) => setHorario(e.target.value)}></Input>
          <br></br>
          Contacto: <Input placeholder="Ej: 116987654" onChange={(e) => setContacto(e.target.value)}></Input>
          <br></br>
          <div>
            <h5>Ingrese un mensaje para el profesor:</h5>
            <Input2 placeholder="Ej: Estoy disponible despues del mediodia" onChange={(e) => setMensaje(e.target.value)}></Input2>
          </div>
          <AddContainer>
            <FilterTitle>Duracion: {product.duracion}hs</FilterTitle>
            <div style={{display:'flex', alignItems:"center"}}>
              {product.inStock ? checkIfExist() ? <Button >Ya esta en el carrito!</Button> : <Button onClick={()=>handleClick(product.color, product.size) }>Agregar al Carrito</Button> : <Button style={{}}>OUT OF STOCK</Button> }   
            </div>
          </AddContainer>
        </InfoContainer>

        <CommentContainer>
          <h2 style={{color:"teal", padding:" "}}>Comentarios</h2>
          {comments.map((comment)=>(
            <div>
            {(comment.state === "PENDIENTE") && (
              <Cwrapper>
              <Duo2>
                <AccountCircleIcon style={{color:"teal"}}/>
                <div style={{marginLeft:"5px"}}>{console.log()}</div>
                <Duo3 id="starscontainer">
                <span style={{marginTop:"5px", marginRight:"5px"}}>({comment.rating})</span>
                <ReactStars count={5} size={24} value={comment.rating} color2={'#008080'} edit={false}/>
                  
                </Duo3>
              </Duo2>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <span id="comment" style={{maxWidth:"600px", minWidth:"600px", wordWrap: "break-word", border:"none", padding:"10px", borderRadius:"12px", outline:"none", resize:"none"}} onChange={(e) => setText2(e.target.value)} >{comment.message}</span>
              </div>
            </Cwrapper>
            )}
            </div>
          )
          )}
        </CommentContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;