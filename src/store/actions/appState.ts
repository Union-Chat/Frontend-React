export const login = (token: string) => {
  return async (dispatch: any) => {
    window.localStorage.setItem('token', token)
    dispatch(setLoginToken(token))
  }
}

// --

export const setLoginToken = (token: string) => ({
  type: 'AUTH_TOKEN',
  token
})
