import { gql } from "apollo-server"

export default gql`
  type Query {
    allInfo: [Info]!
    allCourse: [Course]!
    allFeedbackSheet: [FeedbackSheet]!
    allTask: [Task]!
    allMaterial: [Material]!
  }

  type Info {
    catagroy: String!
    date: String!
    property: String!
    title: String!
    sender: String!
    status: String!
    link: String!
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

  type Course {
    title: String!
    teachers: [String!]
    year: String!
    availability: String!
    day: String!
    time: String!
    status: String!
    link: String!
  }

  type FeedbackSheet {
    date: String!
    course: String!
    time: String!
    deadline: String!
    status: String!
  }

  type Task {
    date: String!
    course: String!
    title: String!
    deadline: String!
    status: String!
  }

  type Material {
    date: String!
    property: String!
    course: String!
    title: String!
    status: String!
    link: String!
    detail: MaterialDetail
  }

  type MaterialDetail {
    sender: String!
    date: String!
    property: String!
    course: String!
    title: String!
    content: String!
    link: String!
    fileLink: String!
  }
`
