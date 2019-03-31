import Api from "../api/index"

const api = new Api()

export default {
    Query: {
        async info() {
            return api.getAllInfo()
        },
    },
}
