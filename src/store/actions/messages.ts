import { UnionStoreMessage } from '../store.interface'

export const addMessage = (message: UnionStoreMessage) => ({
  type: 'MESSAGE_ADD',
  message
})

export const addMessageBatch = (messages: UnionStoreMessage[]) => ({
  type: 'MESSAGE_ADD_BATCH',
  messages
})
