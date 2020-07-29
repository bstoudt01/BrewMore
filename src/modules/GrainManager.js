const remoteURL = "http://localhost:8088"

//return the fetcht
//return the result after paring with json (no return written but its still happening since itsneeded to pass the proinse along)
export default {
getAll() {
    return fetch(`${remoteURL}/grains`).then(result => result.json())
  }
}