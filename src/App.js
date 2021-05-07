//import { fromPairs } from 'lodash';
import React, { useState } from 'react'
import { isEmpty, size } from 'lodash'
import shortid, { isValid } from 'shortid'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)

  const validForm = () => {
    let isValid = true
    setError(null)

    if(isEmpty(task)) {
      setError("Debes ingresar una tarea")
      isValid = false
    }

    return isValid
  }

  const addTask = (e) => {
    e.preventDefault()
    
    if(!validForm()){
      return
    }

  const newTask = {
    id: shortid.generate(),
    name: task
  }

    setTasks([ ...tasks, newTask ])
    setTask("")
  }

  const saveTask = (e) => {
    e.preventDefault()

    if(!validForm()){
      return
    }

    const editedTask = tasks.map(item => item.id === id ? { id, name: task} : item)
    setTasks(editedTask)
    setEditMode(false)
    setTask("")
    setId("")
  }

  const deleteTask = (id) => {
    const filteredTask = tasks.filter(task => task.id !== id)
    setTasks(filteredTask)
  }

  const editTask = (theTask) => {
    setTask(theTask.name)
    setEditMode(true)
    setId(theTask.id)
  }

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          {
            size(tasks) === 0 ? (
              <li className="list-group-item">Aún no hay tareas programadas.</li>
            ) 
            :
            (
              <ul className="list-group">
              {
                tasks.map((task) => (
                  <li className="list-group-item" key={task.id}>
                    <span className="list">{task.name}</span>
                    <button className="btn btn-danger btn-sm float-right mx-2"
                      onClick={() => deleteTask(task.id)}>Eliminar
                    </button>
                    <button className="btn btn-warning btn-sm float-right"
                      onClick={() => editTask(task)}>Editar
                    </button>
                  </li>
                ))
              }
              </ul>
            )
          }          
        </div>
        <div className="col-4">
          <h4 className="text-center">{ editMode ? "Modificar tarea" : "Agregar tarea" }</h4>
          <form onSubmit={ editMode ? saveTask : addTask }>
            {
              error && <span className="text-danger">{error}</span>
            }
            <input type="text" className="form-control mb-2" placeholder="ingrese la tarea..." 
              onChange={(text) => setTask(text.target.value)} value={task} />
            <button className={ editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block" } type="submit">
              { editMode ? "Guardar" : "Agregar" }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
