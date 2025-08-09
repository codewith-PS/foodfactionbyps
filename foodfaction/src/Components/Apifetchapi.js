import {useState, useEffect} from 'react'

function Apifetchapi() {
    const [items, setItems] = useState([]);

    useEffect(()=>{
        async function fetchItems(){
            // const formdata = new FormData();
            // formdata.append("c", "pizza")
            // formdata.append("t", "items")
            try{
                const response = await fetch('http://localhost/API/new.php',{
                    // method: "POST",
                    // body: "formData",
                });
                const d = await response.json();
                console.log(response);
                setItems(d);

            }catch(error){
                console.log(error);
            }
        }
        fetchItems();
    },[]);
    

  return (
    <div>
        {items.map((item)=>(
            <li key={item}>{item.id}<br/>{item.name}<br/>{item.price}<br/>{item.image}<br/>{item.category}</li>
        ))}
    </div>
  )
}

export default Apifetchapi