const remoteURL = "http://localhost:8088"

//return the fetcht
//return the result after paring with json (no return written but its still happening since itsneeded to pass the proinse along)
export default {
  get(id) {
    return fetch(`${remoteURL}/users/${id}`).then(result => result.json())
  },

  getAll() {
    return fetch(`${remoteURL}/users`).then(result => result.json())
  },

  delete(id) {
    return fetch(`${remoteURL}/users/${id}`, {
      method: "DELETE"
    }).then(result => result.json())
  },
  
  post(newUser) {
    return fetch(`${remoteURL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    }).then(data => data.json())
},

  

}