import "./menupizza.css";
import axios from "axios";
import Login from './login';
import Home from "./home";
import Checkout from './checkout'
import { useState, useEffect } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function Cart() {
  // const [increment, setIncrement] = useState(1);

  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState([]);

  useEffect(() => {
    let arr = cartItems.map((item) => item.qty || 1);
    setCartItemsCount(arr);
  }, [cartItems]);

  const handleIncrement = (x) => {
    // alert(x);
    const arr = [...cartItemsCount];

    arr[x] = Number(arr[x]) + 1;

    setCartItemsCount(arr);
    // cartItemsCount[0] = 100;
  };
  // const handleDecrement = (x) => {
  //   const arr = [...cartItemsCount];
  //   arr[x] != 1 ? (arr[x] -= 1) : (arr[x] = 1);
  //   setCartItemsCount(arr);
  // };
  const handleDecrement = (x) => {
    const countArr = [...cartItemsCount];
    const itemsArr = [...cartItems];

    if (countArr[x] > 1) {
      countArr[x] -= 1;
      setCartItemsCount(countArr);
    } else {
      // Remove item from cart
      const itemToRemove = itemsArr[x];
      deleteItems(itemToRemove); // Call your existing delete function
      countArr.splice(x, 1);
      itemsArr.splice(x, 1);
      setCartItems(itemsArr);
      setCartItemsCount(countArr);
    }
  };

  // console.log(cartItemsCount);
  // useEffect(()=>{
  //     axios.get('http://localhost/API/cartpage/')
  //     .then((res)=>{
  //         if(Array.isArray(res.data)) {
  //     setCartItems(res.data)
  //     })
  //     .catch((error)=>{
  //         alert.error('error', error);
  //     })
  // },[]);
  const getCartItems = () => {
    const userID = localStorage.getItem('userid');
    axios
      .get(`http://localhost/API/cartpage/?userid=${userID}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCartItems(res.data);
          if(res.data.length>0){
            const pymmode = res.data[0].pymmode;
            console.log(pymmode);
          }
          // alert(res.data.pymmode);
        } else {
          console.warn("Unexpected response:", res.data);
          setCartItems([]);
        }
      })
      .catch((error) => console.error("API error:", error));

  };
  useEffect(() => {
    getCartItems();
  }, []);

  const [totalPP, totalPPP] = useState('');
  const ADD = (item, A, B) => {
    // window.location.reload();
    axios
      .get(
        `http://localhost/API/sendData/index.php?item_id=${item.id}&qty=${A}&total=${B}`)
      .then((res) => {
        // console.log(res);
        if (res.data.totalp) {
          totalPPP(res.data.totalp);
          window.location.reload();
        }
      })
      .catch((error) => {
        alert("error", error);
      });
  };

  const deleteItems = (item) => {
    toast.warning("you remove" + " " + item.name);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    axios
      .get(`http://localhost/API/deletecrtItm/index.php?item_id=${item.id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const [sTotals, sSubTotals] = useState("");
  const [sTotal, sSubTotal] = useState("0");
  const [spPrice, spdPrice] = useState("");
  const [totalPrice, totalSubPrice] = useState("");

  const subTotal = () => {
    const userID = localStorage.getItem('userid');
    axios
      .get(`http://localhost/API/priceCount/?userid=${userID}`)
      .then((res) => {
        sSubTotal(res.data.total);
        sSubTotals(res.data.qtyc);
        spdPrice(res.data.spdprice);
        totalSubPrice(res.data.totalAmt);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    subTotal();
  }, [cartItems]);

  // function checkOut() {
  //   window.location.href = '/checkout';
  // }
  // const [fPrice, fTPrice] = useState({});

  // const fetchPrice=()=>{
  //   axios.get('http://localhost/API/cartpage/')
  //   .then((res)=>{
  //     fTPrice(res.totalp);
  //   })
  //   .catch((error)=>{
  //     console.log(error);
  //   })
  // }
  // fetchPrice();
  return (
    <>
      <div className="carth">
        {
          localStorage.getItem('fname') ? (
            <>
              <div className="place">Items</div>
              {cartItems.map((item, index) => (
                <div key={index} className="cartset">
                  <div className="indexset">
                    <img
                      src={item.image}
                      alt={item.image}
                      style={{ height: "100px", width: "100px" }}
                    />
                    <h2>{item.name}</h2>
                    <div
                      style={{
                        height: "100px",
                        width: "80px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        onClick={() => handleIncrement(index)}
                        style={{ fontSize: "15px", padding: "0px 3px" }}
                      >
                        +
                      </button>
                      <h3>&nbsp;{cartItemsCount[index]}&nbsp;</h3>
                      <button
                        onClick={() => handleDecrement(index)}
                        style={{ fontSize: "15px", padding: "0px 5px" }}
                      >
                        -
                      </button>
                      <br />
                      <button
                        onClick={() => {
                          ADD(item, cartItemsCount[index], item.price);
                        }}
                        style={{
                          padding: "2px 15px",
                          position: "absolute",
                          top: "100px",
                          backgroundColor: "#48ff00",
                          border: "none",
                          border: "2px solid green",
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                      >
                        Add
                      </button>
                    </div>
                    <h3
                      onClick={() => {
                        deleteItems(item);
                      }}
                      style={{
                        position: "absolute",
                        right: "180px",
                        cursor: "pointer",
                        top: "76px",
                      }}
                    >
                      <RiDeleteBin6Line />
                    </h3>
                    <span>
                      &nbsp; Price
                      <h3>
                        <LiaRupeeSignSolid size={13} />
                        {cartItemsCount[index] * item.price}
                      </h3>
                    </span>
                  </div>
                </div>
              ))}
              <div className="ctotal">
                <h1>CART</h1>
                <div className="ctotald">
                  <h2>
                    Sub Total : &nbsp;
                    <LiaRupeeSignSolid size={18} />
                    <span>{sTotal}</span>
                  </h2>
                  <br />
                  <h2>
                    Total Items : &nbsp;
                    {sTotals}
                  </h2>
                  <br />
                  <h2>
                    Shipping Price : &nbsp;
                    <LiaRupeeSignSolid size={18} />
                    {spPrice}
                  </h2>
                  <br />
                  <h2>
                    Total Amount : &nbsp;
                    <LiaRupeeSignSolid size={18} />
                    {totalPrice}
                  </h2>
                  <br />
                  <br />
                  {
                    localStorage.getItem('fname') ?
                      <Link to="/checkout"><button className="btns">checkOut</button></Link>
                      :
                      <Link to="/login"><button className="btns">Please Login</button></Link>
                  }
                </div>
              </div>
            </>
          ) : (
            <div className="nocart">
              <h1 style={{ color: 'white' }}>No! item in this cart</h1>
            </div>
          )
        }
      </div>

      <footer>
        <div className="footer">
          <div id="fh">
            <h3>Developer - Parikshit Singh</h3>
            <h3>E-mail - parikshits563@gmail.com</h3>
            <h3>Location - Ghaziabad(U.P), India</h3>
          </div>
          <div id="last">
            <h3>Copyright © www.foodfaction.com all rights reserved!!!</h3>
          </div>
        </div>
      </footer>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        transition={Bounce}
        theme="dark"
        closeOnClick
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}
export default Cart;
