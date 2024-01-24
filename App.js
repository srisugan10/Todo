import { BrowserRouter,Route, Routes } from 'react-router-dom';
import './App.css';
import Next from './component/Next';
import Login from './component/Login';
import Home from './component/Home';
import Client from './component/Client';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  let username=sessionStorage.getItem("username")
  
  return (
        <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/submit' element={<Home/>} />
            <Route path='/home' element={<Home username={username}/>}/>
            <Route path='/client' element={<Client/>}/>
            <Route path='/next' element={<Next/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;