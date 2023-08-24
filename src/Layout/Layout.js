import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import Fuse from 'fuse.js'

import Input from '../components/Input/Input'
import Button from '../components/Button/Button'
import loadList from '../api/loadList'
import loginUser from '../api/loginUser'
import { setList, setLoadList } from '../store/slices/listSlice'
import { setAccessToken, setUserUid } from '../store/slices/userSlice'
import './Layout.scss'
import checkUser from '../api/checkUser'

function Layout() {
  const location = useLocation()
  const [value, setValue] = useState('')

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const load = useSelector((state) => state.list.load)
  const list = useSelector((state) => state.list.data)

  const fuseOptions = {
    includeScore: true,
    keys: ['searchTags'],
  }
  const fuse = new Fuse(list, fuseOptions)

  const addButtonLocationsNotVisible = ['/create', '/edit']
  const backButtonLocationsVisible = ['/create', '/edit', '/error']

  const isVisibleAddButton = !addButtonLocationsNotVisible.find((el) =>
    location.pathname.includes(el)
  )
  const isVisibleBackButton = backButtonLocationsVisible.find((el) =>
    location.pathname.includes(el)
  )

  useEffect(() => {
    dispatch(setLoadList(true))
    loadList().then((response) => {
      dispatch(setList(response))
      dispatch(setLoadList(false))
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredList = () => {
    if (!value) return list

    const filteredItems = fuse.search(value).map((el) => el.item)

    return filteredItems
  }

  const loginOnClick = async () => {
    if (checkUser()) navigate('/create')
    else {
      const res = await loginUser()

      if (res) {
        dispatch(setUserUid(res.user.uid))
        dispatch(setAccessToken(res.token))
        navigate('/create')
      }
    }
  }

  const addButtonClass = classNames('layout__add-button')
  const backButtonClass = classNames('layout__back-button')

  return (
    <>
      <header>
        <Input
          value={value}
          setValue={(e) => setValue(e)}
          list={filteredList()}
          listItemContent="shortInfo"
          loadList={load}
          handleClickOnList={(el) => navigate(el.id)}
          label="Поиск"
          radiusSize="16px"
        />
      </header>

      <main>
        <Outlet />
      </main>

      {isVisibleBackButton && (
        <Button
          round
          width={75}
          fontSize="2.5rem"
          className={backButtonClass}
          onClick={() => navigate('/')}
        >
          <span>&#8592;</span>
        </Button>
      )}

      {isVisibleAddButton && (
        <Button
          round
          width={75}
          fontSize="2.5rem"
          className={addButtonClass}
          onClick={loginOnClick}
        >
          <span>+</span>
        </Button>
      )}
    </>
  )
}

export default Layout
