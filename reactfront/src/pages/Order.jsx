import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Orders from '../components/Orders';
import { getUserOrders } from "../redux/apiCalls";

export default function Order() {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user.currentUser);
  const orders = useSelector((state)=>state.user.orders);
  const token = useSelector((state)=>state.user.currentUser.accessToken);

  useEffect(() => {
    getUserOrders(dispatch, user._id);
  }, [dispatch]);

  return (
    <div>
        { orders && <Orders orders={orders}></Orders> }
    </div>
  )
}