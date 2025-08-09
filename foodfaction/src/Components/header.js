
import './header.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './home';
import Menupizza from './menupizza';
import Contact from './contact';
import Login from './login';
import Profile from './Profile';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Loginuser from './loginuser';
import Loginadmin from './loginadmin';
import Menuburger from './menuburger';
import Menucake from './menucake';
import Checkout from './checkout';
import Cart from './cart';
import { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import { RiFontFamily } from 'react-icons/ri';  
import { history } from 'react';
import { useNavigate } from 'react-router-dom';

// import "/node_modules/bootstrap/dist/css/bootstrap.min.css"
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 1,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

function Header() {

  localStorage.getItem('fname');
  function logOut() {
    localStorage.clear();
    window.location.href = '/';
  }

  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    //   axios.get(`http://localhost/API/sendData/index.php?item_id`)
    // .then((res)=>{
    //   const msg = res.data.message;
    //   if(msg === "item already in cart"){
    //     setCartCount(prev => prev);
    //   } else {
    //       setCartCount(prev => prev + 1);
    //   }
    setCartCount(prev => prev + 1);

  };



  useEffect(() => {
    const userID = localStorage.getItem('userid');
    axios.get(`http://localhost/API/cart/?userid=${userID}`)
      .then((res) => {
        setCartCount(res.data);
      })
      .catch((error) => {
        console.log('error', error);
      })

  }, [])

  // const [token, setToken] = useState('');
  // useEffect(() => {
  //   const namedata = localStorage.getItem('fname');
  //   setToken(namedata);
  // }, []);

  return (
    <Router>
      {/* <nav className="navbar navbar-expand-lg" id='navbar'>
        <div className="container-fluid">
          <div className='navbar-brand' id='logo'><h1 style={{paddingTop: '10px'}}>Food Faction🧑‍🍳</h1></div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav" id='ulset'>
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/menupizza" className="nav-link">Menu</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">Contact</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link">
                  <IconButton aria-label="cart" style={{ color: '#76ff03' }}>
                    <StyledBadge badgeContent={cartCount} color="danger">
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </IconButton>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}

      <nav className="navbar">
        <div className="navdiv">
          <div id="logo"><h1>Food Faction🧑‍🍳</h1></div>
          {/* <h1 style={{ color: ' #76ff03', top: '32px', left: '100px', position: 'relative', fontFamily: 'cursive' }}>Hii {token}</h1> */}
          <div className="mset">
            <ul className="liset">
              <Link to="/" className="change" id="home">Home</Link>
              <Link to="/menupizza" className="change" id="menu">Menu</Link>
              <Link to="/contact" className="change" id="contact">Contact</Link>
              {
                localStorage.getItem('fname') ?

                  <>
                    <Link to="/" onClick={logOut} className="change" id="login">Logout</Link>
                    {/* <Link to="/cart"><IconButton aria-label="cart" style={{ color: ' #76ff03' }}>
                      <StyledBadge badgeContent={cartCount} color="danger">
                        <ShoppingCartIcon />
                      </StyledBadge>
                    </IconButton>
                    </Link>  */}
                  </>
                  :
                  <>
                    <Link to="/login" className="change" id="login">Login</Link>

                  </>
              }
              <Link to="/cart"><IconButton aria-label="cart" style={{ color: ' #76ff03' }}>
                <StyledBadge badgeContent={cartCount} color="danger">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
              </Link>
              <Link to="/Profile"><CgProfile size={35} style={{ color: " #76ff03", marginTop: '6px', position: 'relative' }} /></Link>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menupizza" element={<Menupizza addToCart={addToCart} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/loginuser" element={<Loginuser />} /> */}
        <Route path="/loginadmin" element={<Loginadmin />} />
        <Route path="/Menuburger" element={<Menuburger addToCart={addToCart} />} />
        <Route path="/Menucake" element={<Menucake addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout/>} />
      </Routes>
    </Router>
  )
}

export default Header