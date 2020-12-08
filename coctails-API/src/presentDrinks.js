import fetchDrinks from './fetchDrinks.js'
import displayDrinks from './displayDrinks.js'
import setDrink from './setDrink.js'

const presentDrinks = async(url) =>{
    
    const data = await fetchDrinks(url);
    const section = await displayDrinks(data);
    
    
    if(section){
        setDrink(section);
    }


}
export default presentDrinks;