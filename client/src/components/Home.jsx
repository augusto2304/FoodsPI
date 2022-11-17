import React from 'react';
import {useState, useEffect}  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, filterRecipeByDiets, filterRecipeByOrder, filterRecipeByHs } from '../reducer/actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import SearchBar from './SearchBar';




function Home() {

    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)
    const [order, setOrder] = useState('')
    const [orderHs, setOrderHs] = useState('')


    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch]);


    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes())
    };

    function handleFilterDiets(e){
        e.preventDefault();
        dispatch(filterRecipeByDiets(e.target.value))
    };

    function handleFilterOrder(e){
        e.preventDefault();
        dispatch(filterRecipeByOrder(e.target.value))
        setOrder(`Ordenado ${e.target.value}`)
    }


    function handleFilterHs(e){
        e.preventDefault();
        dispatch(filterRecipeByHs(e.target.value))
        setOrderHs(`Ordenado ${e.target.value}`)
    };




// Falta input para buscar y paginado
    return (
        <div>
            <Link to='/recipes'> Crear receta</Link>
            <h1>Cooking recipes</h1>
            <button onClick={e => { handleClick(e) }}>
                Volver a cargar recetas
            </button>
            <div>
                <select onChange={e => handleFilterDiets(e)}>
                    <option value='all'>Diets</option>
                    <option value='gluten free'>Gluten free</option>
                    <option value='ketogenic'>Ketogenic</option>
                    <option value='lacto ovo vegetarian'>Vegetarian</option>
                    <option value='lacto ovo vegetarian'>Lacto vegetarian</option>
                    <option value='lacto ovo vegetarian'>Ovo vegetarian</option>
                    <option value='lacto ovo vegetarian'>Lacto ovo vegetarian</option>
                    <option value='vegan'>Vegan</option>
                    <option value='pescetarian'>Pescetarian</option>
                    <option value='paleo'>Paleo</option>
                    <option value='primal'>Primal</option>
                    <option value='low FODMAP'>Low FODMAP</option>
                    <option value='whole30'>Whole30</option>
                </select>
                <select onChange={e => handleFilterOrder(e)}>
                    <option value='all'>Order</option>
                    <option value='asc'>Ascendente</option>
                    <option value='des'>Descendente</option>
                    
                </select>
                <select onChange={e => handleFilterHs(e)}>
                <option value='healthScore'>Health Score</option>
                <option value='Low - High'>Low - High</option>
                <option value='High - Low'>High - Low</option>
                </select>

                <SearchBar/>
                
                {
                    allRecipes?.map(e => {
                        return(
                        <Card name={e.name} diets={e.diets} image= {e.image} key={e.id}/>
                        )
                    })
                }

            </div>
        </div>
    )

};



export default Home