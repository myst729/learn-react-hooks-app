import React, { useState, useEffect } from 'react'
import { useRequest } from 'ahooks'
import { Divider } from 'antd'

import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import { getTodos } from './api'
import './App.css'

export default function App () {
  const [data, setData] = useState([] as Todo[])

  const { run, error, loading } = useRequest(getTodos, {
    manual: true,
    onSuccess: result => setData(result)
  })

  useEffect(() => {
    run()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (error) {
    return (
      <div className="todo-app">
        <div className="todo-error">Oops... Something went wrong!</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="todo-app">
        <div className="todo-loading">Loading...</div>
      </div>
    )
  }

  return (
    <div className="todo-app">
      <Divider orientation="left">Tasks</Divider>
      <TodoList data={data} update={run} />
      <br />
      <TodoForm update={run} />
    </div>
  )
}
