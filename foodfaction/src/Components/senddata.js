import { useState } from "react"
export default function sendData(){
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');

    const handleChange=((e)=>{
        
    })


    const handleSubmit=((e)=>{
        e.preventDefault();
    });

    return(
        <form onSubmit={handleSubmit}>
            <label>Name: </label>
            <input type="text" name="name"></input>
            <br/>
            <label>price: </label>
            <input type="number" name="price"></input>
            <br/>
            <label>image: </label>
            <input type="text" name="image"></input>
            <br/>
            <label>category: </label>
            <input type="text" name="category"></input>
            <br/>
            <button type="submit">submit</button>
            
        </form>
    )
}