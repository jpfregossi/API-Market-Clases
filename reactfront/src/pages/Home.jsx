import React from 'react'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Clases from '../components/Clases'
import Slider from '../components/Slider'

export default function Home() {


  
  return (
    <div>
        <Announcement></Announcement>
        <Navbar></Navbar>
        <Slider></Slider>
        <Categories></Categories>
        <Clases></Clases>
        <Newsletter></Newsletter>
        <Footer></Footer>
    </div>
  )
}
