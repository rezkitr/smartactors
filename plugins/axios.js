export default function ({ $axios }) {
  $axios.onRequest((config) => {
    console.log(config)
    $axios.setHeader('Content-Type', 'application/json', ['post'])
  })
}
