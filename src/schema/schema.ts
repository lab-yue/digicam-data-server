import { gql } from "apollo-server"

export default gql`

  type Query {
    info: [Info]
  }

  type Info {
    catagroy: String!
    date: String!
    property: String!
    title: String!
    sender: String!
    status: String!
    link:String!
    detail: InfoDetail
  }

  type InfoDetail {
    sender: String!
    date: String!
    catagroy: String!
    effectiveness: String!
    property: String!
    title: String!
    content: String!
    file: String!
  }

  type Curriculum {
    title: String!
    teachers: [String!]
    year: String!
    availability: String!
    day: String!
    time: String!
    status:String!
    link:String!
  }

`
