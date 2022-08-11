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
  // clearGalleryContainer();
  newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  // console.log(newsApiService.query);

  if (newsApiService.query === '') {
    return Notify.failure('Введи что-то нормальное');
  }

  loadMoreBtn.show();
  newsApiService.resetPage();
  // clearArticlesContainer();

  newsApiService.fetchGallery().then(hits => console.log(hits));
}

function onLoadMore() {
  newsApiService.fetchGallery().then(hits => console.log(hits));
}

// function fetchGallery() {
//   loadMoreBtn.disable();
//   newsApiService.fetchGallery();
//   loadMoreBtn.enable();
// }

function appendMarkupInGallery(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
}
const markup = data.hits
  .map(
    (
      webformatURL,
      tags,
      likes,
      views,
      comments,
      downloads
    ) => `<div class="photo-card">
// //   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
// //   <div class="info">
// //     <p class="info-item">
// //       <b>Likes ${likes}</b>
// //     </p>
// //     <p class="info-item">
// //       <b>Views ${views}</b>
// //     </p>
// //     <p class="info-item">
// //       <b>Comments ${comments}</b>
// //     </p>
// //     <p class="info-item">
// //       <b>Downloads ${downloads}</b>
// //     </p>
// //   </div>
// // </div>`
  )
  .join('');

// console.log(markup);

// function clearGalleryContainer() {
//   refs.galleryContainer.innerHTML = '';
// }

// function appendArticlesMarkup() {
//   refs.galleryContainer.insertAdjacentHTML('afterbegin', markup);
// }
