import { ShortcutCategory } from '../enums'
import { BaseEntity, UUID } from './misc'

export interface Shortcut extends BaseEntity {
  userId: UUID
  name: string
  url: string
  iconUrl: string
  category: ShortcutCategory
  priority: number
}

export type CreateShortcutRequest = Omit<Shortcut, 'createdAt' | 'id'>
export type UpdateShortcutRequest = Omit<Shortcut, 'createdAt'>

interface ShortcutIdObject {
  id: UUID
}

export type ShortcutIdResponse = ShortcutIdObject
export type DeleteShortcutRequest = ShortcutIdObject