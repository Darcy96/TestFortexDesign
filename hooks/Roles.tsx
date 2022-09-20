import axios from 'axios'
import { createContext, ReactNode, useContext, useState } from 'react'
import { useGroups } from './Groups'
import { useSession } from './Session'

type RoleHook = {
  manageGroupRoles: (idToToogle: string) => void
  loading: boolean
}

const RoleContext = createContext<RoleHook>({} as RoleHook)
export const RolesProvider = ({ children }: { children: ReactNode }) => {
  const { session } = useSession()
  const { group, getGroupById } = useGroups()
  const [loading, setLoading] = useState(false)
  const manageGroupRoles = (idToToogle: string) => {
    setLoading(true)
    const oldValues = group?.roles
      .filter((member) => member.active)
      .map((member) => member.id)

    const newValues = oldValues!.map((object) => object)

    if (!newValues.includes(idToToogle)) {
      newValues.push(idToToogle)
    } else {
      newValues.splice(newValues.indexOf(idToToogle), 1)
    }

    const token = session?.token!
    const url = 'https://demo-api-work-test.herokuapp.com/group/manage-roles'
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
        setLoading(false)
        if (response.status == 200) {
          getGroupById(group?.id!)
        }
      })
      .catch((e) => {
        setLoading(false)
        console.error(e)
      })
  }
  return (
    <RoleContext.Provider value={{ loading, manageGroupRoles }}>
      {children}
    </RoleContext.Provider>
  )
}

export const useRoles = () => {
  return useContext(RoleContext)
}
