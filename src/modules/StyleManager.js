const remoteURL = "http://localhost:8088"


export default {
getAll() {
    return fetch(`${remoteURL}/styles`).then(result => result.json())
  }
}