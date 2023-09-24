let baseurl = global.baseurl
function get(url) {
  return new Promise(((resolve, reject) => {
    fetch(baseurl + url, {
      method: "get",
    }).then((response) => response.text())
      .then((responseText) => {
        resolve(JSON.parse(responseText));
      });
  }))
}
function post(url, data={}) {
  return new Promise(((resolve, reject) => {
    fetch(baseurl + url, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then((data) => {
        resolve(data);
      }).catch(err=>{
        console.log("my post error  ",err);
        reject(err)
      });
  }))
}

export function getTeleplayClassify(data) {
  return post("/tv/get_teleplay_class", data)
}
export function getMovieClassify(data) {
  return post("/tv/get_movie_class", data)
}
export function getTeleplayList(data) {
  console.log(data)
  return post("/tv/get_teleplay_list", data)
}
export function getMovieList(data) {
  return post("/tv/get_movie_list", data)
}
export function getMovieDetail(data) {
  return post("/tv/get_movie_detail", data)
}
export function getTeleplayDetail(data) {
  return post("/tv/get_teleplay_detail", data)
}