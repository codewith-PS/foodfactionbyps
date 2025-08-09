import React, { useEffect, useState } from "react";
import "./menupizza.css";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Routes, Route, Link } from "react-router-dom";
import Menuburger from "./menuburger";
import Menucake from "./menucake";
import Menupizza from "./menupizza";
import { Bounce, ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Login from './login'

export default function MenuPizza() {
  // const cart=(e)=>{
  //   alert();
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/api/second", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         setItems(data.data);
  //         // console.log("Data:", data.data[0].itme_name);
  //       } else {
  //         console.log("Error:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.log("Fetch error:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // const [d,setd]=useState([]);

  // useEffect(() => {
  //   async function fetchItems() {
  // //     const formData = new FormData();

  // // formData.append("c", "pizza");
  // // formData.append("t", "items");
  //     try {
  //       const response =await fetch("http://localhost/API/recieveData/", {
  //         method: "POST",
  //         // body: formData,
  //       });

  //       // let d=JSON.parse(response);
  //       const d= await response.json();

  //       setItems(d);
  //       // setItems(response.data.data);
  //     } catch (error) {
  //       console.log( error);
  //     }
  //   }
  //   fetchItems();
  // }, []);

  const [items, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost/API/recieveData/")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost/API/cart/")
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  // const [userID, setUserId] = useState('');

  // useEffect(() => {
  //   const user = localStorage.getItem('userid');
  //   setUserId(user);
  // }, []);
  const notify = (item) => {
    const userId = localStorage.getItem('userid');
    if (!userId || userId === 'null') {
      toast.warn("Please log in to add items to your cart...", {
        position: "top-center",
        autoClose: "2000",
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);

      return;
    } else {
      // toast.success("Add to cart");
      axios
        .get(`http://localhost/API/cartCount/index.php?item_id=${item.id}&qty=1&totalp=${item.price}&userid=${userId}`)
        .then((res) => {
          const msg = res.data.message;
          if (msg === "item already in cart") {
            toast.warning("item already in cart");
          } else {
            toast.success("Add to cart");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
      //     if (addToCart) {
      //   addToCart();
      // }
      // alert(`Item ID: ${item.id}, Name: ${item.name}, Price: ${item.price}`);
    };
  }


  return (
    <>
      <section className="section">
        <div className="topdiv">
          <Link to="/menupizza" className="aset">
            Pizza
          </Link>
          <Link to="/menuburger" className="aset">
            Burger
          </Link>
          <Link to="/menucake" className="aset">
            Cake
          </Link>
        </div>
        <div className="itemdiv">
          {items.map((item) => (
            <div key={item.id} className="productcard1">
              <img
                src={item.image}
                style={{
                  borderRadius: "10px",
                  height: "200px",
                  width: "200px",
                }}
              />
              <h3>{item.name}</h3>
              <h4>
                <LiaRupeeSignSolid size={13} />
                {item.price}
              </h4>
              <button
                className="glow-on-hover"
                type="button"
                onClick={() => {
                  notify(item);
                }}
              >
                Add to cart
              </button>
            </div>
          ))}
          ;
        </div>
        {/* <div className="productcard1">
            <img
              src="images/paneer-pizza.jpg"
              style={{ borderRadius: "10px", height: "200px", width: "200px" }}
            />
            <h3>Paneer Pizza</h3>
            <h4>
              <LiaRupeeSignSolid size={13} />
              250
            </h4>
            <button className="glow-on-hover" type="button" onClick={notify}>
              Add to cart
            </button>
          </div>
          <div className="productcard1">
            <img
              src="images/semi pizza.avif"
              style={{ borderRadius: "10px", height: "200px", width: "200px" }}
            />
            <h3>Semi-Pizza</h3>
            <h4>
              <LiaRupeeSignSolid size={13} />
              180
            </h4>
            <button className="glow-on-hover" type="button" onClick={notify}>
              Add to cart
            </button>
          </div>
          <div className="productcard1">
            <img
              src="images/khao veg pizza.jpg"
              style={{ borderRadius: "10px", height: "200px", width: "200px" }}
            />
            <h3>Khao Veg Pizza</h3>
            <h4>
              <LiaRupeeSignSolid size={13} />
              169
            </h4>
            <button className="glow-on-hover" type="button" onClick={notify}>
              Add to cart
            </button>
          </div>
          <div className="productcard1">
            <img
              src="images/paneer-makhani-pizza.jpg"
              style={{ borderRadius: "10px", height: "200px", width: "200px" }}
            />
            <h3>Makhani Paneer</h3>
            <h4>
              <LiaRupeeSignSolid size={13} />
              190
            </h4>
            <button className="glow-on-hover" type="button" onClick={notify}>
              Add to cart
            </button>
          </div>
          <div className="productcard1">
            <img
              src="images/corn pizza.png"
              style={{ borderRadius: "10px", height: "200px", width: "200px" }}
            />
            <h3>Corn Pizza</h3>
            <h4>
              <LiaRupeeSignSolid size={13} />
              109
            </h4>
            <button className="glow-on-hover" type="button" onClick={notify}>
              Add to cart
            </button>
          </div>
          <div className="productcard1">
            <img
              src="images/spicy pizza.jpg"
              style={{ borderRadius: "10px", height: "200px", width: "200px" }}
            />
            <h3>Spicy pizza</h3>
            <h4>
              <LiaRupeeSignSolid size={13} />
              120
            </h4>
            <button className="glow-on-hover" type="button" onClick={notify}>
              Add to cart
            </button>
          </div>
          <div className="productcard1">
            <img
              src="images/delight-passion-pizza-500x500.webp"
              style={{ borderRadius: "10px", height: "200px", width: "200px" }}
            />
            <h3>Delight Pizza</h3>
            <h4>
              <LiaRupeeSignSolid size={13} />
              155
            </h4>
            <button className="glow-on-hover" type="button" onClick={notify}>
              Add to cart
            </button>
          </div>
          <div className="productcard1">
            <img
              src="images/Veggie_Pizza_Recipe-1.jpg"
              style={{ borderRadius: "10px", height: "200px", width: "200px" }}
            />
            <h3>Veggie Crunch</h3>
            <h4>
              <LiaRupeeSignSolid size={13} />
              189
            </h4>
            <button className="glow-on-hover" type="button" onClick={notify}>
              Add to cart
            </button>
          </div>
          <div className="productcard1">
            <img
              src="images/pizza-margherita-recipe.jpg"
              style={{ borderRadius: "10px", height: "200px", width: "200px" }}
            />
            <h3>Margherita Pizza</h3>
            <h4>
              <LiaRupeeSignSolid size={13} />
              99
            </h4>
            <button className="glow-on-hover" type="button" onClick={notify}>
              Add to cart
            </button>
          </div> */}
      </section>
      <footer>
        <div className="footer">
          <div id="fh">
            <h3>Developer - Parikshit Singh</h3>
            <h3>E-mail- parikshits563@gmail.com</h3>
            <h3>Location- Ghaziabad(U.P), India</h3>
          </div>
          <div id="last">
            <h3>Copyright © www.foodfaction.com all rights are reserved!!!</h3>
          </div>
        </div>
      </footer>
      <Routes>
        <Route path="/menupizza" element={<Menupizza />} />
        <Route path="/menuburger" element={<Menuburger />} />
        <Route path="/menucake" element={<Menucake />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        transition={Bounce}
        theme="dark"
        closeOnClick
      />
    </>
  );
}
