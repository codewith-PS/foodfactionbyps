import React from "react";
import "./contact.css"

function contact() {
  return (
    <>
      <section className="mid">
        <form>
          <div className="contact">
            <input type="text" placeholder="Enter Your Name" required />
            <input type="text" placeholder="Enter Your Phone no." required />
            <input type="email" placeholder="Enter Your E-mail" required />
            <input type="text" placeholder="Enter The Message" required />
            <button id="btns" type="submit">
              Submit
            </button>
          </div>
        </form>
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
    </>
  );
}

export default contact;
