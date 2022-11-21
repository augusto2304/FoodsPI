import React from "react";
import s from './Paginate.module.css'


function Paginate({page,perPage, allRecipes, paginate}) {

    const totalPages = Math.ceil(allRecipes.length / perPage)
    
    function previusPage(){
        if(page > 1) paginate(page - 1)
    };

    function nextPage(){
        if(page < totalPages) paginate(page + 1)
    };


    return(
        <div className={s.paginatecontainer}>
            <button className={s.btn} onClick={previusPage}>Prev</button>
            <h3 className={s.pages} >{page} of {totalPages}</h3>
            <button className={s.btn} onClick={nextPage}>Next</button>
        </div>
    )
};




export default Paginate