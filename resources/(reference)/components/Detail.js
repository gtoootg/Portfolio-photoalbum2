import React, {useState, useEffect}from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


function Detail() {

    let {id} =useParams();

    const[detail, setDetail] = useState([])

    function loadDetail(){
        axios.get("http://127.0.0.1:8000/api/detail/"+id,)
        .then(response=>setDetail(response.data))
        .catch(error=>console.log('あほー'))
    }

    useEffect(()=> loadDetail(), []);

  

    return (
                       <div key={id} className="container">
            <Link to="/">Top</Link>
            <div className="container row">
            <div className="col-4">
                {detail.id}
                {detail.place}
                
            </div>
            <img src={detail.image}/>
            </div>
        </div>
    );
}

export default Detail;

// if (document.getElementById('app')) {
//     ReactDOM.render(<Top />, document.getElementById('app'));
// }
