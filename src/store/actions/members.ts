export const addMember = (member: string) => ({
  type: 'MEMBER_ADD',
  member
})

export const addMemberBatch = (members: string[]) => ({
  type: 'MEMBER_ADD_BATCH',
  members
})

export const updateMemberPresence = (member: string, presence: boolean) => ({
  type: 'MEMBER_PRESENCE',
  member, presence
})
