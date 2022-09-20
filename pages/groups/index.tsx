import {
  ActionIcon,
  Button,
  Center,
  Group,
  Loader,
  MediaQuery,
  Space,
  TextInput,
  Title,
} from '@mantine/core'
import { IconPlus, IconSearch } from '@tabler/icons'
import { AppGroupList, openCreateGroupModal, Shell } from 'components'
import { useGroups, useSession } from 'hooks'
import { useEffect, useState } from 'react'

const Groups = () => {
  const { listGroups, groups } = useGroups()
  const { session } = useSession()

  useEffect(() => {
    if (session) listGroups()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  const [searchValue, setSearchValue] = useState('')

  return (
    <Shell>
      <Group position="apart">
        <Title>Groups</Title>
        <Group>
          <MediaQuery smallerThan={'sm'} styles={{ display: 'none' }}>
            <Group>
              <TextInput
                variant="unstyled"
                sx={(theme) => ({
                  borderBottom: `1px solid ${theme.colors.gray[5]}`,
                })}
                radius={'xl'}
                value={searchValue}
                onChange={(event) => setSearchValue(event.currentTarget.value)}
                icon={<IconSearch />}
                placeholder="Search group"
              />

              <Button
                onClick={openCreateGroupModal}
                leftIcon={<IconPlus />}
              >
                Create
              </Button>
            </Group>
          </MediaQuery>
          <MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
            <div>
              <ActionIcon
                onClick={openCreateGroupModal}
                variant={'filled'}
                color={'fortex'}
                size="lg"
              >
                <IconPlus />
              </ActionIcon>
            </div>
          </MediaQuery>
        </Group>
      </Group>
      <Space h={'xl'} />
      {groups.length != 0 ? (
        <AppGroupList
          groups={groups.filter((group) =>
            group.name.toLowerCase().includes(searchValue.toLowerCase())
          )}
        />
      ) : (
        <Center style={{ height: '60vh' }}>
          <Loader size={'xl'} variant="dots" />
        </Center>
      )}
    </Shell>
  )
}

export default Groups
