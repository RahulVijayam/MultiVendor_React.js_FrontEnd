import React, { useEffect, useState } from 'react'
import { NavBar } from '../components/NavBar'
import SideBar from '../components/SideBar'
import { Login } from '../components/forms/Login'
import { Register } from '../components/forms/Register'
import { AddFirm } from '../components/forms/AddFirm'
import { AddProduct } from '../components/forms/AddProduct'
import { Welcome } from '../components/Welcome'
import AllProducts from '../components/AllProducts'


export const LandingPage = () => {

  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showFirm,setShowFirm]=useState(false)
  const [showProduct,setShowProduct]=useState(false)
  const [showWelcome,setShowWelcome]=useState(true)
  const [showAllProducts,setShowAllProducts]=useState(false)
  const [showLogout,setShowLogout]=useState(false)
  const [showAddFirmLink,setShowAddFirmLink]=useState(false)
  

  useEffect(()=>{
    const firmId  = localStorage.getItem('firmId')
    if(firmId){
      setShowAddFirmLink(false);
    }
    else{
      setShowAddFirmLink(true)
    }
  },[])
  
  

  useEffect(()=>{
    const loginToken  = localStorage.getItem('loginToken')
    if(loginToken){
      setShowLogout(true);
    }
    else{
      setShowLogout(false)
    }
  },[])
  
const logOutHandler = () =>{
  localStorage.removeItem('loginToken');
  localStorage.removeItem('firmId');
  setShowLogout(false);
  setShowAddFirmLink(true);
}

  const showRegisterHandler = () => {
    setShowRegister(true)
    setShowLogin(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }
  
  const showLoginHandler = () => {
    setShowLogin(true)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }
  const showFirmHandler = () => {
    if(showLogout){
    setShowFirm(true)
    setShowLogin(false)
    setShowRegister(false)
    setShowProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
    }
    else{
      window.alert("Please Login to Add Firm")
      setShowLogin(true);
      setShowRegister(false)
      
    }
  }
  const showProductHandler = () => {
    if(showLogout){
    setShowProduct(true)
    setShowFirm(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowWelcome(false)
    setShowAllProducts(false)
    }
    else{
      window.alert("Please Login to Add Firm")
      setShowLogin(true);
      setShowRegister(false)
    }
  }
  const showWelcomeHandler = () => {
    setShowWelcome(true)
    setShowProduct(false)
    setShowFirm(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowAllProducts(false)
  }

  const showAllProductsHandler = () =>{
    if(showLogout){
    setShowAllProducts(true)
    setShowWelcome(false)
    setShowProduct(false)
    setShowFirm(false)
    setShowLogin(false)
    setShowRegister(false)
    }
    else{
      window.alert("Please Login to Add Firm")
      setShowLogin(true);
      setShowRegister(false)
      
    }
  }
  return (
    <>
      <section className='landingSection'>
        <NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogout={showLogout} logOutHandler={logOutHandler} />
        <div className='collectionSection'>
          <SideBar showFirmHandler={showFirmHandler} showProductHandler = {showProductHandler} showAllProducts={showAllProductsHandler} showAddFirmLink={showAddFirmLink}/>
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} showLogout={showLogout}/>}
          {showRegister && <Register showLoginHandler={showLoginHandler}/>}
          {showFirm && showLogout && <AddFirm/>}
          {showProduct && showLogout &&  <AddProduct/>}
          {showWelcome && <Welcome showLogout={showLogout} />}
          {showAllProducts && showLogout &&  <AllProducts />}


        </div>

      </section>
    </>
  )
}