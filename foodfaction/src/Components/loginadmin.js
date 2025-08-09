import React from 'react'
import './loginadmin.css'

function loginadmin() {
  return (
    <>
     <section class="ladmin">
            <form>
            <div id="ladmindiv">
                <input type="text" placeholder="Enter the ID" required/>
                <input type="password" placeholder="Enter the Password" required/>
                <button id="btnadmin">Login</button>
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
  )
}

export default loginadmin