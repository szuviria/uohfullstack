import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const createPerson = (personObject) => {
    const request = axios.post(baseUrl, personObject)
    return request.then(res => res.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then()
}

const updatePerson = (changedPerson) => {
    const request = axios.put(`${baseUrl}/${changedPerson.id}`, changedPerson)
    return request.then(res => res.data)
}

const personService = { getAll, createPerson, deletePerson, updatePerson }

export default personService
