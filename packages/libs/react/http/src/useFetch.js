import axios from 'axios'
import {useQuery} from 'react-query'
import {get, isString, isFunction} from 'lodash-es'
import isJSON from 'validator/lib/isJSON'

const getData = async (key, {url, transformResponse}) => {
    const { data } = await axios({
        url,
        transformResponse: [function (data) {
            if(isJSON(data)) {
                let result = JSON.parse(data)

                if(isString(transformResponse)) {
                    return get(result, transformResponse)
                } else if(isFunction(transformResponse)){
                    return transformResponse(result)
                }

                return result
            }

            return data
        }]
    })
    return data
}



function useFetch(props) {
    const {key, url, transformResponse, initialData, manual = false} = props

    const {data, status, ...request} = useQuery([key, {url, transformResponse}], getData, { manual })

    return {
        data,
        loading: status === 'success',
        ...request
    }
}

export default useFetch