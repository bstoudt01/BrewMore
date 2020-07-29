const remoteURL = "http://localhost:8088"

// API CALLS FOR DATA RELATIONSHIP TABLE HOLDING THE OBJECTS THAT CONTAIN BRANDID, GRAINID AND WEIGHT(VALUE OF RELATIONSHIP)

export default {
  get(brandId) {
    return fetch(`${remoteURL}/Inredients/${brandId}`).then(result => result.json())
  },
  post(newIngredient) {
    return fetch(`${remoteURL}/ingredients`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newIngredient)
    }).then(data => data.json())
},
}