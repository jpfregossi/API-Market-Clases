import { useDispatch, useSelector } from "react-redux";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import { useEffect ,useState} from "react";
import { publicRequest } from "../requestMethods";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import ReactStars from 'react-stars';
import { addComment} from "../redux/apiCalls";
import { Link } from "react-router-dom";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Container = styled.div `
  display: flex;
  flex-direction: column;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin: 1% 1%;
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

//comentarios

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
  ${mobile({ display: "block" })};
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
  background-color: #d8c1aa;
  
  
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

const LinkStyle = styled.a`
  text-decoration: none;
  margin: 5px 0px;
  font-size: 16px;
  cursor: pointer;
`;

export default function Orders({ orders }) {

  const location = useLocation();
  
  const currentUser = useSelector((state)=>state.user.currentUser);
  const comments = useSelector((state)=>state.commentsratings.commentsratings)
  const err = useSelector((state)=>state.commentsratings.error)

  const dispatch = useDispatch()

  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [text2, setText2] = useState("");



  const ratingChanged = (newRating) => {
    setRating(newRating)
  }


  const handleClick = (id, username) => {
    addComment(dispatch, id, username, rating, text, currentUser.accessToken);
  }

  return (
    <>  
        <Announcement/>
        <Navbar/>
        <Container>
          <Bar>
            <span style={{flex:1}}>Clases</span>
            <span style={{flex:1}}>Precio</span>
            <span style={{flex:1}}>Direccion</span>
            <span style={{flex:1}}>Profesor</span>
            <span style={{flex:1}}>Status</span>
          </Bar>
          <div>
            {orders.map((order) => {
                let op = order.products
                return (
                <>
                  <hr />
                  <Bar2>
                    
                    <span style={{flex:1}}>{(() => {
                      const options = [];
                      for (let i=0; i < op.length; i++) {
                        options.push(<span style={{flex:1}}>{op[i].quantity} x {op[i].productId} <br/></span>);
                      }
                      return options;
                    })()}</span>
                    <span style={{flex:1}}>$ {order.amount}</span>
                    <span style={{flex:1}}>{order.address.country}, {order.address.city}, {order.address.line1}, {order.address.postal_code}</span>
                    <span style={{flex:1}}>{order.contrataciones[0].teacher_id}</span>
                    <span style={{flex:1}}>{order.contrataciones[0].estado}</span>
                  </Bar2>
    
                
                  <div>
                    {(order.contrataciones[0].estado === "ACEPTADA") && (
                      <Bar2>
                        <div hidden={order.status!=="pending"}>
                            <CommentContainer>
                              {<h2 style={{padding:" "}}>Comentarios</h2>}
                                {(order.contrataciones[0].feedback.message === "") && (
                                  <Duo>
                                    <input type="text" placeholder="Ingrese un comentario breve" style={{ outline:"1", width:"50%", marginLeft:"2%"}} onChange={(e) => setText(e.target.value)}/>
                                      <div style={{width:"50%", display:"flex", justifyContent:"right", alignItems:"center"}}>
                                        <ReactStars count={5} size={24} color2={'yellow'} value={rating} onChange={ratingChanged}/>
                                        <button style={{ border:"none", backgroundColor:"transparent", padding:"10px", cursor:"pointer", fontWeight:"600"}} onClick={()=>handleClick(order.contrataciones[0].clase_id, currentUser.username)}><Link to="/profile"><LinkStyle>Dejar Comentario</LinkStyle></Link></button>
                                        {err && <span style={{color:"red"}}>Ocurrio un error !</span>}
                                      </div>        
                                  </Duo>)}

                                  {(order.contrataciones[0].feedback.message === "" ) || ( 
                                  <Cwrapper>
                                    <Duo2>
                                      <AccountCircleIcon style={{color:"teal"}}/>
                                      <div style={{marginLeft:"5px"}}>{currentUser.username}</div>
                                        <Duo3 id="starscontainer">
                                          <span style={{marginTop:"5px", marginRight:"5px"}}>({order.contrataciones[0].feedback.rating})</span>
                                          <ReactStars count={5} size={24} value={order.contrataciones[0].feedback.rating} color2={'#008080'} edit={false}/>                     
                                        </Duo3>
                                    </Duo2>
                                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                      <span id="comment" style={{maxWidth:"600px", minWidth:"600px", wordWrap: "break-word", border:"none", padding:"10px", borderRadius:"12px", outline:"none", resize:"none"}}
                                      >{order.contrataciones[0].feedback.message}</span>
                                    </div>
                                  </Cwrapper>)}

                            </CommentContainer>
                          </div>
                      </Bar2>)} 
                  </div>
                </>
                )               
            })}
          </div>
        </Container>
      </>
  )
}



