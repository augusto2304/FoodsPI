import React from "react";
import { Link } from 'react-router-dom';
import s from "./NavBar.module.css"


function NavBar() {
return(
<div className={s.navcontainer}>
    <div className={s.navbrand}>
        <Link to='' className={s.navbrandlink}>Recipe Book</Link>
    </div>
    <ul className={s.navlinks}>
        <li className={s.li}><Link to='/home' className={s.navlink}>Home</Link></li>
        <li className={s.li}><Link to='/recipes' className={s.navlink}>Create your recipe</Link></li>
    </ul>
</div>
)
}





export default NavBar