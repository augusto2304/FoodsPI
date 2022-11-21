import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, clearDetail } from '../../reducer/actions';
import s from './RecipeDetail.module.css'
import NavBar from '../NavBar/NavBar';



function RecipeDetail(props) {
    console.log(props)
    const dispatch = useDispatch()
    const id = props.match.params.id

    useEffect(() => {
        dispatch(getDetail(id))
        return () => {
            dispatch(clearDetail());
        };
    }, [dispatch, id]
    )

    const recipeId = useSelector((state) => state.recipeDetail)
    console.log(recipeId)
    return (
        <div >
            <NavBar />

            <div className={s.maincontainer}>

                {recipeId.name ?
                    <div className={s.recipecontainer}>


                        <div className={s.line1}>

                            <div>
                                <img className={s.image} src={recipeId.image ? recipeId.image : recipeId.image} alt=" not found" />
                            </div>
                            <div className={s.namehealthdiets}>
                                <div>
                                    <h1 className={s.name}>{recipeId.name}</h1>
                                </div>
                                <div>
                                    <h2 className={s.diets}>Diets: {!id.includes('-') ? recipeId.diets + (' ') : recipeId.diets.map(e => e.name + (' '))}</h2>
                                </div>
                                <div>
                                    <h2 className={s.healthscore}>Health Score: {recipeId.healthScore}</h2>
                                </div>

                            </div>
                        </div>

                        <div className={s.summarycontainer}>
                            <h2>Summary</h2>
                            <h3>{recipeId.summary.replace(/<[^>]+>/g, "")}</h3>
                        </div>

                        <div className={s.stepscontainer}>
                            <h2>Steps</h2>
                            <h3>{recipeId.steps && typeof recipeId.steps === "string" ? recipeId.steps
                                : recipeId.steps && recipeId.steps.map(e => (
                                    <p key={e.number}>STEP {e.number} {e.step}</p>
                                ))}
                            </h3>
                        </div>

                    </div>
                    :
                    <div className={s.loadingcontainer}>
                    <h1>Loading...</h1>
                    </div>
                }
            </div>
        </div>
    )
};


export default RecipeDetail