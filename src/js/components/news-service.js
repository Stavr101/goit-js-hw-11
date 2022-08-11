const API_KEY = '29154782-64abcd202d8466e583ce5ca87';
const BASE_URL = 'https://pixabay.com/api';

// const options = {
//   headers: {
//     Authorization: API_KEY,
//   },
// };

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
        return data.hits;
      });
    //   .then(console.log);
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
