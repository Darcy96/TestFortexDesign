import { AppShell, Container } from '@mantine/core'
import Head from 'next/head'
import { AppFooter } from './Footer'
import { AppHeader } from './Header'

type Params = {
  children: React.ReactNode
}
export const Shell = ({ children }: Params) => {
  return (
    <>
      <Head>
        <title>FORTEX DESIGN</title>
      </Head>
      <AppShell
        padding="md"
        header={<AppHeader />}
        footer={<AppFooter />}
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colors.gray[0],
          },
        })}
      >
        <Container mt={"lg"}>{children}</Container>
      </AppShell>
    </>
  )
}
