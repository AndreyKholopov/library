import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { stateToHTML } from "draft-js-export-html";

import Card from "../components/Card/Card";
import Editor from "../components/CustomEditor/CustomEditor"
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import ITEM_TYPES from "../constants/ITEM_TYPES"
import stateToHTMLOptions from "../components/CustomEditor/options/stateToHTMLOptions";
import updateList from "../api/updateList";
import saveItem from "../api/saveItem";
import { addItemToList } from "../store/slices/listSlice";
import { setLoadItem } from "../store/slices/itemSlice";

function CreatePage() {
  const load = useSelector((state) => state.item.load)

  const [searchTags, setSearchTags] = useState('')
  const [itemType, setItemType] = useState('')
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [shortInfo, setShortInfo] = useState('')
  const [canAutoChangeShortInfo, setCanAutoChangeShortInfo] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const isTest = location.pathname.includes('test')

  const handleEditorState = (state) => {
    setEditorState(state)

    const text = convertToRaw(state.getCurrentContent()).blocks[0].text

    if (!canAutoChangeShortInfo && text.length) {
      if (text.length < 100) setShortInfo(text.slice(0, 100))
      else setShortInfo(text.slice(0, 100) + '...')
    }
  }

  const handleShortInfoState = (state) => {
    setShortInfo(state)

    setCanAutoChangeShortInfo(true)
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

      const item = {
        ...listItem,
        info: stateToHTML(editorState.getCurrentContent(), stateToHTMLOptions).replace(/>.....<\/img>/g, '/>')
      }

      const newItem = await saveItem(item)
      await updateList(listItem, newItem.id)

      dispatch(addItemToList({ ...listItem, id: newItem.id }))
      dispatch(setLoadItem(false))

      navigate(`/${newItem.id}`)
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
        list={ITEM_TYPES}
        isSelect
        label="Тип заметки"
        radiusSize="16px"
        disabled={load}
      />

      <Editor
        editorState={editorState}
        onChange={handleEditorState}
        className='mb-16'
        disabled={load}
      />

      <Input
        value={shortInfo}
        setValue={handleShortInfoState}
        className='mb-16'
        label="Краткое описание"
        radiusSize="16px"
        disabled={load}
      />

      {!isTest &&
        <Button
          className='ml-auto'
          onClick={handleSubmit}
        >
          Сохранить
        </Button>
      }
    </Card>
  );
}

export default CreatePage;
