import {
  ActionIcon,
  Button,
  Center,
  Container,
  Grid,
  Group,
  Loader,
  MediaQuery,
  Space,
  Text,
  Title
} from '@mantine/core'
import { IconArrowLeft, IconPencil } from '@tabler/icons'
import {
  MembersList,
  openEditGroupModal, RoleList,
  Shell
} from 'components'
import { useGroups, useSession } from 'hooks'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Groups = () => {
  const { getGroupById, group } = useGroups()
  const { session } = useSession()
  const router = useRouter()

  const { groupId } = router.query as { groupId: string }

  useEffect(() => {
    if (!groupId) {
      return
    }
    if (session) {
      getGroupById(groupId!)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, groupId])

  return (
    <Shell>
      {group ? (
        <>
          <Group position="apart">
            <Group>
              <Link href={'/groups'}>
                <ActionIcon>
                  <IconArrowLeft />
                </ActionIcon>
              </Link>
              <Title>{group?.name}</Title>
            </Group>

            <MediaQuery smallerThan={'sm'} styles={{ display: 'none' }}>
              <Button
                onClick={() => openEditGroupModal(group)}
                leftIcon={<IconPencil />}
              >
                Edit
              </Button>
            </MediaQuery>
            <MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
              <ActionIcon
                onClick={() => openEditGroupModal(group)}
                variant={'filled'}
                color={'fortex'}
                size="lg"
              >
                <IconPencil />
              </ActionIcon>
            </MediaQuery>
          </Group>

          <Space h={'lg'} />
          <Container px={60}>
            <Grid>
              <Grid.Col sm={8}>
                <Title order={3}>Description:</Title>
                <Text>{group?.description}</Text>
              </Grid.Col>
              <Grid.Col sm={4}>
                <MembersList
                  numberOfMembers={group.members}
                  members={group.people}
                />
                <RoleList roles={group.roles} />
              </Grid.Col>
            </Grid>
          </Container>
        </>
      ) : (
        <Center style={{ height: '70vh' }}>
          <Loader size={'xl'} variant="dots" />
        </Center>
      )}
    </Shell>
  )
}

export default Groups
