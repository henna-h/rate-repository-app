import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
        edges{
          node{
            id
            ownerName
            name
            ratingAverage
            stargazersCount
            forksCount
            ownerAvatarUrl
            description
            language
        }
      }
    } 
  }
`;

// other queries...