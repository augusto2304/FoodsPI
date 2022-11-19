import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../reducer/actions";
import "./SearchBar.css"



function SearchBar({paginate}) {
    const dispatch = useDispatch();
    const[name,setName] = useState('');


    function handleChange(e){
        e.preventDefault();
        setName(e.target.value)
    };

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getRecipeByName(name))
        paginate(1)
    };

    return(
        <div className="search-container">
            <input type="text" placeholder="Search recipe..." onChange={e => handleChange(e)} />
            <button type="submit" onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )
};



export default SearchBar