import { useState, useEffect } from 'react';
import './menupizza.css'
import { BrowserRouter as router, Routes, Route, Link } from 'react-router-dom'
import { LiaRupeeSignSolid } from "react-icons/lia";
import Menucake from './menucake'
import Menupizza from './menupizza'
import Menuburger from './menuburger'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export default function MenuCake() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/API/cake/')
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        console.log('arror', error);
      })
  }, []);

  const notify = (item) => {
    const userId = localStorage.getItem('userid');
    if (!userId || userId === 'null') {
      alert("Please log in to add items to your cart...");
      window.location.href = "/login";
      return;
    } else {
      // toast.success("Add to cart");
      axios.get(`http://localhost/API/cartCount/index.php?item_id=${item.id}&qty=1&totalp=${item.price}&userid=${userId}`)
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
      //      if (addToCart) {
      //   addToCart();
      // }
      // alert(`Item ID: ${item.id}, Name: ${item.name}, Price: ${item.price}`);
    };
  }

  return (
    <>
      <section className="section">
        <div className="topdiv">
          <Link to="/menupizza" className='aset'>Pizza</Link>
          <Link to="/menuburger" className='aset'>Burger</Link>
          <Link to="/menucake" className='aset'>Cake</Link>
        </div>
        <div className="itemdiv">
          {items.map((item) => (
            <div key={item.id} className="productcard1">
              <img src={item.image} style={{ borderRadius: "10px", height: "200px", width: "200px" }} />
              <h3>{item.name}</h3>
              <h4><LiaRupeeSignSolid size={13} />{item.price}</h4>
              <button class="glow-on-hover" type="button" onClick={() => notify(item)}>Add to cart</button>
            </div>
          ))};
        </div>
        {/* <div className="productcard1">
          <img src="CLASSICCHOCOLATECAKE699@2x.webp" style={{borderRadius: "10px", height:"200px", width:"200px"}}/>
          <h3>Classic Choco</h3>
          <h4><LiaRupeeSignSolid size={13}/>450</h4>
          <button class="glow-on-hover" type="button" onClick={notify}>Add to cart</button>
        </div>
        <div className="productcard1">
          <img src="dark forest cake.JPG" style={{borderRadius: "10px", height:"200px", width:"200px"}}/>
          <h3>Dark Forest</h3>
          <h4><LiaRupeeSignSolid size={13}/>199</h4>
          <button class="glow-on-hover" type="button" onClick={notify}>Add to cart</button>
        </div>
        <div className="productcard1">
          <img src="black-magic-cake.jpg" style={{borderRadius: "10px", height:"200px", width:"200px"}}/>
          <h3>Black magic</h3>
          <h4><LiaRupeeSignSolid size={13}/>370</h4>
          <button class="glow-on-hover" type="button" onClick={notify}>Add to cart</button>
        </div>
        <div className="productcard1">
          <img src="pistachio-cake.jpg" style={{borderRadius: "10px", height:"200px", width:"200px"}}/>
          <h3>Pistachio</h3>
          <h4><LiaRupeeSignSolid size={13}/>570</h4>
          <button class="glow-on-hover" type="button" onClick={notify}>Add to cart</button>
        </div>
        <div className="productcard1">
          <img src="Tiramisu-birthday-cake-recipe.webp" style={{borderRadius: "10px", height:"200px", width:"200px"}}/>
          <h3>Tiramisu</h3>
          <h4><LiaRupeeSignSolid size={13}/>450</h4>
          <button class="glow-on-hover" type="button" onClick={notify}>Add to cart</button>
        </div>
        <div className="productcard1">
          <img src="Caramel Swirl.jpg" style={{borderRadius: "10px", height:"200px", width:"200px"}}/>
          <h3>Caramel Swirl</h3>
          <h4><LiaRupeeSignSolid size={13}/>410</h4>
          <button class="glow-on-hover" type="button" onClick={notify}>Add to cart</button>
        </div>
        <div className="productcard1">
          <img src="Mango cake.png" style={{borderRadius: "10px", height:"200px", width:"200px"}}/>
          <h3>Mango Fusion</h3>
          <h4><LiaRupeeSignSolid size={13}/>384</h4>
          <button class="glow-on-hover" type="button" onClick={notify}>Add to cart</button>
        </div>
        <div className="productcard1">
          <img src="White Choco cake.webp" style={{borderRadius: "10px", height:"200px", width:"200px"}}/>
          <h3>White Choco</h3>
          <h4><LiaRupeeSignSolid size={13}/>349</h4>
          <button class="glow-on-hover" type="button" onClick={notify}>Add to cart</button>
        </div>
        <div className="productcard1">
          <img src="fantasy-cake.jpg" style={{borderRadius: "10px", height:"200px", width:"200px"}}/>
          <h3>Fudge Fantasy</h3>
          <h4><LiaRupeeSignSolid size={13}/>269</h4>
          <button class="glow-on-hover" type="button" onClick={notify}>Add to cart</button>
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
      <ToastContainer position='bottom-right' autoClose={1000} transition={Bounce} theme='dark' closeOnClick />
    </>
  )
}
