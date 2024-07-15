import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://cms.ourcarediary.com/api/",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken
            if (token) {
                headers.set('authorization', 'Bearer ' + token)
                return headers
            }
        },
    })
})

export const { useGetUserDetailsQuery } = authApi;