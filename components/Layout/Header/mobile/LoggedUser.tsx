import { Avatar, Burger, Group, Menu, Text } from '@mantine/core'
import { IconLogout, IconSitemap, IconUser } from '@tabler/icons'
import { useSession } from 'hooks'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'

type Params = {
  headerMenuOpened: boolean
  setHeaderMenuOpened: Dispatch<SetStateAction<boolean>>
}

export const LoggedUser = ({
  headerMenuOpened,
  setHeaderMenuOpened,
}: Params) => {
  const { session, logout } = useSession()

  return (
    <Menu
      width={'100%'}
      position={'bottom'}
      onClose={() => setHeaderMenuOpened(false)}
      offset={25}
      withArrow
      transition={'slide-down'}
    >
      <Menu.Target>
        <Burger
          opened={headerMenuOpened}
          onClick={() => setHeaderMenuOpened(true)}
          size="sm"
          color="white"
        />
      </Menu.Target>

      <Menu.Dropdown px="xl" py={'sm'}>
        <Menu.Item>
          <Group>
            <Avatar color="blue" size={'lg'} radius="xl">
              <IconUser size={40} />
            </Avatar>
            <Text size={'xl'}>{session!.name}</Text>
          </Group>
        </Menu.Item>
        <Menu.Divider />
        <Link href="/groups" passHref>
          <Menu.Item icon={<IconSitemap size={14} />}>Groups</Menu.Item>
        </Link>

        <Menu.Divider />

        <Menu.Item onClick={logout} color="red" icon={<IconLogout size={14} />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
