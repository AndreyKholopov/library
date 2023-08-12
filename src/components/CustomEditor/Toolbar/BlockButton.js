import classNames from 'classnames'
import { RichUtils } from 'draft-js'
import PropTypes from 'prop-types'

const BlockButton = ({ setting, render, editorState, onChange, ...attrs }) => {
  const selection = editorState.getSelection()

  const onClickBlockButton = (style) => {
    onChange(RichUtils.toggleBlockType(editorState, style))
  }

  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  const active = setting === blockType

  const toolbarButtonsClass = classNames(
    'editor__toolbar-button',
    active && 'editor__toolbar-button_active'
  )

  return (
    <button
      className={toolbarButtonsClass}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => onClickBlockButton(setting)}
      {...attrs}
    >
      {render}
    </button>
  )
}

BlockButton.propTypes = {
  setting: PropTypes.oneOf([
    'unordered-list-item',
    'ordered-list-item',
    'code-block',
    'header-one',
    'header-two',
    'header-three',
    'header-four',
    'header-five',
    'header-six',
    'section',
    'article',
    'blockquote',
    'atomic',
    'unstyled',
  ]),
  render: PropTypes.object,
  editorState: PropTypes.object,
  onChange: PropTypes.func,
}

export default BlockButton
