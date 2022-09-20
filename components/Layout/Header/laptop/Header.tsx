import { Group, Text, UnstyledButton } from '@mantine/core'
import { LogoFortex } from 'assets'
import { useSession } from 'hooks'
import Link from 'next/link'
import { LoggedUser } from './LoggedUser'
import { NotLoggedUser } from './NotLogedUser'

export const LaptopHeader = () => {
  const { session } = useSession()

  return (
    <Group style={{ height: '100%' }} position="apart" px={'lg'}>
      <Logo />
      <Group style={{ height: '100%' }}>
        {session ? <LoggedUser /> : <NotLoggedUser />}
      </Group>
    </Group>
  )
}

export const Logo = () => (
  <Group>
    <Link href="/" passHref>
      <UnstyledButton sx={{ color: 'white' }}>
        <Group>
          <div style={{ height: '100%' }}>
            <LogoFortex />
          </div>
          <Text>
            <Text component="a" weight={'bold'}>
              {`FORTEX `}
            </Text>
            DESIGN
          </Text>
        </Group>
      </UnstyledButton>
    </Link>
  </Group>
)
