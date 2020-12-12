let API = "https://nickcady-mynearbyplaces.herokuapp.com";

let search = (searchTerm, location) => {
    return fetch(API + "/search/" + searchTerm + "/" + location).then(x => x.json());
}

let getReviews = (placeid) => {
    return fetch(API + "/reviews/" + placeid).then(x => x.json());
}

let addPlace = (name, category, city, state) => {
    return fetch(API + "/place", {
        method: "POST", 
        headers: { 
            "Content-Type": "application/json" 
        }, body: JSON.stringify({ 
            name: name, 
            category: category,
            city: city,
            state: state
        })
    }).then(x => console.log(x)).catch(e => console.log(e));
}

let addReview = (placeid, review) => {
    return fetch(API + "/review", {
        method: "POST", 
        headers: { 
            "Content-Type": "application/json" 
        }, body: JSON.stringify({ 
            placeid: placeid, 
            review: review})
    }).then(x => console.log(x)).catch(e => console.log(e));
}

let server = {addPlace: addPlace, getReviews: getReviews, addReview: addReview, search: search};

export default server;