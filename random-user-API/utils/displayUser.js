import get from './getElement.js';


const img = get('.user-img');
const title = get('.user-title');
const value = get('.user-value');

const btns = [...document.querySelectorAll('.icon')];



const displayUser = (person) => {
    img.src = person.image;
    value.textContent = person.name;
    title.textContent = `My Name is`;
    btns.map(button => button.classList.remove('active'));

    btns[0].classList.add('active');

    btns.forEach((item)=>{

        item.addEventListener('click',()=>{
            let property =  item.dataset.label;
            title.textContent = `My ${property}`;
            value.innerHTML = `${person[property]}`;
            // console.log(person.email);

            btns.map(button => button.classList.remove('active'));
            item.classList.add('active');

        })
    })
}
export default displayUser;