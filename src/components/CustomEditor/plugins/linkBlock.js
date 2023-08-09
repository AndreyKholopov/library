const Link = (props) => {
  const { href } = props.contentState.getEntity(props.entityKey).getData()
  return (
    <a href={href}>
      {props.children}
    </a>
  )
}

const blockRendererFn = (
  block,
  { getEditorState }
) => {
  const editorState = getEditorState()
  const contentState = editorState.getCurrentContent()

  block.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      )
    },
    
  )
}

const createLinkBlock = () => ({
  blockRendererFn
})

export default createLinkBlock