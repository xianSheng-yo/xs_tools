// import { XsAxios } from 'xs_tools';
// import { TRequestInterceptor } from 'xs_tools/xsAxios';
import { ApolloClient } from 'xs_tools';
import { TGraphqlQuerPayload } from 'xs_tools/graphqlLoader/apollo';
type TGraphqlPayload = { variables: Record<string, any> };

// const requestInterceptor: TRequestInterceptor = [
//   (vaule) => {
//     console.log('requestInterceptor: ', vaule);
//     return vaule;
//   },
//   null,
//   undefined,
// ];

// const request = new XsAxios({
//   baseURL: 'https://reqres.in/',
//   requestInterceptor,
// });
// export const getComment = request.generateFunc('get', 'api/users');

const apolloClient = new ApolloClient({ appName: 'organization' });
export const graphqlQuery = (payload: TGraphqlQuerPayload<TGraphqlPayload>) => apolloClient.graphqlQuery(payload);
