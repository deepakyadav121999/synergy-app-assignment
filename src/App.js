import React from 'react'
import UserList from './UserList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserDetail from './UserDetail'
const App = () => {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element ={ <UserList/>} />
      <Route path='/user/:id' element = {<UserDetail/>}/>
     </Routes>
       
    </BrowserRouter>
  )
}

export default App