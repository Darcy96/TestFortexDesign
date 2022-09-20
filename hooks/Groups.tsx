import { closeAllModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons'
import axios from 'axios'
import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext, useState } from 'react'
import { AppGroup } from 'types'
import { useSession } from './Session'

type GroupHook = {
  groups: AppGroup[]
  listGroups: () => void
  getGroupById: (id: string) => void
  group: AppGroup | undefined
  createGroup: (name: string, description: string) => void
  deleteGroup: (id: string) => void
  editGroup: (id: string, name: string, description: string) => void
  loading: boolean
}

const GroupContext = createContext<GroupHook>({} as GroupHook)
export const GroupsProvider = ({ children }: { children: ReactNode }) => {
  const { session } = useSession()
  const [groups, setGroups] = useState<AppGroup[]>([])
  const [group, setGroup] = useState<AppGroup>()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const getGroupById = (id: string) => {
    const token = session?.token!
    const url = 'https://demo-api-work-test.herokuapp.com/group/'
    const config = {
      headers: {
        authorization: token,
      },
    }
    axios
      .get(url, config)
      .then((response) => {
        if (response.status == 200) {
          const newGroups: AppGroup[] = response.data.groups
          setGroups(newGroups)
          const foundGroup = newGroups.filter((group) => group.id == id)[0]
          setGroup(foundGroup)
          //console.log(foundGroup)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const listGroups = () => {
    const token = session?.token!
    const url = 'https://demo-api-work-test.herokuapp.com/group/'
    const config = {
      headers: {
        authorization: token,
      },
    }
    axios
      .get(url, config)
      .then((response) => {
        //console.log(response.data)
        setGroups(response.data.groups)
        setGroup(undefined)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const createGroup = (name: string, description: string) => {
    setLoading(true)
    const token = session?.token!
    const url = 'https://demo-api-work-test.herokuapp.com/group/create'
    const body = {
      name,
      description,
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
          closeAllModals()
          showNotification({
            icon: <IconPlus />,
            message: 'Group created',
            color: 'green',
          })
          setGroups([])
          listGroups()
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
  }

  const deleteGroup = (id: string) => {
    setLoading(true)
    const token = session?.token!
    const url = `https://demo-api-work-test.herokuapp.com/group/delete/?id=${id}`
    const config = {
      headers: {
        authorization: token,
      },
    }
    axios
      .delete(url, config)
      .then((response) => {
        if (response.status == 200) {
          setLoading(false)
          closeAllModals()
          showNotification({
            icon: <IconTrash />,
            message: 'Group removed successfully',
            color: 'green',
          })
          setGroups([])

          router.push('/groups')
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
  }

  const editGroup = (id: string, name: string, description: string) => {
    setLoading(true)
    const url = `https://demo-api-work-test.herokuapp.com/group/update/?id=${id}`
    const token = session?.token!
    const body = {
      name,
      description,
    }
    const config = {
      headers: {
        authorization: token,
      },
    }
    axios
      .patch(url, body, config)
      .then((response) => {
        if (response.status == 200) {
          setLoading(false)
          closeAllModals()
          showNotification({
            icon: <IconPencil />,
            message: 'Group updated successfully',
            color: 'green',
          })
          setGroup(undefined)
          getGroupById(id)
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
  }

  return (
    <GroupContext.Provider
      value={{
        groups,
        listGroups,
        getGroupById,
        group,
        createGroup,
        deleteGroup,
        editGroup,
        loading,
      }}
    >
      {children}
    </GroupContext.Provider>
  )
}

export const useGroups = () => {
  return useContext(GroupContext)
}
