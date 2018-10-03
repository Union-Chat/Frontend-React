export const addMessage = (message: string) => ({
  type: 'MESSAGE_ADD',
  message
})

export const addMessageBatch = (messages: string[]) => ({
  type: 'MESSAGE_ADD_BATCH',
  messages
})
