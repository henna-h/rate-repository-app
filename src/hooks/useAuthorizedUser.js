import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = (variables) => {
    const { loading, error, data } = useQuery(GET_AUTHORIZED_USER, { 
        fetchPolicy: 'cache-and-network',
        variables
    });

    return { authorizedUser: data ? data.authorizedUser : error, loading };
};

export default useAuthorizedUser;