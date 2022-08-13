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
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  if (newsApiService.query === '') {
    return Notify.failure('Введи что-то нормальное');
  }

  newsApiService.resetPage();
  clearGalleryContainer();

  newsApiService.fetchGallery().then(data => {
    if (data.hits.length === 0) {
      Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );
    } else {
      Notify.success(`Hooray! We found ${data.totalHits} images`);
      insertContent(data.hits);
      loadMoreBtn.show();
    }
    if (newsApiService.page > Math.ceil(data.total / 40)) {
      loadMoreBtn.hide();
    }
  });
}

function onLoadMore() {
  newsApiService.fetchGallery().then(data => {
    Notify.success(`Hooray! We found ${data.totalHits} images`);
    if (newsApiService.page > Math.ceil(data.total / 40)) {
      Notify.success(
        `We're sorry, but you've reached the end of search results.`
      );
      loadMoreBtn.hide();
    } else {
      insertContent(data.hits);
    }
  });
}

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

const generateContent = array =>
  array ? array.reduce((acc, item) => acc + createListItem(item), '') : '';

const insertContent = array => {
  const result = generateContent(array);
  refs.galleryContainer.insertAdjacentHTML('beforeend', result);
};

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}
const { height: cardHeight } =
  refs.galleryContainer.firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});

let gallery = '.gallery a'.simpleLightbox();

gallery.next(); // Next Image

// let gallery = new SimpleLightbox('.gallery a', {
//   captionDelay: 250,
//   captionPosition: 'bottom',
// });
