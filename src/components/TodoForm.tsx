import React, { useState } from 'react'
import { useRequest } from 'ahooks'
import { Input } from 'antd'

import { addTodo } from '../api'

export default function TodoForm ({ update }: { update: Function }) {
  const [value, setValue] = useState('')

  const { run: add } = useRequest(addTodo, {
    manual: true,
    onSuccess: () => update()
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleKeyboardEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!value) return
    add(value)
    setValue('')
  }

  return (
    <Input
      bordered
      size="large"
      placeholder="Hit Enter to add a new task"
      value={value}
      onChange={handleChange}
      onPressEnter={handleKeyboardEnter}
    />
  )
}
