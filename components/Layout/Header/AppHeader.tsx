import { Button, Header, MediaQuery } from '@mantine/core'
import { LaptopHeader } from './laptop'
import { MobileHeader } from './mobile'

export const AppHeader = () => {
  return (
    <Header
      height={70}
      px="md"
      sx={(theme) => ({ backgroundColor: theme.colors.fortex[6] })}
    >
      <MediaQuery smallerThan={'sm'} styles={{ display: 'none' }}>
        <div style={{ height: '100%' }}>
          <LaptopHeader />
        </div>
      </MediaQuery>
      <MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
        <div style={{ height: '100%' }}>
          <MobileHeader />
        </div>
      </MediaQuery>
    </Header>
  )
}
