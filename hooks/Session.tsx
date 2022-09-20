import { useLocalStorage } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { IconX } from '@tabler/icons'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext, useState } from 'react'
import { Session, SessionStatus } from 'types'

type SessionHook = {
  session: Session | undefined
  sendLoginRequest: (email: string, password: string) => void
  logout: () => void
  sessionStatus: SessionStatus
}
const SessionContext = createContext<SessionHook>({} as SessionHook)
export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const [session, setSession] = useLocalStorage<Session | undefined>({
    key: 'session',
  })
  const [sessionStatus, setSessionStatus] =
    useState<SessionStatus>('not-logged')

  const sendLoginRequest = (email: string, password: string) => {
    setSessionStatus('logging')
    axios
      .post('https://demo-api-work-test.herokuapp.com/login', {
        email,
        password,
      })
      .then((response) => {
        if (response.status == 200) {
          const token = response.data.token
          const decoded: Session = jwtDecode(token)
          const newSession = { ...decoded, token }
          setSessionStatus('logged')
          setSession(newSession)
          //console.log(newSession)
          router.push('/')
        }
      })
      .catch((e) => {
        console.error(e)
        showNotification({
          icon: <IconX />,
          title: 'There was a problem',
          message: 'Your email or password was incorrect. Please try again.',
          color: 'red',
        })
        setSessionStatus('not-logged')
      })
  }

  const logout = () => {
    setSession(undefined)
    localStorage.clear()
    router.push('/')
  }

  return (
    <SessionContext.Provider
      value={{ session, sendLoginRequest, logout, sessionStatus }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => {
  return useContext(SessionContext)
}
