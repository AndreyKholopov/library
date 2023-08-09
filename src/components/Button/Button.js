import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import './Button.scss'

const Button = ({
  className,
  backgroundColor,
  borderColor,
  focusColor,
  radiusSize,
  fontSize,
  width,
  height,
  children,
  round,
  visible,
  ...attrs
}) => {

  const classes = classNames(
    className,
    'button',
    round && 'button__round'
  )

  const dynamicStyles = {
    '--color-background': backgroundColor,
    '--color-focus': focusColor,
    '--color-border': borderColor,

    '--border-radius': radiusSize,
    '--font-size': fontSize,
    '--width': !isNaN(width) ? width + 'px' : width,
    '--height': !isNaN(height) ? height + 'px' : height,
    display: visible ? 'block' : 'none'
  }

  return (
    <button
      className={classes}
      style={dynamicStyles}
      {...attrs}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
  focusColor: PropTypes.string,
  borderColor: PropTypes.string,
  radiusSize: PropTypes.string,
  fontSize: PropTypes.string,
  round: PropTypes.bool,
  visible: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
}

Button.defaultProps = {
  className: '',
  backgroundColor: 'white',
  focusColor: '#eaeaff',
  borderColor: '#212121',
  radiusSize: '16px',
  fontSize: '0.85em',
  width: 'auto',
  height: 'auto',
  round: false,
  visible: true,
}

export default Button