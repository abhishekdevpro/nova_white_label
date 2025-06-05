"use client"

import { useState, useReducer } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [tempMember, setTempMember] = useState({
    name: "",
    description: "",
    image: null,
  })
  const [, forceUpdate] = useReducer((x) => x + 1, 0)

  const token = localStorage.getItem("employeeLoginToken")

  const addTeamMember = () => {
    setEditingId("new")
    setTempMember({ name: "", description: "", image: null })
  }

  const saveTeamMember = async () => {
    const formData = new FormData()
    formData.append("name", tempMember.name)
    formData.append("description", tempMember.description)
    if (tempMember.image) {
      formData.append("image", tempMember.image)
    }

    try {
      const response = await axios.post("https://apiwl.novajobs.us/api/employeer/company-teams", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })

      if (response.status === 200) {
        toast.success("Team member saved successfully!")
        if (editingId === "new") {
          setTeamMembers((prev) => [...prev, { id: Date.now(), ...tempMember }])
        } else {
          setTeamMembers((prev) => prev.map((m) => (m.id === editingId ? { ...m, ...tempMember } : m)))
        }
        setEditingId(null)
        setTempMember({ name: "", description: "", image: null })
        forceUpdate()
      } else {
        toast.error("Failed to save team member.")
      }
    } catch (error) {
      toast.error("Error saving team member.")
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setTempMember({ name: "", description: "", image: null })
    forceUpdate()
  }

  return {
    teamMembers,
    setTeamMembers,
    editingId,
    setEditingId,
    tempMember,
    setTempMember,
    addTeamMember,
    saveTeamMember,
    cancelEdit,
    forceUpdate,
  }
}
