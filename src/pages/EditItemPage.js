import { useEffect, useState } from "react";
import { ContentState, EditorState, convertFromHTML } from "draft-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { stateToHTML } from "draft-js-export-html";

import Card from "../components/Card/Card";
import Editor from "../components/CustomEditor/CustomEditor"
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import stateToHTMLOptions from "../components/CustomEditor/options/stateToHTMLOptions";
import itemTypes from "../constants/itemTypes"
import updateList from "../api/updateList";
import updateItem from "../api/updateItem";
import loadItem from "../api/loadItem";
import { updateItemInList } from "../store/slices/listSlice";
import { setItem, setLoadItem } from "../store/slices/itemSlice";

function EditPage() {
  const item = useSelector((state) => state.item.data)
  const load = useSelector((state) => state.item.load)

  const [searchTags, setSearchTags] = useState('')
  const [itemType, setItemType] = useState('')
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [shortInfo, setShortInfo] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (item?.id !== params.id) {
      dispatch(setLoadItem(true))
      loadItem(params.id).then(response => {
        if (response) {
          dispatch(setItem(response))
          updateAllFields(response)
          dispatch(setLoadItem(false))
        } else {
          navigate('/error')
        }
      })
    } else updateAllFields(item)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  const updateAllFields = (item) => {
    setSearchTags(item.searchTags)
    setItemType(item.itemType)
    setShortInfo(item.shortInfo)

    const blocksFromHTML = convertFromHTML(item.info || '')
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    )

    setEditorState(EditorState.createWithContent(state))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!load) {
      dispatch(setLoadItem(true))

      const listItem = {
        searchTags,
        itemType,
        shortInfo
      }

      const newItem = {
        ...listItem,
        info: stateToHTML(editorState.getCurrentContent(), stateToHTMLOptions).replace(/>.....<\/img>/g, '/>')
      }

      await updateItem(newItem, item.id)
      await updateList(listItem, item.id)

      dispatch(updateItemInList({ ...listItem, id: item.id }))
      dispatch(setLoadItem(false))

      navigate(`/${item.id}`)
    }
  }

  return (
    <Card height="auto">
      <Input
        value={searchTags}
        setValue={setSearchTags}
        className='mb-16 mt-8'
        label="Тэги для поиска"
        radiusSize="16px"
        disabled={load}
      />

      <Input
        value={itemType}
        setValue={setItemType}
        className='mb-16'
        list={itemTypes}
        isSelect
        label="Тип заметки"
        radiusSize="16px"
        disabled={load}
      />

      <Editor
        editorState={editorState}
        onChange={setEditorState}
        className='mb-16'
        disabled={load}
      />

      <Input
        value={shortInfo}
        setValue={setShortInfo}
        className='mb-16'
        label="Краткое описание"
        radiusSize="16px"
        disabled={load}
      />

      <Button
        className='ml-auto'
        onClick={handleSubmit}
      >
        Сохранить
      </Button>
    </Card>
  );
}

export default EditPage;
