import classNames from 'classnames'
import Editor, { composeDecorators } from '@draft-js-plugins/editor'
import createImagePlugin from '@draft-js-plugins/image'
import '@draft-js-plugins/image/lib/plugin.css'
import createFocusPlugin from '@draft-js-plugins/focus'
import '@draft-js-plugins/focus/lib/plugin.css'
import createResizeablePlugin from '@draft-js-plugins/resizeable'
import PropTypes from 'prop-types'

import Toolbar from './Toolbar/Toolbar'
import createDndFilePlugin from './plugins/dndFiles'
import createCodeStyle from './plugins/codeStyle'
import decorator from './decorator/compositeDecorator'
import './CustomEditor.scss'
import { EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js'

const resizeablePlugin = createResizeablePlugin()
const focusPlugin = createFocusPlugin()
const dndFilePlugin = createDndFilePlugin()
const codeStyle = createCodeStyle()

const imageDecorator = composeDecorators(
  resizeablePlugin.decorator,
  focusPlugin.decorator
)

const imagePlugin = createImagePlugin({ decorator: imageDecorator })

const CustomEditor = ({
  className,
  borderColor,
  radiusSize,
  editorState,
  onChange,
  disabled,
}) => {
  const plugins = [
    focusPlugin,
    resizeablePlugin,
    imagePlugin,
    dndFilePlugin,
    codeStyle,
  ]

  const myKeyBindingFn = (e) => {
    if (e.shiftKey && e.code === 'Enter') {
      return 'line-translation'
    }

    return getDefaultKeyBinding(e)
  }

  const handleKeyCommand = (command, state) => {
    if (command === 'line-translation') {
      onChange(RichUtils.insertSoftNewline(state))

      return 'handled'
    }
    return 'not-handled'
  }

  const dynamicStyles = {
    borderColor: borderColor,
    borderRadius: radiusSize,
  }

  const editorClass = classNames(
    className,
    'editor',
    disabled && 'editor_disabled'
  )

  return (
    <>
      <div className={editorClass} style={dynamicStyles}>
        <Toolbar
          editorState={editorState}
          onChange={onChange}
          disabled={disabled}
        />

        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={myKeyBindingFn}
          onChange={(state) => onChange(EditorState.set(state, { decorator }))}
          plugins={plugins}
          spellCheck={true}
          tabIndex={disabled ? -1 : 0}
        />
      </div>
    </>
  )
}

CustomEditor.propTypes = {
  className: PropTypes.string,
  borderColor: PropTypes.string,
  radiusSize: PropTypes.string,
  editorState: PropTypes.object,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
}

CustomEditor.defaultProps = {
  className: '',
  borderColor: '#212121',
  radiusSize: '16px',
  disabled: false,
}

export default CustomEditor
