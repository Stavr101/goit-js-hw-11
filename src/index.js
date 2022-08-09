import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

// import NewsApiService from './js/components/news-service';
// import LoadMoreBtn from './js/components/load-more-btn';

const API_KEY = '29154782-64abcd202d8466e583ce5ca87';
const BASE_URL = 'https://pixabay.com/api/';

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchButton: document.querySelector('button[data-search]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

//   const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

// import articlesTpl from './templates/articles.hbs';
// import './css/common.css';
// import NewsApiService from './js/components/news-service';
// import LoadMoreBtn from './js/components/news-service';

// const refs = {
//   searchForm: document.querySelector('.js-search-form'),
//   articlesContainer: document.querySelector('.js-articles-container'),
// };
// const loadMoreBtn = new LoadMoreBtn({
//   selector: '[data-action="load-more"]',
//   hidden: true,
// });
// const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
// loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

let page = 1;

function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget.elements.searchQuery.value;
  // console.log(e.currentTarget.elements.searchQuery.value);
  if (searchQuery === '') {
    return alert('Введи что-то нормальное');
  }
  const getPosts = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
      );
      console.log(getPosts);
      // createList(response.data);
      // this.incrementPage();
    } catch (error) {
      console.log(error);
    }
  };
}
// loadMoreBtn.show();
// newsApiService.resetPage();
// clearArticlesContainer();

// fetchArticles();

// function fetchArticles() {
//   loadMoreBtn.disable();
//   newsApiService.fetchArticles().then(articles => {
//     appendArticlesMarkup(articles);
//     loadMoreBtn.enable();
//   });
// }

// function appendArticlesMarkup(articles) {
//   refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles));
// }

// function clearArticlesContainer() {
//   refs.articlesContainer.innerHTML = '';
// }
