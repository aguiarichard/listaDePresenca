import React, { useState, useEffect } from "react"

import "./styles.css"

import { Card } from "../../components/Card"
import imgAnonimo from "../../assets/anonimo.png"

export function Home() {
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({ name: "Anônimo", avatar: imgAnonimo })

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setStudents(prevStudent => [...prevStudent, newStudent])
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.github.com/users/aguiarichard")
      const data = await response.json()

      if (data.name) {
        setUser({
          name: data.name,
          avatar: data.avatar_url
        })
      } else {
        return
      }
    }

    fetchData()
  }, [students])

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>

        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de Perfil" />
        </div>
      </header>

      <input
        type="text"
        placeholder="digite um nome..."
        onChange={e => setStudentName(e.target.value)}
      />

      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        students.map(student => (
          <Card
            key={student.time}
            name={student.name}
            time={student.time}
          />
        ))
      }
    </div>
  )
}