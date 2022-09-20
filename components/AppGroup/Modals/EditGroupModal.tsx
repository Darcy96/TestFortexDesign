import { Button, Group, Textarea, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { openModal } from '@mantine/modals'
import { IconPencil, IconTrash } from '@tabler/icons'
import { useGroups } from 'hooks'
import { AppGroup } from 'types'
import { openRemoveGroupModal } from './RemoveGroupModal'

export const openEditGroupModal = (group: AppGroup) =>
  openModal({
    title: <Title order={4}>{group.name}</Title>,
    children: <EditGroupModal group={group} />,
    centered: true,
  })

export const EditGroupModal = ({ group }: { group: AppGroup }) => {
  const { groups, editGroup, loading, deleteGroup } = useGroups()

  const validateName = (name: string) => {
    const nameAlreadyExists =
      groups.filter((g) => g.name === name && g.id !== group.id).length > 0
        ? `${name} already exists`
        : null
    return name !== '' ? nameAlreadyExists : 'Name cannot be empty'
  }

  const form = useForm({
    initialValues: {
      name: group.name,
      description: group.description,
    },

    validate: {
      name: (value) => validateName(value),
      description: (value) =>
        value !== '' ? null : 'Description cannot be empty',
    },
  })

  return (
    <form
      onSubmit={form.onSubmit(({ name, description }) =>
        editGroup(group.id, name, description)
      )}
    >
      <TextInput
        withAsterisk
        label="Name"
        placeholder="Group name"
        {...form.getInputProps('name')}
      />

      <Textarea
        mt="md"
        withAsterisk
        label="Description"
        placeholder=""
        minRows={8}
        maxRows={10}
        {...form.getInputProps('description')}
      />

      <Group position="apart" mt="md">
        <Button
          variant={'white'}
          onClick={() =>
            openRemoveGroupModal(() => deleteGroup(group.id), group.name)
          }
          color={'red'}
          leftIcon={<IconTrash />}
        >
          Remove
        </Button>
        <Button leftIcon={<IconPencil />} loading={loading} type="submit">
          Edit
        </Button>
      </Group>
    </form>
  )
}
