const remoteURL = "http://localhost:8088"

//return the fetcht
//return the result after paring with json (no return written but its still happening since itsneeded to pass the proinse along)
export default {
  get(id) {
    return fetch(`${remoteURL}/brands/${id}`).then(result => result.json())
  },

  getAll() {
    return fetch(`${remoteURL}/brands`).then(result => result.json())
  },

  delete(id) {
    return fetch(`${remoteURL}/brands/${id}`, {
      method: "DELETE"
    }).then(result => result.json())
  },
  
  post(newBrand) {
    return fetch(`${remoteURL}/brands`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBrand)
    }).then(data => data.json())
},

  update(editedBrand) {
    return fetch(`${remoteURL}/brands/${editedBrand.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedBrand)
    }).then(data => data.json());
},
// returns id property of randomBrand
getRandomId() {
  return fetch(`${remoteURL}/brands`)
    .then(result => result.json())
    .then(brands => {
      // random function, many ways out there to get random
      const randomIndex = Math.floor(Math.random() * brands.length);
      //look at the id of the reuturning brands, and assign to randomBrand and return the id of that brand 
      const randomBrand = brands[randomIndex];
      return randomBrand.id;
  });
},
//not being used yet
getWithStyleStatus() {
    return fetch(`${remoteURL}/brands/?_expand=style&_expand=status`)
      .then(result => result.json())
  },

  
//not being used yet
getSingleWithStyleStatus(id) {
  return fetch(`${remoteURL}/brands/${id}?_expand=style&_expand=status`)
    .then(result => result.json())
},

//creates list of brands based on statusId
getByStatusIdWithStyle(statusId) { 
  return fetch(`${remoteURL}/brands/?statusId=${statusId}&_expand=style&_expand=status`)
    .then(result => result.json())
},
getSingleUserByStatusIdWithStyle(userId,statusId) { 
  return fetch(`${remoteURL}/brands/?userId=${userId}&statusId=${statusId}&_expand=style&_expand=status`)
    .then(result => result.json())
},
getSingleUserWithStatusStyle(userId) { 
  return fetch(`${remoteURL}/brands/?userId=${userId}&_expand=style&_expand=status`)
    .then(result => result.json())
},


}