import { Accordion, Grid, Group, Text, TextInput, Title } from '@mantine/core'
import { IconSearch, IconUser, IconUserOff, IconUsers } from '@tabler/icons'
import { useState } from 'react'
import { Member } from 'types'
import { MemberElement } from './MemberElement'

const getMembersText = (numberOfMembers: number) => {
  if (numberOfMembers == 0) return 'No members selected'
  if (numberOfMembers == 1) return '1 member selected'
  else return `${numberOfMembers} members selected`
}

export const MembersList = ({
  members,
  numberOfMembers,
}: {
  members: Member[]
  numberOfMembers: number
}) => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <Accordion>
      <Accordion.Item value="members">
        <Accordion.Control>
          <Title order={3}>Members</Title>
          <Group ml={8} spacing={4}>
            {numberOfMembers > 0 ? (
              <>
                {numberOfMembers === 1 ? (
                  <IconUser color={'gray'} size={12} />
                ) : (
                  <IconUsers color={'gray'} size={12} />
                )}
              </>
            ) : (
              <IconUserOff color={'gray'} size={12} />
            )}
            <Text size={'xs'} color={'dimmed'}>
              {getMembersText(numberOfMembers)}
            </Text>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <TextInput
            value={searchValue}
            variant="unstyled"
            sx={(theme) => ({
              borderBottom: `1px solid ${theme.colors.gray[5]}`,
            })}
            onChange={(event) => setSearchValue(event.currentTarget.value)}
            icon={<IconSearch />}
            mb={'xl'}
            placeholder="Search member"
          />
          <Grid mb={'xl'}>
            {members
              .filter((member) =>
                member.name.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((member) => (
                <Grid.Col p={2} sm={4} key={member.id}>
                  <MemberElement key={member.id} member={member} />
                </Grid.Col>
              ))}
          </Grid>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
