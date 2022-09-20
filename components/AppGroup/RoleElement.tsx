import { Center, Chip, Group, Loader } from '@mantine/core'
import { useRoles } from 'hooks'
import { Role } from 'types'

export const RoleElement = ({ role }: { role: Role }) => {
  const { manageGroupRoles, loading } = useRoles()

  const toogleMemberActive = () => {
    manageGroupRoles(role.id)
  }
  return (
    <Chip onClick={toogleMemberActive} checked={role.active}>
     {loading ? <Loader variant='dots'  height={3} /> : <>{role.name}</>}
    </Chip>
  )
}
