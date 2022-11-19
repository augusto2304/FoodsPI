import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, filterRecipeByDiets, filterRecipeByOrder, filterRecipeByHs } from '../reducer/actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import SearchBar from './SearchBar';
import Paginate from './Paginate';
import NavBar from './NavBar';
import Banner from './Banner';




function Home() {

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const [order, setOrder] = useState('');
    const [orderHs, setOrderHs] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerpage] = useState(9);
    const lastIndex = page * perPage;
    const firstIndex = lastIndex - perPage;
    const currentRecipes = allRecipes.slice(firstIndex, lastIndex);
    const paginate = function (pageNumber) { setPage(pageNumber) };
    



    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch]);


    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes())
    };

    function handleFilterDiets(e) {
        e.preventDefault();
        dispatch(filterRecipeByDiets(e.target.value));
        setPage(1)
    };

    function handleFilterOrder(e) {
        e.preventDefault();
        dispatch(filterRecipeByOrder(e.target.value))
        setOrder(e.target.value) 
        setPage(1)
    }


    function handleFilterHs(e) {
        e.preventDefault();
        dispatch(filterRecipeByHs(e.target.value))
        setOrderHs(e.target.value)
        setPage(1)
    };



    return (
        <div>
            <NavBar/>
            <Banner/>
            <button onClick={e => { handleClick(e) }}>
                Refresh Recipes
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
                    <option value='asc'>A-Z</option>
                    <option value='des'>Z-A</option>

                </select>
                <select onChange={e => handleFilterHs(e)}>
                    <option value='healthScore'>Health Score</option>
                    <option value='Low - High'>Low - High</option>
                    <option value='High - Low'>High - Low</option>
                </select>

                <SearchBar paginate={paginate}/>

                <Paginate page={page} perPage={perPage} allRecipes={allRecipes} paginate={paginate} />

                {
                    currentRecipes?.map(e => {
                        return (
                            <div>
                                <Link to={`/recipes/${e.id}`}>
                                <Card name={e.name} diets={e.diets} image={e.image} key={e.id} />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

};



export default Home