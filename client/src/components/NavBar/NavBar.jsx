import React from "react";
import { Link } from 'react-router-dom';
import s from "./NavBar.module.css"
import { useSelector } from 'react-redux';






function NavBar() {


    const allRecipes = useSelector((state) => state.recipes);
    const allRecipesId = allRecipes.map(e => e.id)

    function random(){
        return allRecipesId[Math.floor(Math.random() * allRecipesId.length)]
    }

 

    return (
        <div className={s.navcontainer}>
            <div className={s.navbrand}>
                <Link to='' className={s.navbrandlink}>Recipe Book</Link>
            </div>
            <ul className={s.navlinks}>
                <li className={s.li}><Link to='/home' className={s.navlink}>Home</Link></li>
                <li className={s.li}><Link to='/recipes' className={s.navlink}>Create your recipe</Link></li>
            </ul>
            <Link to={`/recipes/${random()}`}>
            <button className={s.randombtn} >Random recipe</button>
            </Link>
        </div>
    )
}

                                    
                            


export default NavBar

