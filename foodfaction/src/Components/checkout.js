import React from 'react'
import "./menupizza.css";
import { useState, useEffect, useRef } from 'react';
import Login from './login';
import Home from './home';
import Profile from './Profile';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import { LiaRupeeSignSolid } from "react-icons/lia";
import { RxCrossCircled } from "react-icons/rx";
import axios from 'axios';
import Modal from 'react-modal';

function checkout() {
  const [fname, setToken] = useState('');
  const [eMail, setEmail] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const namedata = localStorage.getItem('fname');
    setToken(namedata);

  }, []);

  useEffect(() => {
    const mail = localStorage.getItem('email');
    setEmail(mail);
  }, []);


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
  subTotal();
  // function logOut() {
  //     toast.warning("Logging Out....", {
  //         position: 'top-center',
  //         theme: 'dark',
  //     });
  //     setTimeout(() => {
  //         localStorage.clear();
  //         window.location.href = '/';
  //     }, 2000);
  // }
  const [Address1, setAddress1] = useState('');
  const [Address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');



  const [errorAddress1, seterrorAddress1] = useState('');
  const [errorAddress2, seterrorAddress2] = useState('');
  const [errorcity, seterrorCity] = useState('');
  const [errorstate, seterrorState] = useState('');
  const [errorzip, seterrorZip] = useState('');

  const [Address11, setAddress11] = useState('');
  const [Address22, setAddress22] = useState('');
  const [Cityy, setCityy] = useState('');
  const [Statee, setStatee] = useState('');
  const [Zipp, setZipp] = useState('');
  const [Paymodee, setPamodee] = useState('');



  const [userIDD, setuserIDD] = useState('');
  useEffect(() => {
    const DDD = localStorage.getItem('userid');
    setuserIDD(DDD);
  });

  const handleAdressSubmitted = (e) => {
    e.preventDefault();
    const useridd = localStorage.getItem('userid');
    if (!useridd) {
      alert("please login firstly!!")
      window.location.href = '/login';
    }
    let isValid = true;

    // if (!userIDD) {
    //     alert("please login firstly!!");
    //     return;
    // }
    // let isValid = true;

    if (!Address1) {
      seterrorAddress1("Required field");
      isValid = false;
    } else {
      seterrorAddress1("");
    }

    if (!city) {
      seterrorCity("Required field");
      isValid = false;
    } else {
      seterrorCity("");
    }

    if (!state) {
      seterrorState("Required field");
      isValid = false;
    } else {
      seterrorState("");
    }

    if (!zip) {
      seterrorZip("Required field");
      isValid = false;
    } else {
      seterrorZip("");
    }

    if (!isValid) return;


    const fData = new FormData();
    fData.append('Address1', Address1);
    fData.append('Address2', Address2);
    fData.append('city', city);
    fData.append('state', state);
    fData.append('zip', zip);
    fData.append('userid', userIDD);

    axios.post('http://localhost/API/sendaddress/', fData)
      .then((res) => {
        console.log(res);
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 500);

        // toast.success("send address successfully")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch updated address from DB
  // useEffect(() => {
  // const useridd = localStorage.getItem('userid');
  // if (!useridd) return;
  useEffect(() => {
    const useridd = localStorage.getItem('userid');
    if (useridd) {
      axios.get(`http://localhost/API/recaddress/?userid=${useridd}`)
        .then((res) => {
          if (res?.data?.address1) {
            setAddress11(res.data.address1);
            setAddress22(res.data.address2);
            setCityy(res.data.city);
            setStatee(res.data.state);
            setZipp(res.data.zip);
            setPamodee(res.data.pymmode);
            // alert(res.data.address1);
            // alert(res.data.address2);
            // alert(res.data.city);
            // alert(res.data.state);
            // alert(res.data.zip);
          }
        })
        .catch((err) => {
          console.error("Error fetching address on load:", err);
        });
    };
  }, []);


  // })
  const [payment, setPayment] = useState('');
  const [paymenterror, setPaymenterror] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const useriD = localStorage.getItem('userid');
    if (!useriD) {
      alert("please login firstly!!");
      window.location.href = '/login';
    } else {
      if (!payment) {
        setPaymenterror("Select payment method");
      } else {
        setPaymenterror("");
        // alert(`Selected Payment Mode: ${payment}`);
        axios.get(`http://localhost/API/sendpym/?pym=${payment}&userid=${userIDD}`)
          .then((res) => {
            console.log(res.data);
            if (res) {
              toast.success('Order Place Successful', {
                position: 'top-center',
                theme: 'colored',
              });
              setTimeout(() => {
                window.location.href = '/';
              }, 2000);
            }
          })
          .catch((err) => {
            console.error(err);
          })
      }
    };
  };


  // const AddressSection = () => {
  //     const [showForm, setShowForm] = useState(false);
  //     const [Address11, setAddress1] = useState('');
  //     const [Address22, setAddress2] = useState('');
  //     const [Cityy, setCity] = useState('');
  //     const [Statee, setState] = useState('');
  //     const [Zipp, setZip] = useState('');
  //     const [fname, setFname] = useState('John Doe'); // Example
  //     const [Paymodee, setPaymode] = useState('Credit Card'); // Example

  //     const [errorAddress1, setErrorAddress1] = useState('');
  //     const [errorcity, setErrorCity] = useState('');
  //     const [errorstate, setErrorState] = useState('');
  //     const [errorzip, setErrorZip] = useState('');

  //     const handleAdressSubmitted = (e) => {
  //         e.preventDefault();

  //         // Add validation and save logic here
  //         if (!Address11.trim()) {
  //             setErrorAddress1('Address 1 is required');
  //             return;
  //         }

  //         // If valid, hide the form and show the address
  //         setShowForm(false);
  //     };
  // };
  // const h1set = () => {
  //     document.getElementsByClassName('formcontainerrrr')[0].style.display = 'none';
  // }

  // const btnsett = () => {
  //     document.getElementsByClassName('formcontainerrrr')[0].style.display = 'block';

  // }

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const subtitleRef = useRef(null);

  Modal.setAppElement('#root'); // Ensure this matches your index.html root div

  function afterOpenModal() {
    if (subtitleRef.current) {
      subtitleRef.current.style.color = '#f00';
    }
  }
  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  const [checkCart, setcheckCart] = useState([]);
  const [checkpay, setcheckpay] = useState([null]);
  useEffect(() => {
    const userID = localStorage.getItem('userid');
    axios.get(`http://localhost/API/checkoutcart/?userid=${userID}`)
      .then((res) => {
        console.log(res.data);
        setcheckCart(res.data);
        if (res.data.length > 0 && res.data[0].pymmode !== undefined) {
          setcheckpay(res.data[0].pymmode);
        } else {
          setcheckpay([null]);
        }
        // if(res.data.pymmode=''){
        //   setcheckpay()
        //   return false;
        // }
        // const dash = '';
        // res.data.forEach((item) => {
        //   const hello = `qty=${item.qty}, id=${item.item_id}`
        //   alert(hello);
        // })
      })
      .catch((err) => {
        console.log(err);
      })
  }, [checkpay])

  useEffect(() => {
    console.log(checkpay)
  }, [checkpay]);
  return (
    <>
      <section className='hellooo'>
        {Address11?.trim() ? (
          <>
            <div className='divadd'>
              <h1>Address</h1>
              <p>Custumer Name : {fname}</p>
              <p>Address1 : {Address11}</p>
              <p>Address2 : {Address22}</p>
              <p>City : {Cityy}</p>
              <p>State : {Statee}</p>
              <p>Zip : {Zipp}</p>
              {/* <p>Paymode : {Paymodee}</p> */}
              <button type="button" onClick={openModal} className="submit-btnn">Edit</button>
            </div>
          </>
        )
          :
          (
            <div className='setmidmid'>
              <div className="formcontainer">
                <form id="addressForm" onSubmit={handleAdressSubmitted}>
                  <div className="form-group">
                    <label htmlFor="street">Parmanent Address 1*</label>
                    <div className="input-wrapperr">
                      <input type="text" id="street" onChange={(e) => setAddress1(e.target.value)} />
                      <span style={{ color: 'red' }}>{errorAddress1}</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="street">Parmanent Address 2</label>
                    <div className="input-wrapperr">
                      <input type="text" id="street" onChange={(e) => setAddress2(e.target.value)} />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="setmidd">
                      <label htmlFor="city" style={{ position: "relative", bottom: "20px" }}>City</label>
                      <br />
                      <div className="input-wrapperr" style={{ position: "absolute" }}>
                        <input type="text" id="city" style={{ width: "445px" }} onChange={(e) => setCity(e.target.value)} />
                        <br />
                        <span style={{ color: 'red' }}>{errorcity}</span>
                      </div>
                      <label htmlFor="state" style={{ position: "relative", bottom: "20px", left: "-65px" }}>State</label>
                      <br />
                      <div className="input-wrapperr" style={{ position: "absolute", left: "450px" }}>
                        <input type="text" id="state" style={{ width: "518px" }} onChange={(e) => setState(e.target.value)} />
                        <span style={{ color: 'red' }}>{errorstate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <br />
                    <label htmlFor="zip">ZIP Code</label>
                    <div className="input-wrapperr">
                      <input type="text" id="zip" onChange={(e) => setZip(e.target.value)} />
                      <span style={{ color: 'red' }}>{errorzip}</span>
                    </div>
                  </div>
                  <div className="btnset">
                    <button type="submit" className="submit-btn">Save Address</button>
                  </div>
                </form>
              </div>
            </div>
          )
        }


        <div className="ctotal">
          <h1>TOTAL BILL</h1>
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
            <br/>
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
            <Link to='/profile' style={{ textDecoration: "none" }}>
              <button className="btns" style={{ top: '10px', position: 'relative' }}>Check Order Summary</button>
            </Link>
          </div>
        </div>
        <div className='itemsorder'>
          <div style={{
            height: '40px', width: '800px', backgroundColor: '#48ff00', borderRadius: '2px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'cursive'
          }}>Your Orders  </div>
          <div className='divbig'>
            {checkCart.map((item) => (
              <div className='data1order' >
                <div className='dataimg' key={item.item_id}>
                  <img src={item.image} style={{ height: '100px', width: '100px' }} /></div>
                <p className='dataname'>{item.name}</p>
                <p className='dataqty'>Qty: {item.qty}</p>
                <p className='dataprice'><LiaRupeeSignSolid size={13} />{item.totalp}</p>
              </div>
            ))}
          </div>
        </div>

        {!checkpay ?
          (
            <>
              <div className='paymentt'>
                <form onSubmit={handleSubmit}>
                  <h2 style={{ left: '400px', position: 'relative', width: 'max-content' }}>Payment Mode:</h2>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="cash on delivery"
                      checked={payment === 'cash on delivery'}
                      onChange={(e) => setPayment(e.target.value)}
                    />
                    Cash on Delivery
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="pay online"
                      checked={payment === 'pay online'}
                      onChange={(e) => setPayment(e.target.value)}
                    />
                    Pay Online
                  </label>
                  <span style={{ color: "red" }}>{paymenterror}</span>
                  <button type="submit" id='paybtn'>Place Order</button>
                </form>
              </div>
            </>
          )
          :
          null
        }
      </section >
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
      {/* <button onClick={openModal} className="btn btn-primary">
                        Launch React Modal
                    </button> */}

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '1001',
            padding: '0%',
            position: 'absolute',
          },
          overlay: {
            zIndex: '1000',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }
        }}
      >
        <div className="formcontainerrrr">
          <form id="addressForm" onSubmit={handleAdressSubmitted}>
            <div className="form-group">
              <label htmlFor="street">Parmanent Address 1*</label>
              <h1 id="h1set" style={{ position: 'absolute', right: '10px', top: '0', cursor: 'pointer' }} onClick={closeModal}><RxCrossCircled /></h1>
              <div className="input-wrapperr">
                <input type="text" id="street" onChange={(e) => setAddress1(e.target.value)} />
                <span style={{ color: 'red' }}>{errorAddress1}</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="street">Parmanent Address 2</label>
              <div className="input-wrapperr">
                <input type="text" id="street" onChange={(e) => setAddress2(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <div className="setmidd">
                <label htmlFor="city" style={{ position: "relative", bottom: "20px" }}>City</label>
                <br />
                <div className="input-wrapperr" style={{ position: "absolute" }}>
                  <input type="text" id="city" style={{ width: "445px" }} onChange={(e) => setCity(e.target.value)} />
                  <br />
                  <span style={{ color: 'red' }}>{errorcity}</span>
                </div>
                <label htmlFor="state" style={{ position: "relative", bottom: "20px", left: "-65px" }}>State</label>
                <br />
                <div className="input-wrapperr" style={{ position: "absolute", left: "450px" }}>
                  <input type="text" id="state" style={{ width: "352px" }} onChange={(e) => setState(e.target.value)} />
                  <span style={{ color: 'red' }}>{errorstate}</span>
                </div>
              </div>
            </div>
            <div className="form-group">
              <br />
              <label htmlFor="zip">ZIP Code</label>
              <div className="input-wrapperr">
                <input type="text" id="zip" onChange={(e) => setZip(e.target.value)} />
                <span style={{ color: 'red' }}>{errorzip}</span>
              </div>
            </div>
            <div className="btnset">
              <button type="submit" className="submit-btn">Save Address</button>
            </div>
          </form>
        </div>
      </Modal>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        transition={Bounce}
        // theme="dark"
        closeOnClick
      />
    </>
  )
}

export default checkout