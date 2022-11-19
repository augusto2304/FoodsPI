import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail,clearDetail } from '../reducer/actions';
import { Link} from 'react-router-dom';



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

            {recipeId.name ?
                <div>
                    <h1>Name: {recipeId.name}</h1>
                    <img src={recipeId.image ? recipeId.image : recipeId.image} alt=" not found" />
                    <h2>Summary: {recipeId.summary.replace(/<[^>]+>/g, "")}</h2>
                    <h2>Health Score: {recipeId.healthScore}</h2>
                    <h2>Diets: {!id.includes('-') ? recipeId.diets + (' ') : recipeId.diets.map(e => e.name + (' '))}</h2>
                    <h2>Steps:{recipeId.steps && typeof recipeId.steps === "string" ? recipeId.steps
                        : recipeId.steps && recipeId.steps.map(e => (
                            <p key={e.number}>STEP {e.number} {e.step}</p>
                        ))}
                    </h2>

                </div>
                :
                <p>Loading...</p>
            }
            <Link to='/home'>
                <button>Back</button>
            </Link>
        </div>
    )
};


export default RecipeDetail