import get from './getElement.js';

const loading = get('.loading');
// console.log(loading);

export const hideLoading = () => {
    loading.classList.add('hide-loading');
}

export const showLoading = () => {
    loading.classList.remove('hide-loading');
}