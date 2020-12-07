const btn = document.querySelector('.btn');
const content = document.querySelector('.content');
const img = document.querySelector('.container img')

const URL = 'https://api.chucknorris.io/jokes/random';

btn.addEventListener('click', async () =>{
    try {
        const data =  await fetch(URL);
        const response = await data.json();
        displayData(response);
    } catch (error) {
        console.log(error);
    }
    
})


function displayData({value:joke}){
    img.classList.add('shake-img');
    content.textContent = joke;
    const random = Math.random() * 1000;
    setTimeout(() =>{
    img.classList.remove('shake-img');
    },random)
}

// using fetch
// btn.addEventListener('click', () =>{
//     fetch(URL)
//     .then(data => {
//         if(data.ok){
//             return data.json();
//         }
//         else{
//             throw new Error('something went wrong');
//         }
//     })
//     .then(d => displayData(d))
//     .catch(err => console.log(err));
// })



// function getData(url){
//     return new Promise((resolve,reject) =>{

//         const xhr = new XMLHttpRequest();
//         xhr.open('GET',url);
//         xhr.send();
//         xhr.onreadystatechange = () =>{
//             if(xhr.readyState !==4) 
//                 return;
//             if(xhr.status === 200){
//                 resolve(xhr.responseText);
//             }
//             else{
//                 reject({
//                     status:xhr.status,
//                     text: xhr.statusText,
//                     state:xhr.readyState,
//                 });
//             }
//         };

//     });

// }