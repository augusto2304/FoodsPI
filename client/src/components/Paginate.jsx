import React from "react";


function Paginate({page,perPage, allRecipes, paginate}) {

    const totalPages = Math.ceil(allRecipes.length / perPage)
    
    function previusPage(){
        if(page > 1) paginate(page - 1)
    };

    function nextPage(){
        if(page < totalPages) paginate(page + 1)
    };

    return(
        <div>
            <button onClick={previusPage}>Previus</button>
            <p>{page} of {totalPages}</p>
            <button onClick={nextPage}>Next</button>
        </div>
    )
};




export default Paginate