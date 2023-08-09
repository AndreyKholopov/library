import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import './Card.scss'

const Card = ({
  className,
  backgroundColor,
  borderColor,
  radiusSize,
  width,
  height,
  children,
  overflow,
  ...attrs
}) => {

  const classes = classNames(
    className,
    'card'
  )

  const dynamicStyles = {
    background: backgroundColor,
    borderColor: borderColor,

    borderRadius: radiusSize,
    width: !isNaN(width) ? width + 'px' : width,
    height: !isNaN(height) ? height + 'px' : height,

    overflow: overflow
  }

  return (
    <div
      className={classes}
      style={dynamicStyles}
      {...attrs}
    >
      {children}
    </div>
  )
}

Card.propTypes = {
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  radiusSize: PropTypes.string,
  overflow: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
}

Card.defaultProps = {
  className: '',
  backgroundColor: 'white',
  borderColor: '#212121',
  radiusSize: '16px',
  overflow: '',
  width: '100%',
  height: 100
}

export default Card