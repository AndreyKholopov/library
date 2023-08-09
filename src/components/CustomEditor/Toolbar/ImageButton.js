import { useState } from "react"
import classNames from "classnames"
import { AtomicBlockUtils, EditorState } from "draft-js"
import PropTypes from "prop-types"
import { createRef } from "react"

import toBase64 from "../../../api/toBase64"

const ImageButton = ({
  setting,
  render,
  editorState,
  onChange,
  ...attrs
}) => {
  const [active, setActive] = useState(false)
  const [drag, setDrag] = useState(false)
  const [warn, setWarn] = useState(false)
  const [coordinates, setCoordinates] = useState({ top: '0px', left: '0px' })

  const imageButtonRef = createRef()
  const imageInputRef = createRef()

  const onClickImageButton = () => {
    const rects = imageButtonRef.current.getBoundingClientRect()

    setActive(!active)
    setCoordinates({
      top: rects.bottom + 5 + 'px',
      left: rects.left + 'px'
    })

    setDrag(false)
    setWarn(false)
  }

  const dragStartHandler = e => {
    e.preventDefault()
    setDrag(true)
    setWarn(false)
  }

  const dragLeaveHandler = e => {
    e.preventDefault()
    setDrag(false)
  }

  const onDropHandler = e => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]

    loadImage(file)
  }

  const onClickHandler = e => {
    e.preventDefault()
    let file = e.target.files[0];

    loadImage(file)
  }

  const loadImage = async file => {
    if (!file.type.includes('image')) {
      setDrag(false)
      setWarn(true)

      return
    }

    const result = await toBase64(file)
    onChange(insertImage(editorState, result))

    setDrag(false)
    setActive(!active)
  }

  const insertImage = (editorState, base64) => {
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      setting,
      "IMMUTABLE",
      { src: base64 }
    )

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    })

    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, base64.slice(-5))
  }

  const toolbarButtonsClass = classNames(
    'editor__toolbar-button',
    active && 'editor__toolbar-button_active'
  )

  const toolbarPopoutClass = classNames(
    'editor__toolbar-popout',
    active && 'editor__toolbar-popout_active'
  )

  return (
    <>
      <button
        ref={imageButtonRef}
        className={toolbarButtonsClass}
        style={{ padding: '4px 5px 3px 5px' }}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => onClickImageButton()}
        {...attrs}
      >
        {render}
      </button>
      <div
        className={toolbarPopoutClass}
        style={coordinates}
      >
        <input
          ref={imageInputRef}
          className="hidden"
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => onClickHandler(e)}
        />

        {drag
          ? <div
            className="editor__toolbar-drop-area editor__toolbar-drop-area_active"
            onDragStart={e => dragStartHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragStartHandler(e)}
            onDrop={e => onDropHandler(e)}
          >
            +
          </div>
          : <div
            className="editor__toolbar-drop-area"
            onDragStart={e => dragStartHandler(e)}
            onDragLeave={e => dragLeaveHandler(e)}
            onDragOver={e => dragStartHandler(e)}
            onClick={() => imageInputRef.current.click()}
          >
            {warn ? 'Это не изображение' : '+'}
          </div>}
      </div>
    </>
  )
}

ImageButton.propTypes = {
  setting: PropTypes.oneOf(['IMAGE']),
  render: PropTypes.object,
  editorState: PropTypes.object,
  onChange: PropTypes.func,
}

export default ImageButton