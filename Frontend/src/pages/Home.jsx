import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  const [loggedInUser,setloggedInUser] = useState('');
  const [products,setProduct] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    setloggedInUser(localStorage.getItem('loggedInUser'))
  },[])

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('logged out successfully');
    setTimeout(()=>{
      navigate('/login');
    },[1000]);
  }

  const fetchProducts = async ()=>{
    try{
      const url = 'http://localhost:8080/products';
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }
      const response = await fetch(url,headers);
      const result = await response.json();
      setProduct(result);
    }catch(err){
      handleError(err);
    }
  }
  useEffect(()=>{
    fetchProducts();
  },[]);
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1>{loggedInUser}</h1>
      <button
            onClick={handleLogout}
            className="w-max bg-purple-800 text-white py-1 px-2 rounded-md hover:bg-purple-900 transition-all"
          >
            Log Out
      </button>
      {products &&  products?.map((item,index)=>(
        <ul>
          <span key={index}>{item.name} : {item.price}</span>
        </ul>
      ))}
      <ToastContainer/>
    </div>
  )
}

export default Home