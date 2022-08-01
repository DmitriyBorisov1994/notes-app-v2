import axios, { AxiosInstance } from 'axios'

const instance:AxiosInstance = axios.create({
   baseURL: 'http://localhost:3001/'
})

export const getNotes = () => {
   return instance.get('notes')
}

export const deleteNote = (id: string) => {
   return instance.delete(`notes/${id}`)
}

export const toggleNote = (id: string, obj:object) => {
   return instance.patch(`notes/${id}`, obj)
}

export const addNote = (note:object) => {
   return instance.post(`notes/`, note)
}

export const getNote = (id:string) => {
   return instance.get(`notes/${id}`)
}
