import {
  Container,
  Title,
  Text,
  List,
  ThemeIcon,
  Button,
  Group,
  Image,
  Grid,
} from '@mantine/core'
import { Shell } from 'components'
import { IconCheck } from '@tabler/icons'
/* import image from './image.svg'; */
import type { NextPage } from 'next'
import { ProfilePhoto } from 'assets'

const Home: NextPage = () => {
  return (
    <Shell>
      <Grid gutter={'xl'}>
        <Grid.Col md={6}>
          <ProfilePhoto />
        </Grid.Col>
        <Grid.Col md={6}>
          <Title mt={"xl"} order={3}>Hello! My name is</Title>
          <Title
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
            style={{ fontFamily: 'Greycliff CF, sans-serif' }}
          >
            {` Darcy Solarte `}
          </Title>
          <Text size={'xl'} weight={'bold'}> {`I'm a frontend developer from Colombia`}</Text>
          <Text color="dimmed" mt="md">
            {`I am 26 years old and I love web development, I have 2 years experience working on applications 
            built with React js, firebase and Node js backend.`}
          </Text>
          <Text color="dimmed" mt="md">
            {`For this demo I wanted to learn and use Next js and the component library called Mantine,
            which are optimized for developing with typescript.`}
          </Text>
          <Text color="dimmed" mt="md">
            {`I was very happy to be able to do this test because it was a challenge to learn in 
            a short time to use these two technologies that I had not had the opportunity to use before.
            I hope you can have a good experience using this app (The app is responsive too).`}
          </Text>
        </Grid.Col>
      </Grid>
    </Shell>
  )
}

export default Home
