
const PostList = (props) => {
  const { id, title, content, image, tags } = props.post
  const { onDelete } = props
  return (
    <>
      <tr key={id}>
        <td>
          <img src={image} alt={title} width="100" />
        </td>
        <td>{title}</td>
        <td>{content}</td>
        <td>{tags.join(', ')}</td>
        <td>
          {/* <i
            className="fa-solid fa-pencil me-3"
          onClick={() => handlerSetEditTask(task.id)}
          ></i> */}
          <i
            className="fa-solid fa-trash-can trash"
            onClick={onDelete}
          ></i>
        </td>
      </tr>
    </>
  )
}

export default PostList