import {
  Button,
  Container,
  PasswordInput,
  TextInput,
  Title
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAt } from '@tabler/icons'
import { Shell } from 'components'
import { useSession } from 'hooks'

const Login = () => {
  const { sendLoginRequest, sessionStatus } = useSession()

  const sendCredentials = ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    console.log(email, password)
    sendLoginRequest(email, password)
  }

  const form = useForm({
    initialValues: {
      email: 'front-test-431@fortexdesign.com',
      password: '0m9FN5e*C4h7',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })

  return (
    <Shell>
      <Container style={{ maxWidth: 400 }}>
        <Title mb={'xl'}>Login</Title>

        <form onSubmit={form.onSubmit(sendCredentials)}>
          <TextInput
            withAsterisk
            mb={'md'}
            icon={<IconAt />}
            placeholder="jane@do.com"
            label="Email"
            {...form.getInputProps('email')}
          />

          <PasswordInput
            placeholder="Password"
            label="Password"
            withAsterisk
            {...form.getInputProps('password')}
          />

          <Button
            loading={sessionStatus == 'logging'}
            type="submit"
            mt={'xl'}
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Container>
    </Shell>
  )
}

export default Login
