import Card from "../components/Card/Card";
import classNames from "classnames"

function ErrorPage() {
  const classes = classNames(
    'announcement'
  )

  return (
    <Card height="auto">
      <h3 className={classes}>Данной статьи не существует или она была удалена</h3>
    </Card>
  );
}

export default ErrorPage;
