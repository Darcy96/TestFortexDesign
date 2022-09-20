import { ActionIcon, Card, Group, Spoiler, Stack, Text } from '@mantine/core'
import {
  IconExternalLink,
  IconUser,
  IconUserOff,
  IconUsers,
} from '@tabler/icons'
import Link from 'next/link'
import { AppGroup } from 'types'

const getMembersText = (numberOfMembers: number) => {
  if (numberOfMembers == 0) return 'No members'
  if (numberOfMembers == 1) return '1 member'
  else return `${numberOfMembers} members`
}
export const AppGroupElement = ({
  id,
  name,
  description,
  members,
}: AppGroup) => {
  return (
    <Link href={`/groups/${id}`}>
      <Card
        shadow="md"
        radius="md"
        p="xl"
        style={{ minHeight: 200 }}
        sx={(theme) => ({
          '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.colors.gray[0],
            transition: '300ms',
          },
        })}
      >
        <Group>
          <Stack style={{ width: '100%' }} spacing={0}>
            <Group position="apart">
              <Text size={'md'}>{name}</Text>
              <ActionIcon>
                <IconExternalLink />
              </ActionIcon>
            </Group>
            <Group ml={8} spacing={4}>
              {members > 0 ? (
                <>
                  {members === 1 ? (
                    <IconUser color={'gray'} size={12} />
                  ) : (
                    <IconUsers color={'gray'} size={12} />
                  )}
                </>
              ) : (
                <IconUserOff color={'gray'} size={12} />
              )}
              <Text size={'sm'} color={'dimmed'}>
                {getMembersText(members)}
              </Text>
            </Group>
          </Stack>
        </Group>
        <Spoiler maxHeight={100} showLabel="Show more" hideLabel="Show more">
          <Text size="sm" color="dimmed" mt="sm">
            {description}
          </Text>
        </Spoiler>
      </Card>
    </Link>
  )
}
