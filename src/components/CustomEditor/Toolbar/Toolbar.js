import PropTypes from "prop-types"

import addImage from "../../../assets/addImage.svg"
import BlockButton from "./BlockButton";
import StyleButton from "./StyleButton";
import ImageButton from "./ImageButton";
import LinkButton from "./LinkButton";

const Toolbar = ({
  editorState,
  onChange,
  disabled
}) => {
  const stylesButtons = [
    {
      setting: 'BOLD',
      render: <b>Ж</b>
    },
    {
      setting: 'ITALIC',
      render: <i>К</i>
    },
    {
      setting: 'UNDERLINE',
      render: <ins>Ч</ins>
    },
    {
      setting: 'STRIKETHROUGH',
      render: <s>abc</s>
    }
  ]

  const blockButtons = [
    {
      setting: 'unordered-list-item',
      render: <p>Неуп. список</p>
    },
    {
      setting: 'ordered-list-item',
      render: <p>Уп. список</p>
    },
    {
      setting: 'code-block',
      render: <pre>code</pre>
    },
  ]

  const imageButton = {
    setting: 'IMAGE',
    render: <img src={addImage} alt="Добавление изображения" width="25px" />
  }

  const linkButton = {
    setting: 'LINK',
    // eslint-disable-next-line jsx-a11y/anchor-is-valid  
    render: <a href="#">Ссылка</a>
  }

  return (
    <div className='editor__toolbar'>
      {stylesButtons.map((el) => <StyleButton
        editorState={editorState}
        onChange={onChange}
        key={el.setting}
        setting={el.setting}
        render={el.render}
        disabled={disabled}
      />)}

      <div />

      {blockButtons.map((el) => <BlockButton
        editorState={editorState}
        onChange={onChange}
        key={el.setting}
        setting={el.setting}
        render={el.render}
        disabled={disabled}
      />)}

      <div />

      <ImageButton
        editorState={editorState}
        onChange={onChange}
        setting={imageButton.setting}
        render={imageButton.render}
        disabled={disabled}
      />

      <LinkButton
        editorState={editorState}
        onChange={onChange}
        setting={linkButton.setting}
        render={linkButton.render}
        disabled={disabled}
      />
    </div>
  )
}

Toolbar.propTypes = {
  editorState: PropTypes.object,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
}

export default Toolbar