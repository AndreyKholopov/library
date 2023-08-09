import classNames from "classnames"
import { RichUtils } from "draft-js"
import PropTypes from "prop-types"

const StyleButton = ({
  setting,
  render,
  editorState,
  onChange,
  ...attrs
}) => {
  const onClickStylesButton = (style) => {
    onChange(RichUtils.toggleInlineStyle(editorState, style))
  }

  const currentStyle = editorState.getCurrentInlineStyle()

  const active = currentStyle.has(setting)

  const toolbarButtonsClass = classNames(
    'editor__toolbar-button',
    active && 'editor__toolbar-button_active'
  )

  return (
    <button
      className={toolbarButtonsClass}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => onClickStylesButton(setting)}
      {...attrs}
    >
      {render}
    </button>
  )
}

StyleButton.propTypes = {
  setting: PropTypes.oneOf([
    'BOLD',
    'CODE',
    'ITALIC',
    'STRIKETHROUGH',
    'UNDERLINE'
  ]),
  render: PropTypes.object,
  editorState: PropTypes.object,
  onChange: PropTypes.func,
}

export default StyleButton