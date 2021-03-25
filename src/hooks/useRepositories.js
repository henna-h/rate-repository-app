import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
    const {loading, error, data } =  useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables
    });

    return { repositories: data ? data.repositories : error, loading};
};

export default useRepositories;