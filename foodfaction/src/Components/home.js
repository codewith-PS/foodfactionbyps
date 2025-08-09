import react from "react";
import React, { useEffect } from "react";
import "./home.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Menupizza from "./menuburger";
import Menuburger from "./menupizza";
import Menucake from "./menucake";

function Home() {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <div className="container">
        <div className="wrapperr">
          <img src="images/ivan-torres-MQUqbmszGGM-unsplash.jpg" />
          <img src="images/ilya-mashkov-_qxbJUr9RqI-unsplash.jpg" />
          <img src="images/jasmine-bartel-8LtrMQfeDkQ-unsplash.jpg" />
        </div>
      </div>
      <section className="ins1">
        <div id="insh1">
          <h1 style={{ fontsize: "44px" }}>Inspiration for your first order</h1>
        </div>
        <div className="containerorder">
          <div id="pizza1">
            <img
              src="images/pizza 1.webp"
              style={{
                height: "325px",
                width: "320px",
                top: "-10px",
                left: "-10px",
                position: "absolute",
              }}
            />
          </div>
          <div id="burger1">
            <img
              src="images/pngwing.com (25).png"
              style={{ height: "360px", width: "360px", position: "absolute" }}
            />
          </div>
          <div id="cake1">
            <img
              src="images/pngwing.com (28).png"
              style={{ height: "410px", width: "320px", position: "absolute" }}
            />
          </div>
        </div>
        <div className="listitem">
          <div id="listp">
            <h1>Pizza</h1>
          </div>
          <div id="listb">
            <h1>Burger</h1>
          </div>
          <div id="listc">
            <h1>Cake</h1>
          </div>
        </div>
        <div className="container2" data-aos="zoom-in">
          <div id="pizzao">
            <h1 style={{ fontsize: "50px" }}>Pizza</h1>
            <p>
              Indulge in vegetarian pizza perfection at Food Faction. From the
              classNameic Veggie Supreme to the savory Margherita, our pizzas
              are renowned for their deliciousness. The best part? We offer
              convenient home delivery, so you can enjoy these delectable pizzas
              in the comfort of your own space. Satisfy your pizza cravings the
              vegetarian way at Food Faction.
            </p>
            <Link to="/menupizza" className="aset" id="btnp">
              Order Now
            </Link>
          </div>
          <div id="pizzavid">
            <video width="550px" height="300px" autoPlay muted loop>
              <source
                src="images/4008533-uhd_4096_2160_25fps.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
        <div className="container3" data-aos="zoom-in-up">
          <div id="burgervid">
            <video width="570px" height="320px" autoPlay muted loop>
              <source
                src="images/5820008-hd_1920_1080_25fps.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div id="burgero">
            <h1 style={{ fontsize: "50px" }}>Burger</h1>
            <p>
              Discover vegetarian burger bliss at Food Faction. From classNameic
              Veggie Cheeseburgers to zesty Spicy Chickpea Burgers, we offer a
              delightful range of flavors. Best of all, we provide home
              delivery, making it easy to savor these delicious vegetarian
              burgers in the comfort of your home. Order now and experience the
              vegetarian taste sensation at Food Faction!
            </p>
            <Link to="/menuburger" className="aset" id="btnp">
              Order Now
            </Link>
          </div>
        </div>
        <div className="container4" data-aos="zoom-in-down">
          <div id="cakeo">
            <h1 style={{ fontsize: "50px" }}>Cake</h1>
            <p>
              Life is sweeter with Food Faction's exquisite vegetarian cakes.
              Each slice, whether it's the classNameic Chocolate Truffle or the
              exotic Mango Delight, is a celebration of flavor. And the best
              part? Our cakes are available for home delivery, making it easy to
              indulge in vegetarian sweetness. Mark special moments or simply
              satisfy your sweet tooth with our delightful cakes.
            </p>
            <Link to="/menucake" className="aset" id="btnp">
              Order Now
            </Link>
          </div>
          <div id="cakevid">
            <video width="550px" height="300px" autoPlay muted loop>
              <source
                src="images/5727374-uhd_3840_2160_24fps.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
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
    </>
  );
}
export default Home;
