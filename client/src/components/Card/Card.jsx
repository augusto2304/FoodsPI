import React from 'react';
import s from './Card.module.css'


function Card ({name,diets,image}){
    let Handlediet = function(d){
        if(typeof d === 'string') return (d + "  ")
        else  return (d.name  + "  ")
    }
    return(
        <div className={s.container}>
            <img src={image} className={s.image} alt="not found"/>
            <div className={s.info}>
            <h3 className={s.name}>{name}</h3>
            <h5 className={s.diets}>{diets.map(e => Handlediet(e))}</h5>
            </div>
        </div>
    )
};


export default Card