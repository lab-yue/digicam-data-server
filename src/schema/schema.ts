import { gql } from "apollo-server";

export default gql`

  type Query {
    waste(genre:String,type:String):  [Waste]
    records(year: String, month: String): [Record]
    prefectures: [Prefecture]
    prefecture(id: String,name:String): Prefecture
    industries: [Industry]
    industry(id: String): Industry
    stores:[Store]
    store(id: String):Store
    year(year:String): Year
    month(year:String,month:String): Month
  }

  
`;
