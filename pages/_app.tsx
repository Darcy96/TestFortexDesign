import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { GroupsProvider, MembersProvider, RolesProvider, SessionProvider } from 'hooks'
import type { AppProps } from 'next/app'
import 'styles/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <GroupsProvider>
        <RolesProvider>
          <MembersProvider>
            <MantineProvider
              theme={{
                colors: {
                  fortex: [
                    '#D7DFF8',
                    '#718DE0',
                    '#3357C4',
                    '#2A428A',
                    '#223261',
                    '#1B2545',
                    '#151C31',
                    '#0C1120',
                    '#070B15',
                    '#04060D',
                  ],
                },
                primaryColor: 'fortex',
              }}
            >
              <NotificationsProvider
                position="top-right"
                style={{ marginTop: 70 }}
              >
                <ModalsProvider>
                  <Component {...pageProps} />
                </ModalsProvider>
              </NotificationsProvider>
            </MantineProvider>
          </MembersProvider>
        </RolesProvider>
      </GroupsProvider>
    </SessionProvider>
  )
}

export default MyApp
