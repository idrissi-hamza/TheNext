// pending_actions
import React from 'react'

const Task = ({todo}) => {
  return (
    <div className="bg-stone-100 m-1 p-2 rounkded ">
      <span>{todo}</span>
      <button className="material-icons-outlined px-1  ">pending_actions</button>
      <button className="material-icons-outlined px-1  ">delete_forever</button>

    </div>
  )
}

export default Task