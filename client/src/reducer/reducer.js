
const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    recipeDetail: [],
};


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case 'GET_RECIPE_BY_NAME':
            return{
                ...state,
                recipes: action.payload
            }
        case 'GET_DIETS':
            return{
                ...state,
                diets: action.payload
            }
        case 'GET_DETAIL':
            return{
                ...state,
                recipeDetail: action.payload
            }  
        case 'CLEAR_DETAIL':
            return{
                ...state,
                recipeDetail: action.payload
            }      
        case 'FILTER_BY_DIETS':
            const allRecipes = state.allRecipes;
            const dietsFiltered = action.payload ==='all' ? allRecipes : allRecipes.filter(e => e.diets.includes(action.payload));
            return{
                ...state,
                recipes: dietsFiltered
            }
        case 'FILTER_BY_ORDER':
            const filterOrder = action.payload === 'all'? 
            state.recipes.sort((a,b) =>{
                if(a.id > b.id) return 1
                if(a.id < b.id) return -1
                return 0
            })
            :
            action.payload === 'asc' ? 
            state.recipes.sort((a,b) =>{
                if(a.name > b.name) return 1
                if(a.name < b.name) return -1
                return 0
            }) 
            :
            state.recipes.sort((a,b) =>{
                if(a.name > b.name) return -1
                if(a.name < b.name) return 1
                return 0
            })
            return {
                ...state,
                recipes: filterOrder
            }
        case 'FILTER_BY_HS':
            const filterHs = action.payload === 'healthScore'? 
            state.recipes.sort((a,b) =>{
                if(a.id > b.id) return 1
                if(a.id < b.id) return -1
                return 0
            })
            :
            action.payload === 'Low - High' ? 
            state.recipes.sort((a,b) =>{
                if(a.healthScore > b.healthScore) return 1
                if(a.healthScore < b.healthScore) return -1
                return 0
            }) 
            :
            state.recipes.sort((a,b) =>{
                if(a.healthScore > b.healthScore) return -1
                if(a.healthScore < b.healthScore) return 1
                return 0
            })
            return {
                ...state,
                recipes: filterHs
            }      
        default:
            return state;

    }
};


export default rootReducer