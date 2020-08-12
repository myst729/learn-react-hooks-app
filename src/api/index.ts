const API_ROOT = 'http://127.0.0.1:7000/todo-sqlite'

async function ajax (method: RestMethod, url: string, data?: Object | undefined) {
  const response = await fetch(url, {
    method,
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

function delay <T>(ms: number): (value: T) => Promise<T> {
  return (data: T) => new Promise(resolve => setTimeout(resolve, ms, data))
}

export const getTodos = () => ajax('GET', `${API_ROOT}/`).then(delay(Math.ceil(Math.random() * 1000))) // Simulate network latency
export const getTodo = (_id: string) => ajax('GET', `${API_ROOT}/${_id}`)
export const addTodo = (text: string) => ajax('POST', `${API_ROOT}/`, { text })
export const editTodo = (todo: Todo) => ajax('PUT', `${API_ROOT}/${todo._id}`, todo)
export const removeTodo = (_id: string) => ajax('DELETE', `${API_ROOT}/${_id}`)

export default {
  getTodos,
  getTodo,
  addTodo,
  editTodo,
  removeTodo
}
