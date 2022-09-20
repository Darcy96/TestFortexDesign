import { Text, Title } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'

export const openRemoveGroupModal = (deleteGroup: () => void , name: string) => {
  openConfirmModal({
    title: <Title order={4}>Delete Group</Title>,
    children: (
      <Text>
        Are you sure to delete
        <Text weight={'bold'} component="a">{` ${name} `}</Text>?
      </Text>
    ),
    centered: true,
    labels: { confirm: 'Delete', cancel: 'Cancel' },
    confirmProps: { color: 'red' },
    onConfirm: () => deleteGroup(),
  })
}
