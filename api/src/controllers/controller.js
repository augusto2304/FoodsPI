const axios = require('axios');
const { API_KEY } = process.env;
const { Recipe, Diets } = require('../db');

//Traer info de API
//   https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5/information&number=100
//   https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100

const getApi = async () => {
  try {
    const apiUrl = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5/information&number=100`)
    const apiInfo = apiUrl.data.results.map((e) => {
      return {
        id: e.id,
        name: e.title,
        summary: e.summary,
        image: e.image,
        healthScore: e.healthScore,
        dishTypes: e.dishTypes?.map((e) => e),
        steps: e.analyzedInstructions[0]?.steps.map((e) => {
          return {
            number: e.number,
            step: e.step,
          };
        }),
        diets: e.diets,
      };
    });
    return apiInfo;
  }
  catch (error) {
    console.error(error);
    return [];
  }
};


// Traer info de DB

const getDb = async () => {
  try {
    const dataDB = await Recipe.findAll({
      include: {
        model: Diets,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    return dataDB
  } catch (error) {
    console.error(error);
  }
};

//Concatenar infoDB e infoAPI

const getAll = async () => {
  const apiInfo = await getApi();
  const dbInfo = await getDb();
  if (dbInfo) {
    const concat = apiInfo.concat(dbInfo);
    return concat;
  } else {
    return apiInfo
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// Traer receta por ID que venga de la DB y de la API


const getIdRecipe = async (id) => {
  if (id.includes('-')) {
    const idDb = await Recipe.findByPk(id, {
      include: {
        model: Diets,
        attributes: ["name"],
      },
    });

    /*      const idInfoDb =  {
            name: idDb.name,
            summary: idDb.summary,
            healthScore: idDb.healthScore,
            dishTypes: idDb.dishTypes?.map((e) => e),
            diets: idDb.diets?.map((e) => e.name), 
            steps: idDb.steps,
            image: idDb.image,
          }; */


    return idDb
  }
  else {
    const idUrl = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)


    /*  https://api.spoonacular.com/recipes/{id}/information */
    /*  const filter = idUrl.data.results.filter(e => e.id.toString() === id) */


    /*  const idInfo = {
      name: filter.title,
      summary: filter.summary,
      dishTypes: filter.dishTypes?.map((e) => e),
      healthScore: filter.healthScore,
      diets: filter.diets,
      steps: filter.analyzedInstructions[0]?.steps.map((e) => {
          return {
            number: e.number,
            step: e.step,
          };
        }),
        image: filter.image,
    }; */


    const idInfo = {
      name: idUrl.data.title,
      summary: idUrl.data.summary,
      dishTypes: idUrl.data.dishTypes?.map((e) => e),
      healthScore: idUrl.data.healthScore,
      diets: idUrl.data.diets,
      steps: idUrl.data.analyzedInstructions[0]?.steps.map((e) => {
        return {
          number: e.number,
          step: e.step,
        };
      }),
      image: idUrl.data.image,
    };



    return idInfo


  }
};




// Agregar una receta con datos enviados por Body



const addRecipe = async (data) => {

  let { name, summary, healthScore, diets, steps, image } = data

  if (!name) throw new Error('Ingresar nombre de la receta.');
  if (!summary) throw new Error('Ingresar summary de la receta');
  if (healthScore < 0 || healthScore > 100) throw new Error('el healthScore debe ser un numero de 0 a 100');
  healthScore = healthScore ? healthScore : 0;

  let recipeDb = await Recipe.findAll({
    where: { name: name }
  });

  if (!recipeDb.length) {


    let newRecipe = await Recipe.create({
      name,
      summary,
      healthScore,
      steps,
      image
    });
    console.log(data)

    for (let i = 0; i < diets.length; i++) {
      const dietDb = await Diets.findAll({
        where:
          { name: diets[i].toLowerCase() }
      })
      await newRecipe.addDiets(dietDb[0].id)
    }
    return newRecipe

    /*     let dietDb = await Diets.findAll({
           where: { name: diets.toLowerCase()}
         });
       
         await newRecipe.addDiets(dietDb);
       
         return newRecipe */



  } else {
    throw new Error('La receta ya existe')
  }

};

/* for(let i=0; i<diets.length; i++){
  const newD = await Diet.findOrCreate({where: {name:diets[i]}})
  await newR.addDiet(newD[0].id)
} */


// Traer todas las diets


const getDiets = async () => {

  const dietsDb = await Diets.findAll();

  if (!dietsDb.length) {

    const allDiets = ['gluten free', 'ketogenic', 'vegetarian', 'lacto vegetarian', 'ovo vegetarian', 'lacto ovo vegetarian', 'vegan', 'pescetarian', 'paleo', 'primal', 'low FODMAP', 'whole30'];

    allDiets.forEach(e => {
      Diets.findOrCreate({ where: { name: e } })
    });

    return await Diets.findAll()
  } else {
    return dietsDb;
  }
};





module.exports = {
  getApi, getAll, addRecipe, getIdRecipe, getDiets
}



//