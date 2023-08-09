import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames"

import Card from "../components/Card/Card";
import Button from "../components/Button/Button";
import loadItem from "../api/loadItem";
import checkUser from "../api/checkUser";
import loginUser from "../api/loginUser";
import { setItem, setLoadItem } from "../store/slices/itemSlice";
import { setAccessToken, setUserUid } from "../store/slices/userSlice";
import itemTypes from "../constants/itemTypes";

function ItemPage() {
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const load = useSelector((state) => state.item.load)
  const item = useSelector((state) => state.item.data)

  useEffect(() => {
    if (item?.id !== params.id) {
      dispatch(setLoadItem(true))
      loadItem(params.id).then(response => {
        if (response) {
          dispatch(setItem(response))
          dispatch(setLoadItem(false))
        } else {
          navigate('/error')
        }
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  const handleClick = async () => {
    if (checkUser) navigate(`/${params.id}/edit`)

    else {
      const res = await loginUser()

      if (res) {
        dispatch(setUserUid(res.user.uid))
        dispatch(setAccessToken(res.token))
        navigate(`/${params.id}/edit`)
      }
    }
  }

  const classes = classNames(
    'announcement'
  )

  return (
    <Card height="auto">
      {load && <h3 className={classes}>Подождите, идет загрузка заметки</h3>}
      {!load &&
        <>
          <h3 className='item-type'>{itemTypes?.find(el => el.value === item.itemType)?.name}</h3>
          <div dangerouslySetInnerHTML={{ __html: item.info }} />
        </>
      }

      <Button
        className='ml-auto mt-16'
        onClick={handleClick}
      >
        Редактировать
      </Button>
    </Card>
  );
}

export default ItemPage;
