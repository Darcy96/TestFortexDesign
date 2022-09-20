import {
  Avatar,
  Box,
  Center,
  createStyles,
  Group,
  Menu,
  Space,
  Text,
  UnstyledButton,
} from '@mantine/core'
import { IconChevronDown, IconLogout, IconUser } from '@tabler/icons'
import { useSession } from 'hooks'
import Link from 'next/link'

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    textDecoration: 'none',
    color: 'white',

    ...theme.fn.hover({
      backgroundColor: theme.colors.fortex[5]
   }),
  },
}))

export const LoggedUser = () => {
  const { session, logout } = useSession()
  const { classes } = useStyles()
  return (
    <>
      <Link href="/groups" passHref>
        <Text component="a" href="#" className={classes.link} px="xl">
          <Center inline>
            <Box component="span" mr={5}>
              Groups
            </Box>
          </Center>
        </Text>
      </Link>
      <Space w={'xl'} />
      <Menu width={200} withArrow position={'bottom-end'}>
        <Menu.Target>
          <UnstyledButton
            sx={(theme) => ({
              borderRadius: '50px',
              padding: '8px',
              color: 'white',
              "&:hover": {
                backgroundColor: theme.colors.fortex[5],
              },
            })}
          >
            <Group spacing={'xs'}>
              <Avatar color="blue" size={'sm'} radius="xl">
                <IconUser size={20} />
              </Avatar>
              <Text>{session!.name}</Text>
              <IconChevronDown size={20} />
            </Group>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            onClick={logout}
            color="red"
            icon={<IconLogout size={14} />}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}
