const stateToHTMLOptions = {
  entityStyleFn: (entity) => {
    const entityType = entity.get('type')

    if (entityType === 'IMAGE') {
      const data = entity.getData()
      const width = data.width
        ? Number.isInteger(data.width)
          ? data.width + '%'
          : data.width.slice(0, -1) + '%'
        : '40%'

      return {
        element: 'img',
        attributes: {
          src: data.src,
          height: 'auto',
          width,
        },
      }
    } else if (entityType === 'LINK') {
      const data = entity.getData()

      return {
        element: 'a',
        attributes: {
          href: data.href,
        },
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
            class: 'code-block__start code-block__end',
          },
        }
      } else if (data['code-block__start']) {
        return {
          attributes: {
            class: 'code-block__start',
          },
        }
      } else if (data['code-block__end']) {
        return {
          attributes: {
            class: 'code-block__end',
          },
        }
      }
    }
  },
}

export default stateToHTMLOptions
