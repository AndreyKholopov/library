const blockStyleFn = (
  block,
  { getEditorState }
  ) => {
  const type = block.getType()

  if (type === "code-block") {
    const key = block.getKey()
    const editorState = getEditorState()
    const contentState = editorState.getCurrentContent()
    const previousBlockType = contentState.getBlockBefore(key)?.getType()
    const nextBlockType = contentState.getBlockAfter(key)?.getType()

    block.codeBlock = {
      "code-block__start": false,
      "code-block__end": false
    }

    if (previousBlockType !== "code-block" && nextBlockType !== "code-block") {
      block.codeBlock = {
        "code-block__start": true,
        "code-block__end": true
      }

      return "code-block__start code-block__end"
    } else if (previousBlockType !== "code-block") {
      block.codeBlock = {
        "code-block__start": true,
      }

      return "code-block__start"
    } else if (nextBlockType !== "code-block") {
      block.codeBlock = {
        "code-block__end": true
      }

      return "code-block__end"
    }
  }
}

const createCodeStyle = () => ({
  blockStyleFn
})

export default createCodeStyle