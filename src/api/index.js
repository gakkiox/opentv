// import {getItem, setItem} from '../utils/storage.js';

function get(url) {
  const baseurl = global.baseurl;
  return new Promise((resolve, reject) => {
    fetch(baseurl + url, {
      method: 'get',
    })
      .then(response => response.text())
      .then(responseText => {
        resolve(JSON.parse(responseText));
      });
  });
}
function post(url, data = {}) {
  const baseurl = global.baseurl;
  return new Promise((resolve, reject) => {
    // let baseurl = global.defaulturl;
    // let dat = await getItem('baseurl');
    // if (dat.status) {
    //   baseurl = dat.value;
    // }
    fetch(baseurl + url, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        console.log('my post error  ', err);
        reject(err);
      });
  });
}

export function getTeleplayClassify(data) {
  return post('/v1/app/tv/classify', data);
}
export function getMovieClassify(data) {
  return post('/v1/app/movie/classify', data);
}
export function getTeleplayList(data) {
  return post('/v1/app/tv/list', data);
}
export function getMovieList(data) {
  return post('/v1/app/movie/list', data);
}
export function getMovieInfo(data) {
  return post('/v1/app/movie/info', data);
}
export function getTeleplayInfo(data) {
  return post('/v1/app/tv/info', data);
}
export function getTeleplayPlay(data) {
  return post('/v1/app/tv/play', data);
}
export function getConfigSpace(data) {
  return post('/v1/config/space', data);
}
