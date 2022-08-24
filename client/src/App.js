import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./components/login/login"
import Register from './components/register/register';
import Mainpage from './components/alltable/mainpage';
import Createone from './components/alltable/createone';
import Protected from './components/protected';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>} ></Route>
        <Route path='/mainpage' element={<Protected><Mainpage/></Protected>} ></Route>
        <Route path='/create' element={<Protected><Createone/></Protected>} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;