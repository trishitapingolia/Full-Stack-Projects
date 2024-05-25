import React,{lazy} from 'react'
import { BrowserRouter as Router, Routes , Route, BrowserRouter } from 'react-router-dom'

const Home = lazy(()=>import("./pages/Home"))
const Chat = lazy(()=>import("./pages/Chat"))
const Groups = lazy(()=>import("./pages/Groups"))
const Login = lazy(()=>import("./pages/Login"))

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/chat/:chatId' element={<Chat />}/>
        <Route path='/groups/:groupId' element={<Groups />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App