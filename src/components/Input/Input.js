import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import useClickOutside from '../../hooks/useClickOutside'
import DropList from '../DropList/DropList'
import './Input.scss'

const Input = ({
  className,
  disabled,
  value,
  setValue,
  backgroundColor,
  textColor,
  bezelSize,
  textSize,
  radiusSize,
  label,
  isSelect,
  loadList,
  list,
  listItemContent,
  handleClickOnList,
  oneLineItem,
  hideLabelIfActive,
  focusInput,
  ...attrs
}) => {
  const [active, setActive] = useState(false)
  const [showValue, setShowValue] = useState('')
  const wrapperRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    setShowValue(list?.find((el) => el.value === value)?.name || '')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    if (focusInput) inputRef.current.focus()
  }, [focusInput])

  useClickOutside(wrapperRef, () => setActive(false))

  const classes = classNames(className, 'input')

  const classesField = classNames(
    'input__field',
    !hideLabelIfActive && 'input__field_active-animation',
    active && 'input__field_active',
    isSelect && 'input__field_is-select'
  )

  const classesLabel = classNames('input__label')

  const dynamicStyles = {
    '--color-background': backgroundColor,
    color: textColor,

    '--size-bezel': bezelSize,
    '--size-radius': radiusSize,
    fontSize: textSize,
  }

  return (
    <div className={classes} style={dynamicStyles} ref={wrapperRef}>
      <label>
        <input
          ref={inputRef}
          className={classesField}
          type="text"
          placeholder=" "
          disabled={disabled}
          onFocus={() => setActive(true)}
          value={isSelect ? showValue : value}
          onChange={(e) => {
            if (!isSelect) setValue(e.target.value)
          }}
          {...attrs}
        />

        {(!hideLabelIfActive || (hideLabelIfActive && !active && !value)) && (
          <span className={classesLabel}>{label}</span>
        )}
      </label>

      {list && (
        <DropList
          active={active}
          list={list}
          load={loadList}
          itemContent={listItemContent}
          oneLineItem={oneLineItem}
          handleClickOnList={(e, el) => {
            if (handleClickOnList) handleClickOnList(el)
            setActive(false)
            if (isSelect) {
              setValue(el.value)
            }
          }}
        />
      )}
    </div>
  )
}

Input.propTypes = {
  className: PropTypes.string,
  listItemContent: PropTypes.string,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  bezelSize: PropTypes.string,
  textSize: PropTypes.string,
  radiusSize: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  loadList: PropTypes.bool,
  isSelect: PropTypes.bool,
  oneLineItem: PropTypes.bool,
  hideLabelIfActive: PropTypes.bool,
  handleClickOnList: PropTypes.func,
  list: PropTypes.array,
}

Input.defaultProps = {
  className: '',
  disabled: false,
  oneLineItem: false,
  isSelect: false,
  hideLabelIfActive: false,
  backgroundColor: 'white',
  textColor: '#212121',
  bezelSize: '0.5rem',
  textSize: 'calc(0.6rem + 0.4vw)',
  radiusSize: '4px',
  label: 'Label',
}

export default Input
