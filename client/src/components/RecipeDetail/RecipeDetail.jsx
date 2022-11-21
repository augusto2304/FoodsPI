import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail,clearDetail } from '../../reducer/actions';
import s from './RecipeDetail.module.css'
import NavBar from '../NavBar/NavBar';



function RecipeDetail(props) {
    console.log(props)
    const dispatch = useDispatch()
    const id = props.match.params.id

    useEffect(()=>{
        dispatch(getDetail(id))
        return () => {
        dispatch(clearDetail());
        };
      },[dispatch,id]
      )

    const recipeId = useSelector((state) => state.recipeDetail)
    console.log(recipeId)
    return (
        <div>
            <NavBar/>

            {recipeId.name ?
                <div className={s.recipecontainer}>
                    <h1>{recipeId.name}</h1>

                    <div className={s.line1}>

                    <div>
                    <img className={s.image} src={recipeId.image ? recipeId.image : recipeId.image} alt=" not found"  />
                    </div>

                    <div className={s.healthdiets}>
                    <h2 className={s.diets}>Diets: {!id.includes('-') ? recipeId.diets + (' ') : recipeId.diets.map(e => e.name + (' '))}</h2>
                    <h2 className={s.healthscore}>Health Score: {recipeId.healthScore}</h2>
                    </div>
                    </div>

                    <div className={s.summarycontainer}>
                    <h3>{recipeId.summary.replace(/<[^>]+>/g, "")}</h3>
                    </div>

                    <div className={s.stepscontainer}>
                    <h3>Steps:{recipeId.steps && typeof recipeId.steps === "string" ? recipeId.steps
                        : recipeId.steps && recipeId.steps.map(e => (
                            <p key={e.number}>STEP {e.number} {e.step}</p>
                        ))}
                    </h3>
                    </div>

                </div>
                :
                <p>Loading...</p>
            }
        </div>
    )
};


export default RecipeDetail