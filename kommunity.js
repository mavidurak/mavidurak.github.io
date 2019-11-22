(async () => {
  const axios = require('axios')
  const fs = require('fs')
  const url = 'https://api.kommunity.com/api/v1/mavidurakio/events?status=past&page=2'
  const response = await axios.get(url)
  const template = fs.readFileSync('2019-10-30-event-table.md', 'utf8')

  response.data.data
    .filter(event => event.name.indexOf('Yazılımcı Buluşması') === -1)
    .forEach(event => {
    const filename = './_posts/' + event.created_at.toString().substr(0, 10) + '-' + event.slug + '.md'

    if (fs.existsSync(filename) === false) {
      const content = template
        .replace('{name}', event.name)
        .replace('{created_at}', event.created_at)
        .replace('{detail}', event.detail)
        .replace('{lon}', event.venue.lng)
        .replace('{lat}', event.venue.lat)
      fs.writeFileSync(filename, content)
      console.log(filename + 'has been created')
    }    
  })

})();
