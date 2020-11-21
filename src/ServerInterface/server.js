import places from './data.js';

let addPlace = (name, category, city, state) => {
    let newPlace = {name: name, category: category, city: city, state: state, reviews: []};
    places.push(newPlace);
}
let getPlaces = () => {
    return places;
}
let removePlace = (place) => {
    let index = places.indexOf(place);
    places.splice(index, 1)
}
let addReview = (place, review) => {
    let index = places.indexOf(place);
    places[index].reviews.push(review);
}
let server = {addPlace: addPlace, getPlaces: getPlaces, removePlace: removePlace, addReview: addReview};

export default server;