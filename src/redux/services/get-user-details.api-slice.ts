import { baseApiSlice } from '@/redux/api/base-api'

export interface IGetUserResponse {
    data: Record<string, string>
}


export interface IUserPayload {
    email: string;
    code: string
}

export const usersApiSlice = baseApiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query<IGetUserResponse, IUserPayload>({
            query: ({ email, code }) => ({
                url: `student-info?email=${email}&code=${code}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
    }),
})

export const {
    useLazyGetUsersQuery
} = usersApiSlice
