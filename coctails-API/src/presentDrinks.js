import fetchDrinks from './fetchDrinks.js'
import displayDrinks from './displayDrinks.js'

const showDrinks = async(url) =>{
    const data = await fetchDrinks(url);
    // console.log(data);

    const section = await displayDrinks(data);
    
}
export default showDrinks;