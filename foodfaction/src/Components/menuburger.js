import { useEffect, useState } from "react";
import "./menupizza.css";
import { BrowserRouter as router, Routes, Route, Link } from "react-router-dom";
import { LiaRupeeSignSolid } from "react-icons/lia";
import Menucake from "./menucake";
import Menupizza from "./menupizza";
import Menuburger from "./menuburger";
import { Bounce, ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function MenuBurger() {
  const [loading, setLoading] = useState(false);
  const [items, setCategory] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost/API/burger/")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((error) => {
        alert.error("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const notify = (item) => {
    const userId = localStorage.getItem('userid');
    if (!userId || userId === 'null') {
      alert("Please log in to add items to your cart...");
      window.location.href = "/login";
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
      //    if (addToCart) {
      //   addToCart();
      // }
      // alert(`Item ID: ${item.id}, Name: ${item.name}, Price: ${item.price}`);
      };
    }

  return (
    <>
      <section class="section">
        <div class="topdiv">
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
        <div class="itemdiv">
          {loading ? (
            <p>loading...</p>
          ) : (
            items.map((item) => (
              <div key={item.id} class="productcard1">
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
                  class="glow-on-hover"
                  type="button"
                  onClick={() => notify(item)}
                >
                  Add to cart
                </button>
              </div>
            ))
          )}
          ;
          {/* <div class="productcard1">
          <img src="veg classic brg.webp" style={{borderRadius: "10px", height:"200px", width:"200px"}}/>
          <h3>Veggie Classic</h3>
          <h4><LiaRupeeSignSolid size={13}/>89</h4>
          <button class="glow-on-hover" type="button" onClick={notify}>Add to cart</button>
        </div>
        <div class="productcard1">
          <img src="burst burger.jpeg" style={{borderRadius: "10px", height:"200px", width:"200px"}}/>
          <h3>Burst Burger</h3>
          <h4><LiaRupeeSignSolid size={13}/>69</h4>
          <button class="glow-on-hover" type="button" onClick={notify}>Add to cart</button>
        </div>
        <div class="productcard1">
          <img src="supreme veg.jpg" style={{borderRadius: "10px", height:"200px", width:"200px"}}/>
          <h3>Supreme Veg</h3>
          <h4><LiaRupeeSignSolid size={13}/>99</h4>
          <button class="glow-on-hover" type="button" onClick={notify}>Add to cart</button>
        </div>
        <div class="productcard1">
          <img src="0711-black-bean-burger-lede.webp" style={{borderRadius: "10px", height:"200px", width:"200px"}}/>
          <h3>Bean Beauty</h3>
          <h4><LiaRupeeSignSolid size={13}/>59</h4>
          <button class="glow-on-hover" type="button" onClick={notify}>Add to cart</button>
        </div>
        <div class="productcard1">
          <img src="mushroom-swiss-burger-hero.jpg" style={{borderRadius: "10px", height:"200px", width:"200px"}}/>
          <h3>Mushroom Melt</h3>
          <h4><LiaRupeeSignSolid size={13}/>110</h4>
          <button class="glow-on-hover" type="button" onClick={notify}>Add to cart</button>
        </div>
        <div class="productcard1">
          <img src="spinach_feta_turkey_burgers_1.jpg" style={{borderRadius: "10px", height:"200px", width:"200px"}}/>
          <h3>Spinach Love</h3>
          <h4><LiaRupeeSignSolid size={13}/>108</h4>
          <button class="glow-on-hover" type="button" onClick={notify}>Add to cart</button>
        </div>
        <div class="productcard1">
          <img src="Quinoa Crunch brg.png" style={{borderRadius: "10px", height:"200px", width:"200px"}}/>
          <h3>Quinoa Crunch</h3>
          <h4><LiaRupeeSignSolid size={13}/>120</h4>
          <button class="glow-on-hover" type="button" onClick={notify}>Add to cart</button>
        </div>
        <div class="productcard1">
          <img src="lentil-burger.webp" style={{borderRadius: "10px", height:"200px", width:"200px"}}/>
          <h3>Lentil Fusion</h3>
          <h4><LiaRupeeSignSolid size={13}/>99</h4>
          <button class="glow-on-hover" type="button" onClick={notify}>Add to cart</button>
        </div>
        <div class="productcard1">
          <img src="aloo patty brg.jpg" style={{borderRadius: "10px", height:"200px", width:"200px"}}/>
          <h3>Aloo patty</h3>
          <h4><LiaRupeeSignSolid size={13}/>69</h4>
          <button class="glow-on-hover" type="button" onClick={notify}>Add to cart</button>
        </div> */}
        </div>
      </section>
      <footer>
        <div class="footer">
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
