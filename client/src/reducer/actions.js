import axios from 'axios';


 export function getRecipes() {
    return async function (dispatch) {
        try {
            var json = await axios.get('/recipes');
            return dispatch({
                type: 'GET_RECIPES',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}; 



export function getRecipeByName(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`/recipes?name=${name}`);
            return dispatch({
                type: 'GET_RECIPE_BY_NAME',
                payload: json.data
            })
        } catch (error) {
            alert('La receta no existe');
        }
    }
};

export function getDiets() {
    return async function (dispatch) {
        try {
            var json = await axios.get('/diets');
            return dispatch({
                type: 'GET_DIETS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function getDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`/recipes/${id}`);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })

        } catch (error) {
            console.log(error)
        }
    }
};


export function clearDetail() {
    return {
        type: 'CLEAR_DETAIL',
        payload: []
    }
};



export function postRecipe(input) {
    return async function (dispatch) {
        console.log(input)
        let response = await axios.post(`/recipes`, input);
        let msj = response.data;
        dispatch({ type: 'ADD_RECIPE', payload: msj })
    }
};



export function filterRecipeByDiets(payload) {
    return {
        type: 'FILTER_BY_DIETS',
        payload
    }
};


export function filterRecipeByOrder(payload) {
    return {
        type: 'FILTER_BY_ORDER',
        payload
    }
};


export function filterRecipeByHs(payload) {
    return {
        type: 'FILTER_BY_HS',
        payload
    }
};


export function setCurrentPage(page){
    return {
        type: 'SET_CURRENT_PAGE',
        payload: page
    }
};








