const { Router } = require('express');
const { Recipe , Diets } = require('../db');
const{ getAll, addRecipe, getIdRecipe} = require('../controllers/controller');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);















/*  [ ] GET /recipes?name="...":
Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
Si no existe ninguna receta mostrar un mensaje adecuado */


router.get('/recipes' , async (req,res) => {
    const { name } = req.query;
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
});




/* [ ] GET /recipes/{idReceta}:
Obtener el detalle de una receta en particular
Debe traer solo los datos pedidos en la ruta de detalle de receta
Incluir los tipos de dieta asociados */

/* router.get('/recipes/:id', async (req, res) => {
    let id = req.params.id
    try {
        if(id.includes('-')){
            const idDb = await Recipe.findByPk(id , {
              include: {
                model: Diets,
                attributes: ["name"],
              },
            });
            res.status(200).send(idDb)
        }else{
                const idUrl = await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5")
              
                 const filter = idUrl.data.results.filter(e => e.id.toString() === id)
        
                res.status(201).send(filter)
              }
           
} catch (error) {
        return res.status(404).send(error.message)
    }
}) */



router.get("/recipes/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const idRecipes = await getIdRecipe(id);
        return res.send(idRecipes);
    } 
    catch (error) {
        return res.status(404).send(error.message)
    }
  }); 




/* [ ] POST /recipes:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
Crea una receta en la base de datos relacionada con sus tipos de dietas. */


router.post('/recipes' , async (req,res) => {
    try {
        console.log(req.body);

        let {name,summary,healthScore,diets,steps,dishTypes } = req.body
        
          let newRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
            dishTypes
          });
        
        
/*        let dietDb = await Diets.findAll({
            where: {name:diets}
          }); 
        
          await newRecipe.addDiets(dietDb); */

         let dietPrueba =  await Diets.create(diets)

         await newRecipe.addDiets(dietPrueba.id)
        
       res.status(200).send("se creo la receta")

    } catch (error) {
        return res.status(404).send(error.message)
    }
})





/* router.post('/recipes' , async (req,res) => {
    try {
        console.log(req.body);
       await addRecipe(req.body)
       res.status(200).send("se creo la receta")
    } catch (error) {
        return res.status(404).send(error.message)
    }
})
 */












/* 

[ ] GET /diets:
Obtener todos los tipos de dieta posibles
En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá  */








module.exports = router;
