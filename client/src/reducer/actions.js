import axios from 'axios';
import { bindActionCreators } from 'redux';

export function getRecipes(){
    return async function(dispatch){
        try {
            var json= await axios.get('http://localhost:3001/recipes');
            return dispatch({
                type: 'GET_RECIPES',
                payload:json.data
            }) 
        } catch (error) {
            console.log(error);
        }
    }
};

export function getRecipeByName(name){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
            return dispatch({
                type: 'GET_RECIPE_BY_NAME',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }     
    }
};

export function getDiets(){
    return async function(dispatch){
        try {
            var json = await axios.get('http://localhost:3001/diets');
            return dispatch({
                type: 'GET_DIETS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

/* export function postRecipe(input){
    return async function(dispatch){
        try {
            console.log(input)
            var json = await axios.post('http://localhost:3001/recipes',input);
            let msj = json.data;
            dispatch({type: 'POST_RECIPE', payload: msj})
            
        } catch (error) {
            console.log(error)
        }
    }
};  */

 export const postRecipe = (input) => {
    return async function(dispatch){
        console.log(input)
      //try
      let response= await axios.post(`http://localhost:3001/recipes`,input);
      let msj = response.data;
      dispatch({type: 'ADD_RECIPE', payload: msj})
    }
 }; 



export function filterRecipeByDiets(payload){
    return{
        type: 'FILTER_BY_DIETS',
        payload
    }
};


export function filterRecipeByOrder(payload){
    return{
        type: 'FILTER_BY_ORDER',
        payload
    }
};


export function filterRecipeByHs(payload){
    return{
        type:'FILTER_BY_HS',
        payload
    }
};
