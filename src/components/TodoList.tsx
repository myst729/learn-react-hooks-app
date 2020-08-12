import React from 'react'
import { useRequest } from 'ahooks'
import { Checkbox, List, Typography } from 'antd'

import { editTodo, removeTodo } from '../api'

export default function TodoList ({ data, update }: { data: Todo[]; update: Function }) {
  const { run: edit } = useRequest(editTodo, {
    manual: true,
    onSuccess: () => update()
  })

  const { run: remove } = useRequest(removeTodo, {
    manual: true,
    onSuccess: () => update()
  })

  return (
    <List
      bordered
      dataSource={data}
      renderItem={({_id, text, done}: Todo) => (
        <List.Item>
          <Checkbox checked={done} onChange={() => edit({ _id, text, done: !done })}>
            {done
              ? <Typography.Text delete>{text}</Typography.Text>
              : <Typography.Text>{text}</Typography.Text>
            }
          </Checkbox>
          <button className="todo-remove" onClick={() => remove(_id)}>X</button>
        </List.Item>
      )}
    />
  )
}
