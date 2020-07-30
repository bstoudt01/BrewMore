const remoteURL = "http://localhost:8088"

export default {
getAll() {
    return fetch(`${remoteURL}/statuses`).then(result => result.json())
  }
}