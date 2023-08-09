export default {
  entityStyleFn: (entity) => {
    const entityType = entity.get('type')

    if (entityType === 'IMAGE') {
      const data = entity.getData()

      return {
        element: 'img',
        attributes: {
          src: data.src,
          height: 'auto',
          width: data.width ? data.width + '%' : '40%'
        }
      }
    }
  },
  blockStyleFn: (block) => {
    const type = block.getType()

    if (type === 'code-block') {
      const data = block.codeBlock

      if (data['code-block__start'] && data['code-block__end']) {
        return {
          attributes: {
            class: "code-block__start code-block__end"
          }
        }
      } else if (data['code-block__start']) {
        return {
          attributes: {
            class: "code-block__start"
          }
        }
      } else if (data['code-block__end']) {
        return {
          attributes: {
            class: "code-block__end"
          }
        }
      }
    }
  }
}
