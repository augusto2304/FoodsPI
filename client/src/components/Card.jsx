import React from 'react';


function Card ({name,diets,image}){
    let Handlediet = function(d){
        if(typeof d === 'string') return (d + " ")
        else  return (d.name  + " ")
    }
    return(
        <div>
            <img src={image} alt="not found" width='350px' height='250px'/>
            <h3>{name}</h3>
            <h5>{diets.map(e => Handlediet(e))}</h5>
            <hr />
        </div>
    )
};


export default Card