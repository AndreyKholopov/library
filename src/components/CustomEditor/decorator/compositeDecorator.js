import { CompositeDecorator } from 'draft-js'

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    )
  }, callback)
}

const Link = (props) => {
  let { href } = props.contentState.getEntity(props.entityKey).getData()
  if (!href) href = props.contentState.getEntity(props.entityKey).getData().url

  return (
    <a
      href={'/' + href}
      style={{
        color: '#3b5998',
        textDecoration: 'underline',
      }}
    >
      {props.children}
    </a>
  )
}

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
])

export default decorator
