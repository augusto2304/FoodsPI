const axios = require('axios');
const {API_KEY} = process.env;
const { Recipe , Diets } = require('../db');

//traer info de API

const getApi = async () =>{
try {
  const apiUrl = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)
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


// traer info de DB

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
} catch (error) {
  console.error(error);
}
};

//concatenar infoDB e infoAPI

const getAll = async () => {
  const apiInfo = await getApi();
  const dbInfo = await getDb();
  if(dbInfo) {
  const concat = apiInfo.concat(dbInfo);
  return concat;
}else{
  return apiInfo
}
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// Traer receta por ID que venga de la DB y de la API


const getIdRecipe = async (id) => {
  if(id.includes('-')){
    const idDb = await Recipe.findByPk(id , {
      include: {
        model: Diets,
        attributes: ["name"],
      },
    });

/*     const idInfoDb =  {
        name: idDb.name,
        summary: idDb.summary,
        healthScore: idDb.healthScore,
        dishTypes: idDb.dishTypes?.map((e) => e),
        diets: idDb.diets?.map((e) => e.name), 
        steps: idDb.steps,
        image: idDb.image,
      };
   */

    return idDb
  }
  else{
  const idUrl = await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5")

   const filter = idUrl.data.results.filter(e => e.id.toString() === id)
/*   const idInfo = {
      name: idUrl.data.results.title,
      summary: idUrl.data.results.summary,
      dishTypes: idUrl.data.results.dishTypes?.map((element) => element),
      healthScore: idUrl.data.results.healthScore,
      diets: idUrl.data.results.diets,
      steps: idUrl.data.results.analyzedInstructions[0]?.steps.map((e) => {
          return {
            number: e.number,
            step: e.step,
          };
        }),
        image: idUrl.data.results.image,
    }; */
 
  return filter
}
};




// Agregar una receta con datos enviados por Body




const addRecipe = async (data) => {

  let {name,summary,healthScore,diets,steps,dishTypes } = data

/*   if(!name || !summary) throw new Error('faltan completar datos');
  if(healthScore < 0 || healthScore > 100) throw new Error ('el healthScore deberia ser un numero de 0 a 100');
  healthScore = healthScore?healthScore:0; */

  let newRecipe = await Recipe.create({
    name,
    summary,
    healthScore,
    steps,
    dishTypes
  });


  let dietDb = await Diets.findAll({
    where: {name:diets}
  });

  await newRecipe.addDiets(dietDb);

  return newRecipe

};


// traer todas las diets







module.exports = {
    getApi, getAll,addRecipe,getIdRecipe
}



//