const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '41313462-a1bd1fc2b4382ed7475f290bb';
const options = 'image_type=photo&orientation=horizontal&safesearch=true';

export const PixabayAPIService = (query, page) => {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${query}&${options}&page=${page}&per_page=12`
  );
};
