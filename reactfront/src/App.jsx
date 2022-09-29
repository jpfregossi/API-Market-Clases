import Home from './pages/Home';
import Clase from './pages/Clase';
import ClaseList from './pages/ClaseList';
import Cart from './pages/Cart';
import Success from './pages/Success';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from "./pages/Profile";
import Security from "./pages/Security";
import Orders from "./pages/Orders";
import Tutor from "./pages/Tutor";

import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { useSelector } from 'react-redux';



function App() {
  const user = useSelector(state=>state.user.currentUser)
  const confirmedPass = useSelector((state) => state.user.confirmedPassword);

  console.log("Usuario: ", user);
  return (
     <Router>
      <Routes>
        <Route exact path="/" element={(user && user.role === "profesor") ? <Tutor /> : <Home/> }></Route>
        <Route path="/clases/:category" element={<ClaseList/>}></Route>
        <Route path="/clase/:id" element={<Clase/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/success" element={<Success/>}></Route>

        <Route path="/login" element={user ? <Navigate to="/" />: <Login/>}></Route>
        <Route path="/register" element={user ? <Navigate to="/" />: <Register/>}></Route>
        <Route path="/logout" element={user ? <Navigate to="/" />: <Register/>}></Route>
        <Route exact path="/profile" element={user ? <Profile /> : <Login/> }></Route>
        <Route path="/profile/securitysettings" element={user ? <Security /> : <Login/> }></Route>
        <Route path="/profile/orders" element={user ? <Orders /> : <Login/> }></Route>
        <Route path="/tutor" element={user && user.role === "profesor" ? <Tutor /> : <Login/> }></Route>
      </Routes>
     </Router>
  );
}

export default App;
