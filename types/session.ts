export type Session = {
  token: string
  mail: string
  name: string
  organizationId: string
  permissions: string[]
}

export type SessionStatus = 'not-logged' | 'logged' | 'logging'
