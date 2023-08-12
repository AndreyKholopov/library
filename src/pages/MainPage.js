import Card from '../components/Card/Card'
import classNames from 'classnames'

function MainPage() {
  const classes = classNames('announcement')

  return (
    <Card height="auto">
      <h3 className={classes}>
        Введите в поиск запрос для получения информации
      </h3>
    </Card>
  )
}

export default MainPage
