import { Button } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

export const NotLoggedUser = () => {
  return (
    <Link href="/login" passHref>
      <Button component="a">Login</Button>
    </Link>
  )
}
