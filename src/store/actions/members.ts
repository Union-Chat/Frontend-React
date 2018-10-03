import { UnionStoreMember } from '../store.interface'

export const addMember = (member: UnionStoreMember) => ({
  type: 'MEMBER_ADD',
  member
})

export const addMemberBatch = (members: UnionStoreMember[]) => ({
  type: 'MEMBER_ADD_BATCH',
  members
})

export const updateMemberPresence = (member: string, presence: boolean) => ({
  type: 'MEMBER_PRESENCE',
  member, presence
})
