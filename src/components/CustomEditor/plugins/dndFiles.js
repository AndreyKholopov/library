import { AtomicBlockUtils } from "draft-js"

import toBase64 from "../../../api/toBase64"

const handleDroppedFiles = async (
  selection,
  files,
  { getEditorState, setEditorState }
) => {
  const editorState = getEditorState()
  const result = await toBase64(files[0])
  const contentState = editorState.getCurrentContent()
  const atomicBlock = contentState.getBlocksAsArray().filter(el => el.text === result.slice(-5))

  try {
    if (!atomicBlock.length) throw 'Используйте вставку изображений с помощью тулбара'

    if (atomicBlock[0].getKey() === selection.getStartKey()) throw 'Ошибка: нельзя перетащить изображение на то же место' 

    const newState = AtomicBlockUtils.moveAtomicBlock(editorState, atomicBlock[0], selection)

    setEditorState(newState)
  } catch (error) {
    console.log(error)
  }
}

const createDndFilePlugin = () => ({
  handleDroppedFiles
})

export default createDndFilePlugin