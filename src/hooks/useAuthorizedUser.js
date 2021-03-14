import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = () => {
    const { loading, error, data } = useQuery(GET_AUTHORIZED_USER, { fetchPolicy: 'cache-and-network'});

    return { authorizedUser: data ? data.authorizedUser : error, loading };
};

export default useAuthorizedUser;