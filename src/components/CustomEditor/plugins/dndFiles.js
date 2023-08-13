import { AtomicBlockUtils } from 'draft-js'

import toBase64 from '../../../api/toBase64'

const handleDroppedFiles = async (
  selection,
  files,
  { getEditorState, setEditorState }
) => {
  const editorState = getEditorState()
  const result = await toBase64(files[0])
  const contentState = editorState.getCurrentContent()

  const blocksArray = contentState
    .getBlocksAsArray()
    .filter((block) => block.type === 'atomic')

  try {
    let atomicBlock

    blocksArray.forEach((block) => {
      block.findEntityRanges(
        (item) => {
          const entityKey = item.getEntity()
          if (
            entityKey &&
            contentState.getEntity(entityKey).getData().src === result
          )
            atomicBlock = block
          return true
        },
        () => {}
      )
    })

    if (!atomicBlock)
      throw new Error('Используйте вставку изображений с помощью тулбара')

    if (atomicBlock.getKey() === selection.getStartKey())
      throw new Error('Ошибка: нельзя перетащить изображение на то же место')

    const newState = AtomicBlockUtils.moveAtomicBlock(
      editorState,
      atomicBlock,
      selection
    )

    setEditorState(newState)
  } catch (error) {
    console.log(error)
  }
}

const createDndFilePlugin = () => ({
  handleDroppedFiles,
})

export default createDndFilePlugin
