import "./menupizza.css";
import { useState, useEffect, useRef } from 'react';
import Login from './login';
import Home from './home';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Bounce } from 'react-toastify';
// import { LiaRupeeSignSolid } from "react-icons/lia";
// import { RxCrossCircled } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { LiaRupeeSignSolid } from "react-icons/lia";
import axios from 'axios';
import Modal from 'react-modal';
// import Modal from 'react-modal';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';



function Profile() {

    const handleLogout = () => {
        // Handle logout logic
        localStorage.clear();
        toast.error('you logged out!!!', {
            position: 'top-center',
            theme: 'colored',
        });
        setTimeout(() => {
            window.location.href = './';
        }, 2000);


    };
    const handleLogin = () => {
        window.location.href = './login';
    }
    const fname = localStorage.getItem('fname');
    const mail = localStorage.getItem('email');

    const [cartDATA, setcartDATA] = useState([]);

    const cartData = () => {
        const userID = localStorage.getItem('userid');
        axios.get(`http://localhost/API/orderhis/?userid=${userID}`)
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setcartDATA(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        cartData();
    }, []);

    const deleteOrder = (item) => {
        toast.warning("You cancel the order" + " " + item.name, {
            position: 'top-center',
            theme: 'colored'
        });
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        const userID = localStorage.getItem('userid');
        axios
            .get(`http://localhost/API/deleteord/index.php?item_id=${item.item_id}&userid=${userID}`)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };
    const [itemss, setitemss] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const subtitleRef = useRef(null);

    Modal.setAppElement('#root'); // Ensure this matches your index.html root div

    function afterOpenModal() {
        if (subtitleRef.current) {
            subtitleRef.current.style.color = '#f00';
        }
    }
    function openModal(item) {
        setitemss(item.item_id);
        setModalIsOpen(true);
    }
    function closeModal() {
        setModalIsOpen(false);
    }

    const [image, Setimage] = useState([]);
    const [Descriptions, setDescriptions] = useState('');
    const [Options, setOptions] = useState('');
    const [Return, Setreturn] = useState(false);
    // const [formVisible, setFormVisible] = useState(true);

    // const [imagePreview, setImagePreview] = useState(null);

    const handlesubmit = (e) => {
        e.preventDefault();
        // if (!Imagess) {
        //     alert("please select Images");
        //     return false;
        // }
        // else {

        const userID = localStorage.getItem('userid');
        const formdata = new FormData();
        formdata.append('Description', Descriptions);
        formdata.append('Issue', Options);
        formdata.append('userid', userID);
        formdata.append('items', itemss);
        image.forEach((file) => {
            formdata.append('Images[]', file); // send as array to match PHP
        });
        // if (image) {
        //     formdata.append('Images', image);
        // }
        // formdata.append('Images[]', Imagess[0]);

        // console.log(Imagess[0])

        axios.post(`http://localhost/API/returnitem/`, formdata)
            // .then((res) => JSON.parse(res[0])).then((data) => console.log(data))
            .then((res) => {
                console.log(res.data);
                if (res.data.message === 'return') {
                    alert("you already return query");
                    Setreturn(true);
                } else {
                    toast.error("return query successful sent", {
                        position: 'top-center'
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000)
                }
                // setFormVisible(true);
            })
            .catch((err) => {
                console.log(err);
            })
        // }
    }
    const handleImageChange = (event) => {
        Setimage(Array.from(event.target.files));
    };

    return (
        <>
            <section className='profilemid'>
                <div className="profile-container">
                    <h1 style={{ fontSize: '50px', position: 'relative', top: '18px', color: 'rgb(14, 255, 14)' }}><CgProfile /></h1>
                    <h3 style={{ position: 'relative', top: '20px' }}>{fname}</h3>
                    <h3 style={{ position: 'relative', top: '20px' }}>{mail}</h3>
                    {
                        fname ?
                            (
                                <button style={{ position: 'relative', top: '50px' }} onClick={handleLogout} className="logout-btn">Logout</button>
                            ) : (
                                <button style={{ position: 'relative', top: '50px' }} onClick={handleLogin} className="logout-btn">Login</button>
                            )
                    }
                </div>
                <div className='secondorder'>
                    <div className='orderh'>
                        <h1>Order history</h1>
                    </div>
                    {cartDATA.map((item, index) => (
                        <div key={index} className="cartsetpr">
                            <div className="indexsetpr">
                                <img
                                    src={item.image}
                                    alt={item.image}
                                    style={{ height: "100px", width: "100px" }}
                                /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <h4>Qty: {item.qty}</h4>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <h4><LiaRupeeSignSolid size={13} />{item.totalp}</h4>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <h4>Payment:<br />{item.pymmode}</h4>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {item.status !== 'delivered' ?
                                    (<button className='btnnnn' onClick={() => deleteOrder(item)}>Cancel</button>)
                                    :
                                    (<><button className='btnnnn' style={{
                                        backgroundColor: 'lightgreen',
                                        padding: '35px 5px',
                                        color: 'black',
                                        cursor: "default"
                                    }}>Successfully delivered</button>
                                        <button className='btnnnn' onClick={() => openModal(item)} style={{ backgroundColor: 'orange' }}>return</button></>)
                                }
                            </div>
                            {/* <div className="indexqty">
                                
                            </div> */}
                        </div>
                    ))}
                </div>
            </section>
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
                        borderRadius: '8px'
                    },
                    overlay: {
                        zIndex: '1000',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }
                }}
            >
                <> 
                
                    <div className='modalsetform'>
                        <form enctype="multipart/form-data" onSubmit={handlesubmit}>
                            <textarea style={{ width: "493px", height: '70px', top: '0', position: "relative", borderRadius: '1px' }} required onChange={(e) => setDescriptions(e.target.value)} name="description" placeholder="Describe the issue..."></textarea>
                            <label>Select Issue:  </label>
                            <select name="issue_type" required onChange={(e) => setOptions(e.target.value)}>
                                <option value=''>--Select--</option>
                                <option value='Wrong Item'>Wrong Item</option>
                                <option value='Missing Item'>Missing Item</option>
                                <option value='Food Quality Issue'>Food Quality Issue</option>
                                <option value='Other'>Other</option>
                            </select>
                            <br />
                            <br />
                            <input style={{ paddingTop: '5px', border: 'none', top: '20px', position: 'relative' }} type="file" multiple name="Images" placeholder="choose file" onChange={handleImageChange} required />
                            {
                                image.length > 0 &&
                                image.map((img, index) => (
                                    <img key={index} src={URL.createObjectURL(img)} style={{ width: '100px', marginRight: '10px' }} alt={`preview-${index}`} />
                                ))
                            }

                            <br />
                            <button style={{
                                padding: '20px 100px', backgroundColor: 'blue', border: 'none',
                                color: 'white', cursor: 'pointer',
                                fontFamily: 'cursive', borderRadius: '30px',
                                position: 'absolute', bottom: '10px', left: '100px'
                            }} type="submit">Submit Request</button>
                        </form>
                    </div>
                </>
            </Modal>

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
export default Profile;