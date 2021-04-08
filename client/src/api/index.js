import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8888/api',
})

export const insertCar = payload => api.post(`/car`, payload)
export const getAllCars = () => api.get(`/cars`)
export const updateCarById = (id, payload) => api.put(`/car/${id}`, payload)
export const deleteCarById = id => api.delete(`/car/${id}`)
export const getCarById = id => api.get(`/car/${id}`)

const apis = {
    insertCar,
    getAllCars,
    updateCarById,
    deleteCarById,
    getCarById,
}

export default apis