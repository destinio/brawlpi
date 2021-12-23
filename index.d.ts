interface Brawler {
  name: string
  rating: number
}

interface BrawlMap {
  name: string
  event: string
  brawlers: Brawler[]
}
