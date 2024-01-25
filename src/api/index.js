// import {getItem, setItem} from '../utils/storage.js';

function get(url) {
  const baseurl = global.baseurl;
  let uri = baseurl + url;
  return new Promise((resolve, reject) => {
    fetch(uri, {
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
  let uri = baseurl + url;
  return new Promise((resolve, reject) => {
    let fetchHandle = fetch(uri, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    _fetch(fetchHandle, 3000)
      .then(response => response.json())
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        console.log('my post error  ' + uri, err);
        reject(err);
      });
  });
}
// 超时放弃请求
function _fetch(fetch_promise, timeout) {
  var abort_fn = null;
  var abort_promise = new Promise(function (resolve, reject) {
    abort_fn = function () {
      reject('abort promise');
    };
  });
  var abortable_promise = Promise.race([fetch_promise, abort_promise]);

  setTimeout(function () {
    abort_fn();
  }, timeout);

  return abortable_promise;
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
