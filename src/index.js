import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

import NewsApiService from './js/components/news-service';
import LoadMoreBtn from './js/components/load-more-btn';

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchButton: document.querySelector('[data-action="search"]'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  // console.log(newsApiService.query);

  if (newsApiService.query === '') {
    return Notify.failure('Введи что-то нормальное');
  }

  loadMoreBtn.show();
  newsApiService.resetPage();
  // clearArticlesContainer();
  clearGalleryContainer();

  newsApiService.fetchGallery().then(data => {
    // console.log('data', data);
    Notify.success(`Hooray! We found ${data.totalHits} images`);
    insertContent(data.hits);
  });
}

function onLoadMore() {
  newsApiService.fetchGallery().then(data => {
    // console.log('data', data);
    Notify.success(`Hooray! We found ${data.totalHits} images`);
    insertContent(data.hits);
  });
}

// function fetchGallery() {
//   loadMoreBtn.disable();
//   newsApiService.fetchGallery();
//   loadMoreBtn.enable();
// }

const createListItem = item => ` <a href="${
  item.largeImageURL ? item.largeImageURL : ''
}>
<div class="photo-card">
  ${
    item.webformatURL
      ? `<img src="${item.webformatURL}" alt="${item.tags}" loading="lazy"`
      : ''
  } />
  <div class="info">
  <p class="info-item">
       <b>Likes ${item.likes ? item.likes : ''}</b>
     </p>
     <p class="info-item">
       <b>Views ${item.views ? item.views : ''}</b>
     </p>
     <p class="info-item">
       <b>Comments ${item.comments ? item.comments : ''}</b>
     </p>
     <p class="info-item">
       <b>Downloads ${item.downloads ? item.downloads : ''}</b>
     </p>
   </div>
 </div></a>`;

// const generateContent = (array) => array?.reduce((acc, item) => acc + createListItem(item), "");
const generateContent = array =>
  array ? array.reduce((acc, item) => acc + createListItem(item), '') : '';

const insertContent = array => {
  const result = generateContent(array);
  refs.galleryContainer.insertAdjacentHTML('beforeend', result);
};

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}
