import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories($after: String, $first: Int, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String){
    repositories(after: $after, first: $first, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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
        cursor
      }
      pageInfo{
        endCursor
        startCursor
        hasNextPage
      }
    } 
  }
`;

export const GET_AUTHORIZED_USER = gql`
  query getAuthorizedUser($includeReviews: Boolean = false) {
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
           id
           user {
             id
             username
           }
           repository{
             id
             name
           }
           rating
           createdAt
           text
          }
          cursor
        }
        pageInfo {
          hasNextPage,
          startCursor,
          endCursor
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($id: ID!, $first: Int, $after: String) {
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
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;