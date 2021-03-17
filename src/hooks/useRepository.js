import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = ({ id }) => {
    const { loading, error, data } =  useQuery(GET_REPOSITORY, {
      fetchPolicy: 'cache-and-network',
      variables: { id }
    });

    return { repository: data ? data.repository : error, loading};
};

export default useRepository;