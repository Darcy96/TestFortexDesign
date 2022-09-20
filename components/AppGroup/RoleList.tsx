import { Accordion, Grid, TextInput, Title } from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import { useState } from 'react'
import { Role } from 'types'
import { RoleElement } from './RoleElement'

export const RoleList = ({ roles }: { roles: Role[] }) => {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Accordion>
      <Accordion.Item value="roles">
        <Accordion.Control>
          <Title order={3}>{}Roles:</Title>
        </Accordion.Control>
        <Accordion.Panel>
          <TextInput
            variant="unstyled"
            sx={(theme) => ({
              borderBottom: `1px solid ${theme.colors.gray[5]}`,
            })}
            value={searchValue}
            onChange={(event) => setSearchValue(event.currentTarget.value)}
            icon={<IconSearch />}
            mb={'xl'}
            placeholder="Search rol"
          />
          <Grid mb={'xl'}>
            {roles
              .filter((member) =>
                member.name.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((role) => (
                <RoleElement key={role.id} role={role} />
              ))}
          </Grid>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
