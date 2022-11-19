import React from "react";
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar";
import "./NavBar.css"


function NavBar() {
return(
<div className="nav-container">
    <div className="nav-brand">
        <Link to=''><h2>Recipe Book</h2></Link>
    </div>
    <SearchBar/>
    <ul className="nav-links">
        <li className="nav-link"><Link to='/home'>Home</Link></li>
        <li className="nav-link"><Link to='/recipes'> Create Recipe</Link></li>
    </ul>
</div>
)
}





export default NavBar