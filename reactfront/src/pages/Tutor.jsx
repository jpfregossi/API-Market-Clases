import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import { getTutorClases } from "../redux/apiCalls";

export default function Tutor() {
  const dispatch = useDispatch();
  const clases = useSelector((state)=>state.tutor.clases);
  const token = useSelector((state)=>state.user.currentUser.accessToken);

  useEffect(() => {
    getTutorClases(dispatch, token);
  }, [dispatch]);

  return (
    <div>
        <Navbar></Navbar>
            { clases && <Dashboard clases={clases}></Dashboard> }
        <Footer></Footer>
    </div>
  )
}
