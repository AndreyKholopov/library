import Card from "../components/Card/Card";
import classNames from "classnames"

function ErrorUserPage() {
  const classes = classNames(
    'announcement'
  )

  return (
    <Card height="auto">
      <h3 className={classes}>Изменять и добавлять статьи может только владелец сайта</h3>
    </Card>
  );
}

export default ErrorUserPage;
