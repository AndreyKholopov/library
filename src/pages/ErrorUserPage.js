import { useNavigate } from 'react-router-dom'

import Card from '../components/Card/Card'
import classNames from 'classnames'
import Button from '../components/Button/Button'

function ErrorUserPage() {
  const navigate = useNavigate()

  const classes = classNames('announcement')

  return (
    <Card height="auto">
      <h3 className={classes}>
        Изменять и добавлять статьи может только владелец сайта. Если хотите
        посмотреть на редактор, то нажмите на кнопку "Попробовать"
      </h3>
      <Button
        className="ml-auto mt-16"
        onClick={() => navigate('/create/test')}
      >
        Попробовать
      </Button>
    </Card>
  )
}

export default ErrorUserPage
