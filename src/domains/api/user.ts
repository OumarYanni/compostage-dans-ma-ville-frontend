/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios'

import { getOrganization } from './organization'
import { AuthenticatedUser, EditUser, User } from '../schemas'

export const getMe = () => {
  return axios.get<AuthenticatedUser>('/users/me')
}

export const getUser = (userId: number) => {
  return axios.get<User>(`/users/${userId}`)
}

export const uploadAvatar = (avatar: Blob) => {
  const formData = new FormData()
  formData.append('avatar', avatar)

  return axios.post<{link: string}>('/users/me/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const updateUser = (userId: number, user: Partial<EditUser>) => {
  return axios.post<User>(`/users/${userId}`, user)
}

export const getUserOrganizations = (user: AuthenticatedUser) => {
  const promises = user.organizations.map(async ({ organizationId }) => {
    return getOrganization(organizationId)
  })

  return Promise.all(promises)
}
