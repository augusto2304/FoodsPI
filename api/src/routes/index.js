const { Router } = require('express');
const { Recipe , Diets } = require('../db');
const{ getAll, addRecipe, getIdRecipe,getDiets} = require('../controllers/controller');
const recipeRouter = require('./recipe.js')
const dietRouter = require('./diets.js')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);















/*  [ ] GET /recipes?name="...":
Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
Si no existe ninguna receta mostrar un mensaje adecuado */



router.use('/recipes', recipeRouter)


/* router.get('/recipes' , async (req,res) => {
    const { name } = req.query;
    console.log(name)
    const allRecipes = await getAll();
    try {
        if(name){
            const resultFilter = allRecipes.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            if(resultFilter.length === 0) {return res.status(404).send('No se encontro ninguna receta.')}
            return res.status(200).send(resultFilter)
        }else{
            return res.status(201).send(allRecipes)
        }

        
    } catch (error) {
        console.error(error)
        
    }
}); */




/* [ ] GET /recipes/{idReceta}:
Obtener el detalle de una receta en particular
Debe traer solo los datos pedidos en la ruta de detalle de receta
Incluir los tipos de dieta asociados */




/* router.get("/recipes/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const idRecipes = await getIdRecipe(id);
        return res.send(idRecipes);
    } 
    catch (error) {
        return res.status(404).send(error.message)
    }
  });  */




/* [ ] POST /recipes:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
Crea una receta en la base de datos relacionada con sus tipos de dietas. */

/* router.post('/recipes' , async (req,res) => {
    try {
       await addRecipe(req.body)
       res.status(200).send("se creo la receta")
    } catch (error) {
        return res.status(404).send(error.message)
    }
}) */




/* 

[ ] GET /diets:
Obtener todos los tipos de dieta posibles
En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá  */


router.use('/diets' , dietRouter)

/* router.get('/diets', async (req,res) => {
    const allDiets = await getDiets();
    try {
        res.status(200).send(allDiets)
    } catch (error) {
        res.status(404).send(error.message)
        
    }
}) */







module.exports = router;
