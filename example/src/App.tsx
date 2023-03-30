import React, { useEffect } from 'react';
import { graphqlQuery } from './serves/axios';
// import { getComment } from './serves/axios';
function App() {
  useEffect(() => {
    // getComment()
    //   .then((res) => {
    //     console.log('res: ', res);
    //   })
    //   .catch((err) => {
    //     console.log('err: ', err.toString());
    //   });
    graphqlQuery({
      query: `
        query organizationOrgUnitRootGet {
          organizationOrgUnitRootGet {
            code
            data {
              content {
                code
                isEnable
                effectiveTime
                invalidTime
                id
                institutionId
                logo
                name
                parentId
                parentName
                shortName
                sortId
                type
                typeName
                businessId
              }
            }
            message
            status
          }
        }
    `,
      variables: {
        // params: {
        //   orgId: '-1730833917365171641',
        //   isEnable: true,
        // },
        // pageInfo: {
        //   pageNumber: 1,
        //   pageSize: 20,
        //   needTotal: true,
        // },
      },
    });

    // fetch('/organization/graphql?organizationOrgUnitRootGet', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     query: `
    //     query organizationOrgUnitRootGet {
    //       organizationOrgUnitRootGet {
    //         code
    //         data {
    //           content {
    //             code
    //             isEnable
    //             effectiveTime
    //             invalidTime
    //             id
    //             institutionId
    //             logo
    //             name
    //             parentId
    //             parentName
    //             shortName
    //             sortId
    //             type
    //             typeName
    //             businessId
    //           }
    //         }
    //         message
    //         status
    //       }
    //     }
    //     `,
    //     variables: {},
    //   }),
    //   mode: 'cors',
    // });
  }, []);

  return <div className="App"></div>;
}

export default App;
