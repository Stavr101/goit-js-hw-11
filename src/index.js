import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const API_KEY = '29154782-64abcd202d8466e583ce5ca87';
const BASE_URL = 'https://pixabay.com/api';

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchButton: document.querySelector('button[data-search]'),
  galleryContainet: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

// const options = {
//   headers: {
//     Authorization: API_KEY,
//   },
// };

refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click');

class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchGallery() {
    // e.preventDefault();
    // newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();

    // console.log(this.searchQuery);
    // if (newsApiService.query === '') {
    //   return Notify.failure('Введи что-то нормальное');
    // }
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    return fetch(url)
      .then(response => response.json())
      .then(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          this.incrementPage();
          return (
            webformatURL, largeImageURL, tags, likes, views, comments, downloads
          );
        }
      );
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

class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector('.load-more');

    return refs;
  }

  enable() {
    this.refs.button.disabled = false;
  }

  disable() {
    this.refs.button.disabled = true;
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}
// const loadMoreBtn = new LoadMoreBtn({
//   selector: '[data-action="load-more"]',
//   hidden: true,
// });

const newsApiService = new NewsApiService();

function onSearch(event) {
  event.preventDefault();
  newsApiService.query = event.currentTarget.elements.searchQuery.value;
  console.log(event.currentTarget.elements.searchQuery.value);
  if (newsApiService.query === '') {
    return Notify.failure('Введи что-то нормальное');
  }
  fetchGallery();
}

function fetchGallery() {
  // loadMoreBtn.disable();
  newsApiService.fetchGallery().then(data => {
    appendGalleryMarkup(
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads
    );
    // loadMoreBtn.enable();
  });
}
const galleryMarkup = createGalleryMarkup(
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads
);

function createGalleryMarkup() {
  return (
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads
      .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
        return `
      <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`;
      })
      .join('')
  );
}

function appendGalleryMarkup(
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads
) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', galleryMarkup);
}

function clearGalleryContainer() {
  refs.articlesContainer.innerHTML = '';
}
