import React from 'react'
import { Link } from 'react-router-dom'

function Navbar(){
    return(
        <div className="container row mt-5">
          <Link to="/" className="col-3"><h5>Home</h5></Link>
          <Link to="/Hello" className="col-3"><h5>Hello</h5></Link>

        </div>
    )
}    
  
export default Navbar;