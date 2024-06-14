import { Heading } from '@/components/custom-ui/heading'
import { getAllUsers, getCurrentUser } from '@/services/user'
import { notFound } from 'next/navigation'
import React from 'react'
import FormUsers from './_components/FormUsers'

const UsersPage = async () => {
  const currentUser = await getCurrentUser()
  const allUsers = await getAllUsers()
  if (currentUser?.role !== 'STAFF') return notFound()
  return (
    <section className='base-container'>
      <Heading>
        Users
      </Heading>
      <div className=" grid grid-cols-2 gap-8">
        {allUsers?.map((user) =>
          <FormUsers key={user.id} {...user} />
        )}
      </div>
    </section>
  )
}

export default UsersPage