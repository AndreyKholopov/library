import store from '../store/index'

const checkUser = () => {
  const userUid = localStorage.getItem('userUid')
  const state = store.getState()

  return process.env.REACT_APP_USER_UID === (state.user.userUid || userUid)
}

export default checkUser
