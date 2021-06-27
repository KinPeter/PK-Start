import * as fs from 'fs'
import * as path from 'path'
import { ShortcutEntity } from '../src/shortcuts/shortcut.entity'
import { UserEntity } from '../src/users/user.entity'

type SeedDataType = {
  users: Partial<UserEntity>[]
  shortcuts: Partial<ShortcutEntity>[]
}

export function useSeedData(): SeedDataType {
  const dataPath = path.resolve(__dirname, '../../../.seed-data.json')
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
  return data as SeedDataType
}