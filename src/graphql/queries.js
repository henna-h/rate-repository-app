import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection){
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges{
        node{
          id
          fullName
          ownerName
          name
          ratingAverage
          stargazersCount
          forksCount
          reviewCount
          ownerAvatarUrl
          description
          language
        }
      }
    } 
  }
`;

export const GET_AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      ownerName
      name
      ratingAverage
      stargazersCount
      forksCount
      reviewCount
      ownerAvatarUrl
      description
      language
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;