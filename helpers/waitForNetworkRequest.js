export default function waitForNetworkRequest(request) {
  return new Promise(resolve => setTimeout(() => request().then(resolve), 5000))
}
