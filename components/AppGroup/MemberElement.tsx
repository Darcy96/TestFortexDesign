import {
  Avatar,
  Card,
  Center,
  Group,
  Loader,
  Skeleton,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core'
import { useMembers } from 'hooks/Members'
import { Member } from 'types'

export const MemberElement = ({ member }: { member: Member }) => {
  const { manageGroupMembers, loading } = useMembers()

  const toogleMemberActive = () => {
    manageGroupMembers(member.id)
  }

  return (
    <UnstyledButton
      onClick={toogleMemberActive}
      style={{ width: '100%', height: '100px' }}
    >
      <Card
        p={4}
        m={0}
        sx={(theme) => ({
          height: '100%',
          textAlign: 'center',
          '&:hover': {
            backgroundColor: member.active
              ? theme.colors.green[3]
              : theme.colors.gray[3],
          },
          backgroundColor:
            member.active
              ? theme.colors.green[2]
              : theme.colors.gray[2],
        })}
      >
        {loading ? (
          <Center style={{ height: '100%' }}>
            <Loader color={'green'} />
          </Center>
        ) : (
          <Stack mt={4} align={'center'} spacing={'xs'}>
            <Avatar radius={'xl'} size={'md'} color="blue" />
            <Text size={'xs'}> {member.name}</Text>
          </Stack>
        )}
      </Card>
    </UnstyledButton>
  )
}
