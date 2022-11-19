import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getDiets, getRecipes, postRecipe } from "../reducer/actions";




export default function CreateRecipe() {
    const dispatch = useDispatch();
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
        dispatch(getRecipes())
    }, [dispatch]);



    function validate(form) {
        let errors = {};
        if (!form.name) errors.name = 'Name of recipe is required';
        if (form.name && !/^[a-zA-Z]*$/.test(form.name)) errors.name = 'The name cannot contain numbers or special caracters';
        if(allRecipes.find(e => e.name === form.name)) errors.name = ('We already have a recipe with that name')
        if (!form.summary) errors.summary = 'Summary of recipe is required';
        if (form.healthScore < 0 || form.healthScore > 100) errors.healthScore = ('The Health Score must be between 0 and 100');
        if (isNaN(form.healthScore)) errors.healthScore = ('The Health Score must be a number');
        


        return errors
    }

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

        alert('The recipe was created successfully')

    };

    function handleReset(e) {
        setForm({
            ...form,
            diets: []
        })
    }



 /*    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]); */




    return (
        <div>
            <h1>Create your recipe</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={form.name} name='name' onChange={(e) => handleChange(e)} />
                    {errors.name && (<p>{errors.name}</p>)}
                </div>
                <div>
                    <label>Summary:</label>
                    <input type="text" value={form.summary} name='summary' onChange={(e) => handleChange(e)} />
                    {errors.summary && (<p>{errors.summary}</p>)}
                </div>
                <div>
                    <label>Image:</label>
                    <input type="text" value={form.image} name='image' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Health Score:</label>
                    <input type="number" value={form.healthScore} name='healthScore' onChange={(e) => handleChange(e)} />
                    {errors.healthScore && (<p>{errors.healthScore}</p>)}
                </div>
                <div>
                    <label>Steps:</label>
                    <input type="text" value={form.steps} name='steps' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Diets:</label>

                    <select onChange={(e) => handleSelect(e)}>
                        {
                            diets.map((e) => {
                                return (
                                    <option value={e.name}>{e.name[0].toUpperCase() + e.name.substring(1)}</option>
                                )
                            })
                        }
                    </select>
                    <p>{form.diets.map(e => e[0].toUpperCase() + e.substring(1) + ', ')}</p>

                    <button type="button" onClick={handleReset}> Reset diets</button>
                </div>

                
                    <button  disabled={form.name === '' ||errors.name ||errors.summary ||errors.healthScore}>
                        Submit
                    </button>
               
            </form>
        </div>
    )
}


