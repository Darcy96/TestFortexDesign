import { Group, Text, UnstyledButton } from '@mantine/core'
import { LogoFortex } from 'assets'
import { useSession } from 'hooks'
import Link from 'next/link'
import { useState } from 'react'
import { LoggedUser } from './LoggedUser'
import { NotLoggedUser } from './NotLogedUser'

export const MobileHeader = () => {
  const [headerMenuOpened, setHeaderMenuOpened] = useState(false)
  const { session } = useSession()

  return (
    <Group position="apart" sx={{ color: 'white', height: "100%" }}>
      <Logo />
      {session ? (
        <LoggedUser
          headerMenuOpened={headerMenuOpened}
          setHeaderMenuOpened={setHeaderMenuOpened}
        />
      ) : (
        <NotLoggedUser />
      )}
    </Group>
  )
}

export const Logo = () => {
  return (
    <>
      <Link href="/" passHref>
        <UnstyledButton style={{ height: '100%' }}>
          <LogoFortex />
        </UnstyledButton>
      </Link>

      <Link href="/" passHref>
        <UnstyledButton style={{ height: '100%', color: 'white' }}>
          <Text>
            <Text component="a" weight={'bold'}>
              {`FORTEX `}
            </Text>
            DESIGN
          </Text>
        </UnstyledButton>
      </Link>
    </>
  )
}
