import { Button, Group, Textarea, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { openModal } from '@mantine/modals'
import { useGroups } from 'hooks'

export const openCreateGroupModal = () =>
  openModal({
    title: <Title order={4}>Create group</Title>,
    children: <NewGroupModal />,
    centered: true,
  })

export const NewGroupModal = () => {
  const { groups, createGroup, loading } = useGroups()

  const validateName = (name: string) => {
    const nameAlreadyExists =
      groups.filter((g) => g.name === name).length > 0
        ? `${name} already exists`
        : null
    return name !== '' ? nameAlreadyExists : 'Name cannot be empty'
  }

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
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
        createGroup(name, description)
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

      <Group position="right" mt="md">
        <Button loading={loading} type="submit">
          Submit
        </Button>
      </Group>
    </form>
  )
}
