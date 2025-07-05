import { Outlet } from 'react-router'
import './App.css'
import Banner from './components/module/banner/Banner'
import Footer from './components/module/footer/Footer'
import Header from './components/module/header/Header'
import { Toaster } from './components/ui/sonner'

function App() {

  return (
    <>
      <Header/>
      <Banner/>
      <Outlet/>
      <Toaster expand={true}/>
      <Footer/>
    </>
  )
}

export default App
