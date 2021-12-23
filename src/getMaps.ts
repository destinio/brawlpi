import axios from 'axios'
import cheerio from 'cheerio'

async function getMarkup(link: string) {
  const { data } = await axios.get(link)

  return data
}

async function getMaps() {
  const html = await getMarkup('https://brawlify.com/')
  const $ = cheerio.load(html)

  let maps: BrawlMap[] = []

  $('h3.event-title-text').each((_i, ele) => {
    const main = cheerio.load($(ele).parent().parent().parent().html() || '')

    const name = main('h3').text().split('\n')[1]
    const event = main('a.event-title-map').text()

    let brawlers: Brawler[] = []

    main('a.event-brl').each((_i, link) => {
      const name = link.attribs.title
      const rating = Number(main(link).text().split('\n')[1].split('%')[0])

      brawlers = [...brawlers, { name, rating }]
    })

    maps = [
      ...maps,
      {
        name,
        event,
        brawlers,
      },
    ]
  })

  return maps
}

export { getMaps }
