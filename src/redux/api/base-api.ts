import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

// Define custom headers
const headers = new Headers()
// Add a Content-Type header
headers.append('Content-Type', 'application/json; charset=UTF-8')

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    mode: 'cors',
    prepareHeaders: (headers, { }) => {
        headers.set('Accept', 'application/json')
        headers.set('Content-Type', 'application/json; charset=UTF-8')
        headers.set('x-api-key', `${process.env.NEXT_PUBLIC_API_KEY}`)

        return headers
    },
})

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)

    return result
}

export const baseApiSlice = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        'getUser',
    ],
    refetchOnReconnect: true,
    // keepUnusedDataFor: 30,
    refetchOnMountOrArgChange: true,
    // refetchOnFocus: true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpoints: builder => ({}),
})
