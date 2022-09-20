import { Grid, Stack } from '@mantine/core'
import { AppGroup } from 'types'
import { AppGroupElement } from './AppGroupElement'

type Params = {
  groups: AppGroup[]
}

export const AppGroupList = ({ groups }: Params) => {
  return (
    <Grid px={'md'}>
      {groups.map((group) => (
        <Grid.Col  xs={6} sm={4} key={group.id}>
          <AppGroupElement {...group} />
        </Grid.Col>
      ))}
    </Grid>
  )
}
