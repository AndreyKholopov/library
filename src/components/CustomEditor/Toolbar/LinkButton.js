import { useState, createRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { EditorState, RichUtils } from 'draft-js'
import Fuse from 'fuse.js'

import Input from '../../Input/Input'

const LinkButton = ({ setting, render, editorState, onChange, ...attrs }) => {
  const [active, setActive] = useState(false)
  const [warn, setWarn] = useState(false)
  const [focusInput, setFocusInput] = useState(false)
  const [value, setValue] = useState('')
  const [coordinates, setCoordinates] = useState({ top: '0px', left: '0px' })

  const linkButtonRef = createRef()

  const onlyDefinitionsList = useSelector(
    (state) => state.list.onlyDefinitionsData
  )

  const fuseOptions = {
    includeScore: true,
    keys: ['searchTags'],
  }
  const fuse = new Fuse(onlyDefinitionsList, fuseOptions)

  const filteredList = () => {
    if (!value) return onlyDefinitionsList

    const filteredItems = fuse.search(value).map((el) => el.item)

    return filteredItems
  }

  const onClickBlockButton = () => {
    const rects = linkButtonRef.current.getBoundingClientRect()

    setWarn(false)
    setFocusInput(false)
    setActive(!active)

    if (!active) {
      setCoordinates({
        top: rects.bottom + 5 + 'px',
        left: rects.left + 'px',
      })

      const selection = editorState.getSelection()
      if (selection.isCollapsed()) setWarn(true)
      else {
        const contentState = editorState.getCurrentContent()
        const startKey = editorState.getSelection().getStartKey()
        const startOffset = editorState.getSelection().getStartOffset()
        const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey)
        const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset)
        setValue('')
        setFocusInput(true)
        if (linkKey) {
          const linkInstance = contentState.getEntity(linkKey)
          const linkId = linkInstance.getData().href
          setValue(
            onlyDefinitionsList.find((el) => el.id === linkId).searchTags
          )
          setActive(true)
        }
      }
    }
  }

  const handleClickOnList = (el) => {
    setValue(el.searchTags)

    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      setting,
      'MUTABLE',
      { href: el.id }
    )

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()

    let newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    })
    newEditorState = RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    )

    onChange(newEditorState)
    setActive(false)
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
        ref={linkButtonRef}
        className={toolbarButtonsClass}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => onClickBlockButton()}
        {...attrs}
      >
        {render}
      </button>
      <div className={toolbarPopoutClass} style={coordinates}>
        {warn && <span>Выделите ссылку</span>}
        {!warn && (
          <Input
            value={value}
            focusInput={focusInput}
            setValue={(e) => setValue(e)}
            list={filteredList()}
            listItemContent="searchTags"
            oneLineItem
            handleClickOnList={handleClickOnList}
            label="Определения"
            hideLabelIfActive
            radiusSize="16px"
          />
        )}
      </div>
    </>
  )
}

LinkButton.propTypes = {
  setting: PropTypes.oneOf(['LINK']),
  render: PropTypes.object,
  editorState: PropTypes.object,
  onChange: PropTypes.func,
}

export default LinkButton
