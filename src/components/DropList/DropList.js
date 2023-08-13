import classNames from 'classnames'
import PropTypes from 'prop-types'

import './DropList.scss'

const DropList = ({
  active,
  itemContent,
  list,
  load,
  handleClickOnList,
  oneLineItem,
}) => {
  const ulClasses = classNames('drop', active && 'drop_visible')

  const liClasses = classNames(
    'drop__item',
    oneLineItem && 'drop__item_one-line'
  )

  const dynamicStyles = (itemColor) => {
    return { '--item-color': itemColor }
  }

  return (
    <ul className={ulClasses}>
      {load && <li className={liClasses}>Идет загрузка данных...</li>}

      {!list.length && !load && (
        <li className={liClasses}>По данному запросу ничего не найдено</li>
      )}

      {!oneLineItem &&
        !load &&
        list.map((el, i) => (
          <li
            className={liClasses}
            key={el.id ? el.id : i}
            style={dynamicStyles(el.color || 'white')}
            onClick={(e) => handleClickOnList(e, el)}
          >
            {itemContent ? el[itemContent] : el.name}
          </li>
        ))}

      {oneLineItem &&
        !load &&
        list.map((el, i) => (
          <div className="drop__item_one-line-wrap" key={el.id ? el.id : i}>
            <li
              className={liClasses}
              style={dynamicStyles(el.color || 'white')}
              onClick={(e) => handleClickOnList(e, el)}
            >
              {itemContent ? el[itemContent] : el.name}
            </li>
          </div>
        ))}
    </ul>
  )
}

DropList.propTypes = {
  active: PropTypes.bool,
  load: PropTypes.bool,
  oneLineItem: PropTypes.bool,
  itemContent: PropTypes.string,
  handleClickOnList: PropTypes.func,
  list: PropTypes.array,
}

export default DropList
