import fs from 'fs'
import path from 'path'
import { faker } from '@faker-js/faker'

import { labels, priorities, statuses } from './data'

const tasks = Array.from({ length: 100 }, () => ({
  id: `TASK-${faker.number.int({ max: 9999, min: 1000 })}`,
  label: faker.helpers.arrayElement(labels).value,
  priority: faker.helpers.arrayElement(priorities).value,
  status: faker.helpers.arrayElement(statuses).value,
  title: faker.hacker.phrase().replace(/^./u, letter => letter.toUpperCase())
}))

fs.writeFileSync(path.join(__dirname, 'tasks.json'), JSON.stringify(tasks, null, 2))

console.log('✅ Tasks data generated.')
