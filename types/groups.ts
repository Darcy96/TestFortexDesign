import { Member } from './members'
import { Role } from './roles'

export type AppGroup = {
  id: string
  description: string
  members: number
  name: string
  people: Member[]
  roles: Role[]
  type: boolean
}
