import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getDiets, postRecipe } from "../reducer/actions";




export default function CreateRecipe() {
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets);
    const lis = diets.map((e) => e.name);

    const [form, setForm] = useState({
        name: '',
        summary: '',
        image: '',
        healthScore: '',
        steps: '',
        diets: []
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        console.log(form)
    };

    function handleSelect(e) {
        setForm({
            ...form,
            diets: [...form.diets, e.target.value]
        })
        console.log(form)
    }


    function handleSubmit(e) {
        e.preventDefault(e);
        dispatch(postRecipe(form));
        alert('¡Receta creada!');
         setForm({
            name: '',
            summary: '',
            image: '',
            healthScore: '',
            steps: '',
            diets: []
        }) 
        
    };

    function handleReset(e) {
        setForm({
            ...form,
            diets: []
        })
    }



    useEffect(() => {
        dispatch(getDiets());
    }, []);




    return (
        <div>
            <h1>Create your recipe</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={form.name} name='name' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Summary</label>
                    <input type="text" value={form.summary} name='summary' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Image</label>
                    <input type="text" value={form.image} name='image' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Health Score</label>
                    <input type="number" value={form.healthScore} name='healthScore' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Steps</label>
                    <input type="text" value={form.steps} name='steps' onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Diets</label>

                    <select onChange={(e) => handleSelect(e)}>
                        {
                            diets.map((e) => {
                                return (
                                    <option value={e.name}>{e.name[0].toUpperCase() + e.name.substring(1)}</option>
                                )
                            })
                        }
                    </select>
                    <ul>
                        <li>{form.diets.map(e => e[0].toUpperCase() + e.substring(1) + ', ')}</li>
                    </ul>
                    <button type="button" onClick={handleReset}> Reset diets</button>
                </div>

                <button type="submit">Crear receta</button>
            </form>
        </div>
    )
}
