import React from 'react'
import './loginuser.css'

function loginuser() {
  return (
    <>

    <section className="secmid">

    <form>
    <div className="divuser">
        <input type="text" placeholder="Enter the name" required/>
        <input type="text" placeholder="Enter the Phone no." required/>
        <input type="text" placeholder="Enter the Address" required/>
        <input type="email" placeholder="Enter the E-mail" required/>
        <button id="btnset">Submit</button>
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

export default loginuser