import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Verifier {
    id: ID @id
    name: String
    organization: String
    location: [Location]
    addressKey: String @unique
    addressId: String @unique
    totalApprovals: Int
    githubUsername: String
    githubAvatarUrl: String
    githubIssueNumber: Int
    status: Status
    startedAt: DateTime
    createdAt: DateTime @timestamp(operations: [CREATE])
    updatedAt: DateTime @timestamp(operations: [UPDATE])
    hasDatacap: DataCap @relationship(type: "HAS", direction: OUT)
    hasStats: Stats @relationship(type: "HAS", direction: OUT)
    hasClient: Client @relationship(type: "HAS", direction: OUT)
    fromDatasource: DataSource @relationship(type: "FROM", direction: OUT)
  }

  type DataCap {
    total: BigInt
    available: BigInt
    allocated: BigInt
    usedInDeals: BigInt
    verifierHas: Verifier @relationship(type: "HAS", direction: IN)
  }

  type Stats {
    averageTtd: Int
    verifierHas: Verifier @relationship(type: "HAS", direction: IN)
  }

  type Client {
    id: ID
    verifierHas: Verifier @relationship(type: "HAS", direction: IN)
  }

  type DataSource {
    id: ID
    name: String
    url: String
    verifierFrom: Verifier @relationship(type: "FROM", direction: IN)
  }

  type Query {
    verifiersFromInterPlanetaryOne: [Verifier]
  }

  enum Location {
    AFRICA
    ASIA_NOT_GREATER_CHINA
    EUROPE
    GREATER_CHINA
    NORTH_AMERICA
    OCEANIA
    SOUTH_AMERICA
  }

  enum Status {
    ACTIVE
    INACTIVE
    REMOVED
  }

  enum Source {
    GITHUB
    HUBSPOT
    INTERPLANETARY_ONE
    GLIF
  }
`;
