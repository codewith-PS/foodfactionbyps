import React, { useEffect, useRef, useState } from 'react';
import './Form.login.css';
import { alertTitleClasses } from '@mui/material';
import axios from 'axios';
import Home from './home';
import { Navigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from "react-toastify";

function Login(props) {
  const loginTextRef = useRef(null);
  const formInnerRef = useRef(null);
  const loginRadioRef = useRef(null);
  const signupRadioRef = useRef(null);

  useEffect(() => {
    const loginText = loginTextRef.current;
    const formInner = formInnerRef.current;

    const handleSignupClick = () => {
      formInner.style.marginLeft = '-100%';
      loginText.style.marginLeft = '-100%';
    };

    const handleLoginClick = () => {
      formInner.style.marginLeft = '0%';
      loginText.style.marginLeft = '0%';
    };


    const loginLabel = document.querySelector("label.slide.login");
    const signupLabel = document.querySelector("label.slide.signup");
    const signupLink = document.querySelector(".signup-link a");

    if (loginLabel && signupLabel && signupLink) {
      loginLabel.addEventListener('click', handleLoginClick);
      signupLabel.addEventListener('click', handleSignupClick);
      signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupLabel.click(); // triggers the signup tab
      });
    }

    // Cleanup listeners on unmount
    return () => {
      if (loginLabel) loginLabel.removeEventListener('click', handleLoginClick);
      if (signupLabel) signupLabel.removeEventListener('click', handleSignupClick);
      if (signupLink) signupLink.removeEventListener('click', () => { });
    };
  }, []);

  // sign up form 
  const [Name, setFullName] = useState("");
  const [Mail, setMail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  // const [Data, setData] = useState({
  //   Name: '',
  //   Mail: '',
  //   Phone: '',
  //   Password: '',
  //   cPassword: ''
  // });
  const [errors, setErrors] = useState({
    name: '',
    mail: '',
    phone: '',
    password: '',
    cPassword: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {
      name: '',
      mail: '',
      phone: '',
      password: '',
      cPassword: ''
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /@/;

    let isValid = true;

    if (!Name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!emailRegex.test(Mail)) {
      newErrors.mail = "Invalid email";
      isValid = false;
    }

    if (!Phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (Phone.length !== 10 || !/^\d{10}$/.test(Phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
      isValid = false;
    } else if (!["7", "8", "9"].includes(Phone[0])) {
      newErrors.phone = "Phone number must start with 7, 8, or 9";
      isValid = false;
    }

    if (!passwordRegex.test(Password)) {
      newErrors.password = "Password must contain '@'";
      isValid = false;
    }

    if (Password !== cPassword) {
      newErrors.cPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    const fData = new FormData();
    fData.append('Name', Name);
    fData.append('Mail', Mail);
    fData.append('Phone', Phone);
    fData.append('Password', Password);
    fData.append('cPassword', cPassword);
    
    axios.post('http://localhost/API/signup/', fData)
      .then((res) => {
        const msg = res.data.Message;
        if (msg === 'Email id is already exist.') {
          toast.warn("Email id is already exist!!", {
            position: 'top-center',
          });
        } else {
          toast.success("Signup successful!", {
            position: 'top-center',
          });
          // console.log(res.data);
          setTimeout(() => {
            window.location.reload();
          }, 2000)

        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Signup failed. Please try again.", {
          position: 'top-center',
          theme: 'dark',
        });
      });
  };


  // login form
  const [mailSet, mailSetSet] = useState('');
  const [passwordSet, passwordSetSet] = useState('');



  const handleSubmitt = (e) => {
    e.preventDefault();
    axios.get(`http://localhost/API/login/?email=${mailSet}&pwd=${passwordSet}`)
      .then((res) => {
        if (res.data && !res.data.error) {
          toast.success('Successfully logged in..', {
            position: 'top-center',
            theme: 'colored',
          });
          // window.location.href = '/home';
          localStorage.setItem('fname', res.data.fname);
          localStorage.setItem('email', res.data.email);
          localStorage.setItem('userid', res.data.userid);
          localStorage.setItem('items', res.data.items);
          setTimeout(() => {
            window.location.reload();
            window.location.href = '/';
          }, 2000);

        } else {
          toast.error(res.data.error || 'Login failed', {
            position: 'top-center',
          });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Login failed due to a network or server error', {
          position: 'top-center',
        });
      })

  }



  return (
    <>
      <section className='mid'>
        <div className="wrapper">
          <div className="title-text" ref={loginTextRef}>
            <div className="title login">Login Form</div>
            <div className="title signup">Signup Form</div>
          </div>
          <div className="form-container">
            <div className="slide-controls">
              <input type="radio" name="slide" id="login" ref={loginRadioRef} defaultChecked />
              <input type="radio" name="slide" id="signup" ref={signupRadioRef} />
              <label htmlFor="login" className="slide login">Login</label>
              <label htmlFor="signup" className="slide signup">Signup</label>
              <div className="slider-tab"></div>
            </div>
            <div className="form-inner" ref={formInnerRef}>
              <form action='#' className="login" onSubmit={handleSubmitt}>
                <div className="field">
                  <input type="text" placeholder="Email Address" required onChange={(e) => mailSetSet(e.target.value)} />
                </div>
                <div className="field">
                  <input type="password" placeholder="Password" required onChange={(e) => passwordSetSet(e.target.value)} />
                </div>
                <div className="pass-link"><a href="#">Forgot password?</a></div>
                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Login"/>
                </div>
                <div className="signup-link">Not a member? <a href="#">Signup now</a></div>
              </form>

              <form action="#" className="signup" onSubmit={handleSubmit}>
                <div className="field">
                  <input type="text" placeholder="Full Name" required onChange={(e) => setFullName(e.target.value)} />
                  <p id="namef" style={{ color: "red" }}>&nbsp;&nbsp;{errors.name}</p>
                </div>
                <div className="field">
                  <input type="text" placeholder="Email Address" required onChange={(e) => setMail(e.target.value)} />
                  <p id='mailf' style={{ color: "red" }}>&nbsp;&nbsp;{errors.mail}</p>
                </div>
                <div className="field">
                  <input type="tel" maxLength={10} placeholder="Phone No." required onChange={(e) => setPhone(e.target.value)} />
                  <p id='phonef' style={{ color: "red" }}>&nbsp;&nbsp;{errors.phone}</p>
                </div>
                <div className="field">
                  <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                  <p id='passf' style={{ color: "red" }}>&nbsp;&nbsp;{errors.password}</p>
                </div>
                <div className="field">
                  <input type="password" placeholder="Confirm password" required onChange={(e) => setCPassword(e.target.value)} />
                  <p id='cpassf' style={{ color: "red" }}>&nbsp;&nbsp;{errors.cPassword}</p>
                </div>
                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Signup" />

                </div>
              </form>
            </div>
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
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        transition={Bounce}
        // theme="dark"
        closeOnClick
      />
    </>

  );
}

export default Login;
