import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
    const {loading, error, data } =  useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        // Other options
    });

    return { repositories: data ? data.repositories : error, loading};
};

export default useRepositories;