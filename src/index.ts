import inquirer from 'inquirer'
import Table from 'cli-table3'
import colors from 'colors'

import { getMaps } from './getMaps.js'
;(async () => {
  const data = await getMaps()

  const modes = Array.from(new Set(data.map(mode => mode.name)))

  const { selected } = await inquirer.prompt<{ selected: string }>({
    type: 'list',
    name: 'selected',
    message: 'Select a mode',
    choices: modes,
  })

  const filtered = data
    .filter(mode => mode.name === selected)
    .map(mode => {
      return {
        name: mode.event,
        value: mode.brawlers,
      }
    })

  const { brawlers } = await inquirer.prompt<{ brawlers: Brawler[] }>({
    type: 'list',
    name: 'brawlers',
    message: 'Select a map',
    choices: filtered,
  })

  const theTable = new Table({ head: [colors.rainbow('Brawler'), colors.yellow('Win Rate')] })

  brawlers.forEach(brawler => {
    theTable.push([
      colors.white(brawler.name),
      brawler.rating >= 60
        ? colors.green(String(brawler.rating))
        : colors.yellow(String(brawler.rating)),
    ])
  })

  console.log(theTable.toString())
})()
