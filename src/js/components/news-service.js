// const API_KEY = '29154782-64abcd202d8466e583ce5ca87';
// const BASE_URL = 'https://pixabay.com/api/';

// const options = {
//   headers: {
//     Authorization: API_KEY,
//   },
// };

// export default class NewsApiService {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }

//   fetchArticles() {
//     const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

//     return fetch(url, options)
//       .then(response => response.json())
//       .then(data => console.log(data))
//       .catch(error => console.log(error));
//     // .then(({ articles }) => {
//     // this.incrementPage();
//     // return articles;
//     //   });
//   }

//   incrementPage() {
//     this.page += 1;
//   }

//   resetPage() {
//     this.page = 1;
//   }

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }

//     fetchGallery() {
//     const getPosts = async () => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
//         );
//         createList(response.data);
//         this.incrementPage();
//       } catch (error) {
//         console.log(error);
//       }
//     };
//   }

//   incrementPage() {
//     this.page += 1;
//   }

//   resetPage() {
//     this.page = 1;
//   }

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }
