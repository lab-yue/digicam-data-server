import API from "../api/index"
const api = new API()

export default {
    Query: {
        async allInfo() {
            return api.info.getAll()
        },
        async allCourse() {
            return api.course.getAll()
        },
    },
}
