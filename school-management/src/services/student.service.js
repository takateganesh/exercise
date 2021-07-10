import * as schools from '@/json/schools'
import * as students from '@/json/student/student'

export const doFetchList = (() => {
    // GET method will be here to fetch all records
    return students.default;
})
export const doFetchSchoolList = (() => {
    // GET method will be here to fetch all records
    return schools;
})


/*
export const doFetchOne = wrapRequest(({hubName}) => {
    const requestOptions = {
        method: 'GET',
        headers: getHubAuthHeader(oakHubName)
    };
    return fetch(`${oakApiUrl}/hub?name=eq.${hubName}`, requestOptions)

})


export const doPostOne = wrapRequest(({hub}) => {
    const requestOptions = {
        method: 'POST',
        headers: { ...getHubAuthHeader(oakHubName), 'Content-Type': 'application/json', 'Accept': 'application/vnd.pgrst.object+json',
        'Prefer': 'return=representation' },
        body: JSON.stringify( hub )
    };
    return fetch(`${oakApiUrl}/hub`, requestOptions)
})

export const doPatchOne = wrapRequest(({hub}) => {
    const requestOptions = {
        method: 'PATCH',
      headers: {
            'Content-Type': 'application/json', 'Accept': 'application/vnd.pgrst.object+json',
            'Prefer': 'return=representation', ...getHubAuthHeader(oakHubName)
        },
        body: JSON.stringify(hub)
    };
    return fetch(`${oakApiUrl}/hub?name=eq.${hub.name}`, requestOptions)
})
*/