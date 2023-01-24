import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDiets, postRecipe } from "../../reducer/actions";
import CreateBanner from "../Banners/CreateBanner";
import NavBar from "../NavBar/NavBar"
import s from './CreateRecipe.module.css'




export default function CreateRecipe() {
    const dispatch = useDispatch();
    const history = useHistory()
    const diets = useSelector((state) => state.diets);
    const [errors, setErrors] = useState({})
    const allRecipes = useSelector((state) => state.recipes);

    const [form, setForm] = useState({
        name: '',
        summary: '',
        image: '',
        healthScore: '',
        steps: '',
        diets: []
    });


    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch]);



    function validate(form) {
        let errors = {};
        if (!form.name) errors.name = 'Name of recipe is required';
        if (form.name && !/^[a-zA-Z" "]*$/.test(form.name)) errors.name = 'The name cannot contain numbers or special characters';
        if (allRecipes.find(e => e.name === form.name)) errors.name = ('We already have a recipe with that name')
        if (!form.summary) errors.summary = 'Summary of recipe is required';
        if (form.healthScore < 0 || form.healthScore > 100) errors.healthScore = ('The Health Score must be between 0 and 100');
        if (isNaN(form.healthScore)) errors.healthScore = ('The Health Score must be a number');

        return errors
    };

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
        }))
    };


    function handleSelect(e) {
        setForm({
            ...form,
            diets: [...form.diets, e.target.value]
        })

    }


    function handleSubmit(e) {
        e.preventDefault(e);
        dispatch(postRecipe(form));
        setForm({
            name: '',
            summary: '',
            image: '',
            healthScore: '',
            steps: '',
            diets: []
        })
        alert('The recipe was created successfully');

        history.push('/home')

    };

    function handleReset(e) {
        setForm({
            ...form,
            diets: []
        })
    }


    return (

        <div>
            {console.log(diets)}
            <NavBar />
            <CreateBanner />

            <form className={s.formcontainer} onSubmit={(e) => handleSubmit(e)}>
                <label className={s.labels}>Name:</label>

                <div>
                    <input  className={s.input} type="text" value={form.name} name='name' onChange={(e) => handleChange(e)} />
                </div>

                <label className={s.labels}>Image:</label>
                <div>
                    <input  className={s.input} type="text" value={form.image} name='image' onChange={(e) => handleChange(e)} />
                </div>

                <label className={s.labels}>Health Score:</label>
                <div>
                    <input className={s.input} type="number" value={form.healthScore} name='healthScore' onChange={(e) => handleChange(e)} />
                </div>

                <label className={s.labels}>Diets:</label>
                <div>
                    <div>
                    <select className={s.select} onChange={(e) => handleSelect(e)}>
                        {
                            diets.map((e) => {
                                return (
                                    <option  className={s.option} value={e.name}>{e.name[0].toUpperCase() + e.name.substring(1)}</option>
                                )
                            })
                        }
                    </select>
                    <button  className={s.resetbtn} type="button" onClick={handleReset}>Reset</button>
                    </div>
                    <h4 className={s.dietsdetail}>{form.diets.map(e => e[0].toUpperCase() + e.substring(1) + ', ')}</h4>
                </div>

                <label className={s.labels}>Summary:</label>
                <div>
                    <textarea className={s.textarea} type="text" value={form.summary} name='summary' onChange={(e) => handleChange(e)} />
                </div>

                <label className={s.labels} >Steps:</label>
                <div>
                    <textarea className={s.textarea} type="text" value={form.steps} name='steps' onChange={(e) => handleChange(e)} />
                </div>

                

                <button className={s.submitbtn} disabled={form.name === '' || errors.name || errors.summary || errors.healthScore}>
                    Submit
                </button>

                <div>
                    {(errors.name || errors.summary ||errors.healthScore) && <h4 className={s.labels}>Errors:</h4>}

                    <div className={s.errors}>
                        {errors.name && (<h4>{errors.name}</h4>)}
                        {errors.summary && (<h4>{errors.summary}</h4>)}
                        {errors.healthScore && (<h4>{errors.healthScore}</h4>)}
                    </div>
                </div>

            </form>
        </div>
    )
}


