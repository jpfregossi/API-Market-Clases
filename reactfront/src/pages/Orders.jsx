import { useDispatch, useSelector } from "react-redux";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import { useEffect ,useState} from "react";
import { getUserOrders } from "../redux/apiCalls";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import ReactStars from 'react-stars';
import { addComment, deleteComment, updateComment, setEditMode } from "../redux/apiCalls";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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





const Orders = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const userOrders = useSelector((state) => state.user.orders)
  const userId = useSelector((state)=>state.user.currentUser._id)
  const usr = useSelector((state)=>state.user.currentUser?  state.user.currentUser.username : "")
  const currentUser = useSelector((state)=>state.user.currentUser)


  const admin = useSelector((state)=>state.user.currentUser? state.user.currentUser.isAdmin : false)
  const comments = useSelector((state)=>state.commentsratings.commentsratings)
  const edtmode = useSelector((state)=>state.commentsratings.editmode)
  const err = useSelector((state)=>state.commentsratings.error)

  const dispatch = useDispatch()

  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [text2, setText2] = useState("");
  const [rating2, setRating2] = useState(0);

 

  const [editId, setEditId] = useState("");
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(0);

  const handleEdit = (d, t, r) => {
    setEditId(d)
    setEditText(t)
    setEditRating(r)
    setEditMode(dispatch)
  }

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

  const ratingChanged = (newRating) => {
    setRating(newRating)
  }

  const ratingChanged2 = (newRating2) => {
    setRating2(newRating2)
  }
  const handleClick4 = () => {
    addComment(dispatch, id, rating, text, currentUser.accessToken )
  }

  const handleClick5 = () => {
    console.log()
    console.log("crear funcion updateOrder en apiCall")
  }


  const handleDelete = (commentid) => {
    deleteComment(dispatch, commentid)
  }

  const totalCalcul = () => {
    let rslt = 0;
    for (let i=0; i < comments.length; i++) {
      rslt += comments[i].rating
    }
    return rslt / comments.length
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
            <span style={{flex:1}}>Status</span>
          </Bar>
          <div>
            {userOrders.map((order) => {
              for (let i=0; i < userOrders.length; i++) {
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
                    <span style={{flex:1}}>{order.status} <h5 style={{color:"red", cursor: "pointer"}} onClick={()=>handleClick5(order)}>cancelar</h5></span>
                  </Bar2>
                  <Bar2>
          <div hidden={order.status!=="pending"}>
          <CommentContainer>
          <h2 style={{padding:" "}}>Comentarios</h2>
          <Duo>
            <input type="text" placeholder="Ingrese un comentario breve" style={{ outline:"1", width:"50%", marginLeft:"2%"}} onChange={(e) => setText(e.target.value)}/>
            <div style={{width:"50%", display:"flex", justifyContent:"right", alignItems:"center"}}>
              <ReactStars count={5} size={24} color2={'yellow'} value={rating} onChange={ratingChanged}/>
              <button style={{ border:"none", backgroundColor:"transparent", padding:"10px", cursor:"pointer", fontWeight:"600"}} onClick={()=>handleClick4()}>Danos tu Opinion</button>
              {err && <span style={{color:"teal"}}>Campo Vacio !</span>}
            </div>        
          </Duo>
          {edtmode &&
          <Duo style={{marginTop:"12px"}}>
            <input type="text" style={{border:"none", outline:"0", width:"65%", marginLeft:"2%"}} onChange={(e) => setText2(e.target.value)}/>
            <div style={{width:"fit-content", display:"flex", justifyContent:"right", alignItems:"center"}}>
              <ReactStars count={5} size={24} color2={'#008080'} value={rating2} onChange={ratingChanged2}/>
              <DoneIcon style={{color:"teal", cursor:"pointer", marginTop:"1px", marginLeft:"3px"}} onClick={()=>handleEdit2(editId, editText, editRating)}/>
            </div>
          </Duo>
          
          }
          
          {comments.map((comment)=>(
            <Cwrapper>
              <Duo2>
                <AccountCircleIcon style={{color:"teal"}}/>
                <div style={{marginLeft:"5px"}}>{comment.username}</div>
                <Duo3 id="starscontainer">
                <span style={{marginTop:"5px", marginRight:"5px"}}>({comment.rating})</span>
                <ReactStars count={5} size={24} value={comment.rating} color2={'#008080'} edit={false}/>
                  
                </Duo3>
              </Duo2>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <span id="comment" style={{maxWidth:"600px", minWidth:"600px", wordWrap: "break-word", border:"none", padding:"10px", borderRadius:"12px", outline:"none", resize:"none"}} onChange={(e) => setText2(e.target.value)} >{comment.message}</span>
                {admin ? 
                <div style={{cursor:"pointer"}} id="iconcontainer">
                  <EditIcon style={{color:"teal"}} onClick={()=>handleEdit(comment._id, comment.message, comment.rating)}/>
                  <DeleteOutlineIcon style={{color:"red"}} onClick={()=>handleDelete(comment._id)}/>
                </div>
                : usr === comment.username ?
                <div style={{cursor:"pointer"}} id="iconcontainer">
                  <EditIcon style={{color:"teal"}} onClick={()=>handleEdit(comment._id, comment.message, comment.rating)}/>
                  <DeleteOutlineIcon style={{color:"red"}} onClick={()=>handleDelete(comment._id)}/>
                </div>
                : <></>
                }
              </div>
            </Cwrapper>
          ))}
        </CommentContainer>
        </div>
                  </Bar2>
                </>
                )
              }
            })}
          </div>
        </Container>
    </>
  );

};

export default Orders;