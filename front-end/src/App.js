import logo from './logo.svg';
import './App.css';
import LoginPage from './Components/LoginPage';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './Components/Cart';
import Login from './Components/Login';
import RegisterUser from './Components/RegisterUser';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <ToastContainer />
    <Routes>
     <Route path='/' element={<Login />} />
     <Route path='/Register' element={<RegisterUser/>} />
     <Route path='/homePage' element={<HomePage />} />
     <Route path='/homePage/Cart' element={<Cart />} />
    </Routes>
    </div>
    
    </Provider>
  );
}

export default App;
