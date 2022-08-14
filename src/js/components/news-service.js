const API_KEY = '29154782-64abcd202d8466e583ce5ca87';
const BASE_URL = 'https://pixabay.com/api';
import axios from 'axios';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchGallery() {
    console.log(this);
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// const axios = require('axios').default;

// const fetchData = async (value, step) => {
//   const response = await axios.get(
//     `https://pixabay.com/api/?key=29183300-4ae58040b754f339761bcd063&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${step}`
//   );
//   return response;
// };
