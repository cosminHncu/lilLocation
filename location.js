"use strict";
//https://restcountries.com/v3.1/name/${country}
//https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=863f242f7191482cbba7f7bf999c9391
const container = document.querySelector(`.container`);
const btn = document.querySelector(`.btn`);
const body = document.querySelector(`body`);
//const wherAmI = btn.addEventListener(`click`, function () {
//  navigator.geolocation.getCurrentPosition(
//    (data) => {
//      const { latitude, longitude } = data.coords;
//      console.log([latitude, longitude]);
//      fetch(
//        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=863f242f7191482cbba7f7bf999c9391`
//      )
//        .then((resp) => resp.json())
//        .then((data) => {
//          const location = data.results[0].components;
//          console.log(location);
//        const html = `
//<div class="container">
//    <h1 class="header">
//      <span><img class="pin" src="/img/64113.png" alt="" /></span> Location:
//    </h1>
//    <div class="info">
//      <p>Country: <span class = "bolder">${location.country}</span></p>
//      <p>City: <span class = "bolder">${location.city}, ${location.postcode}</span></p>
//      <p>Address: <span class = "bolder">${location.house_number} ${location.road}</span></p>
//      <p>Municipality: <span class = "bolder">${location.municipality}</span></p>
//      <p>Suburb: <span class = "bolder">${location.suburb}</span></p>
//    </div>
//  </div>
//`;
//        body.insertAdjacentHTML(`afterbegin`, html);
//        })
//        .catch((err) => {
//          console.log(msgError);
//        });
//    },
//    () => {
//      const msgError = `...faild to get position...`;
//      console.error(msgError);
//    }
//  );
//});
/////////////////////////////////////////////////////////
const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        resolve(data);
      },
      () => {
        reject(alert(`Faild to get your location.`));
      }
    );
  });
};

const getLocation = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    console.log([latitude, longitude]);
    latitude && longitude
      ? resolve(
          fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=863f242f7191482cbba7f7bf999c9391`
          )
        )
      : reject(console.error(`faild`));
  });
};
const insertHtml = (location) => {
  const html = `
  <div class="container">
      <h1 class="header">
        <span><img class="pin" src="/64113.png" alt="" /></span> Location:
      </h1>
      <div class="info">
        <p>Country: <span class = "bolder">${location.country}</span></p>
        <p>City: <span class = "bolder">${location.city}, ${location.postcode}</span></p>
        <p>Address: <span class = "bolder">${location.house_number} ${location.road}</span></p>
        <p>Municipality: <span class = "bolder">${location.municipality}</span></p>
        <p>Suburb: <span class = "bolder">${location.suburb}</span></p>
      </div>
    </div>
  `;
  body.insertAdjacentHTML(`afterbegin`, html);
};
const consumePosition = () =>
  getPosition()
    .then((position) => {
      const { latitude, longitude } = position.coords;
      getLocation(latitude, longitude)
        .then((response) => response.json())
        .then((data) => {
          const location = data.results[0].components;
          insertHtml(location);
        });
    })
    .then((err) => console.error(err));

const wherAmI = btn.addEventListener(`click`, consumePosition);
