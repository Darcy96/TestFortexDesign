import { createContext, ReactNode, useContext, useState } from 'react'
import { useGroups } from './Groups'
import { useSession } from './Session'
import axios from 'axios'

type MembersHook = {
  manageGroupMembers: (idToToogle: string) => void
  loading: boolean
}

const MembersContext = createContext<MembersHook>({} as MembersHook)
export const MembersProvider = ({ children }: { children: ReactNode }) => {
  const { session } = useSession()
  const { group, getGroupById } = useGroups()
  const [loading, setLoading] = useState(false)
  const manageGroupMembers = (idToToogle: string) => {
    setLoading(true)
    const oldValues = group?.people
      .filter((member) => member.active)
      .map((member) => member.id)

    const newValues = oldValues!.map((object) => object)

    if (!newValues.includes(idToToogle)) {
      newValues.push(idToToogle)
    } else {
      newValues.splice(newValues.indexOf(idToToogle), 1)
    }

    const token = session?.token!
    const url = 'https://demo-api-work-test.herokuapp.com/group/manage-members'
    const body = {
      groupId: group!.id,
      oldValues,
      newValues,
    }
    const config = {
      headers: {
        authorization: token,
      },
    }
    axios
      .post(url, body, config)
      .then((response) => {
        if (response.status == 200) {
          setLoading(false)
          getGroupById(group?.id!)
        }
      })
      .catch((e) => {
        setLoading(false)
        console.error(e)
      })
  }

  return (
    <MembersContext.Provider value={{ loading, manageGroupMembers }}>
      {children}
    </MembersContext.Provider>
  )
}

export const useMembers = () => {
  return useContext(MembersContext)
}
