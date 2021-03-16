import React from 'react';
import { RepositoryListContainer } from '../../components/RepositoryList';
import { render } from '@testing-library/react-native';

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
      it('renders repository information correctly', () => {
        const repositories = {
          totalCount: 8,
          pageInfo: {
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            },
          ],
        };
  
        // Add your test code here
        const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

        const fullNames = getAllByTestId('fullName');
        expect(fullNames[0]).toHaveTextContent('jaredpalmer/formik');
        expect(fullNames[1]).toHaveTextContent('async-library/react-async');

        const descriptions = getAllByTestId('description');
        expect(descriptions[0]).toHaveTextContent('Build forms in React, without the tears');
        expect(descriptions[1]).toHaveTextContent('Flexible promise-based React data loader');

        const languages = getAllByTestId('language');
        expect(languages[0]).toHaveTextContent('TypeScript');
        expect(languages[1]).toHaveTextContent('JavaScript');

        const forksCounts = getAllByTestId('forksCount');
        expect(forksCounts[0]).toHaveTextContent('1619');
        expect(forksCounts[1]).toHaveTextContent('69');

        const stargazersCounts = getAllByTestId('stargazersCount');
        expect(stargazersCounts[0]).toHaveTextContent('21856');
        expect(stargazersCounts[1]).toHaveTextContent('1760');

        const ratingAverage = getAllByTestId('ratingAverage');
        expect(ratingAverage[0]).toHaveTextContent('88');
        expect(ratingAverage[1]).toHaveTextContent('72');

        const reviewCount = getAllByTestId('reviewCount');
        expect(reviewCount[0]).toHaveTextContent('3');
        expect(reviewCount[1]).toHaveTextContent('3');
  
      });
    });
  });