import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, filterRecipeByDiets, filterRecipeByOrder, filterRecipeByHs } from '../../reducer/actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';
import Paginate from '../Paginate/Paginate';
import NavBar from '../NavBar/NavBar';
import HomeBanner from '../Banners/HomeBanner';
import s from './Home.module.css';




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
        setPage(1)
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

    function handleId(){
        document.documentElement.scrollTop = 0;
    }




    return (
        <div>
            <NavBar />
            <HomeBanner />
            <div className={s.filterscontainer}>
                <SearchBar paginate={paginate} />

                <select className={s.filters} onChange={e => handleFilterDiets(e)}>
                    <option value='all' key={1}>Diets</option>
                    <option value='gluten free' key={2}>Gluten free</option>
                    <option value='ketogenic' key={3} >Ketogenic</option>
                    <option value='lacto ovo vegetarian' key={4}>Vegetarian</option>
                    <option value='lacto ovo vegetarian' key={5}>Lacto vegetarian</option>
                    <option value='lacto ovo vegetarian' key={6}>Ovo vegetarian</option>
                    <option value='lacto ovo vegetarian' key={7}>Lacto ovo vegetarian</option>
                    <option value='vegan' key={8}>Vegan</option>
                    <option value='pescetarian' key={9}>Pescetarian</option>
                    <option value='paleo' key={10}>Paleo</option>
                    <option value='primal' key={11}>Primal</option>
                    <option value='low FODMAP' key={12}>Low FODMAP</option>
                    <option value='whole30' key={13}>Whole30</option>
                </select>
                <select className={s.filters} onChange={e => handleFilterOrder(e)}>
                    <option value='all' key={1}>Order</option>
                    <option value='asc' key={2}>A-Z</option>
                    <option value='des' key={3}>Z-A</option>

                </select>
                <select className={s.filters} onChange={e => handleFilterHs(e)}>
                    <option value='healthScore' key={1}>Health Score</option>
                    <option value='Low - High' key={2}>Low - High</option>
                    <option value='High - Low' key={3}>High - Low</option>
                </select>

                <button className={s.resetbtn} onClick={e => { handleClick(e) }}>
                    Refresh Recipes
                </button>
            </div>


            
            <Paginate page={page} perPage={perPage} allRecipes={allRecipes} paginate={paginate} />


            <div className={s.cardscontainer}>
                {
                    currentRecipes?.map(e => {
                        return (
                            <div>
                                <Link className={s.link} to={`/recipes/${e.id}`} onClick={handleId}>
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