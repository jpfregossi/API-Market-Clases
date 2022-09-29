import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMmExZTRkNjg0N2Q5MjBkN2I0YjM5OCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjM4NjExODIsImV4cCI6MTY2NDEyMDM4Mn0.8lXy-DYvEfD-xF0tu5t_0VvZRonryVnKrnMKkk5J19k"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: `Bearer ${TOKEN}` }
})