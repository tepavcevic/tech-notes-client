import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const clientsAdapter = createEntityAdapter({});

const initialState = clientsAdapter.getInitialState();

export const clientsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => ({
        url: '/clients',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedClients = responseData.map((client) => {
          client.id = client._id;
          return client;
        });
        return clientsAdapter.setAll(initialState, loadedClients);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Client', id: 'LIST' },
            ...result.ids?.map((id) => ({ type: 'Client', id })),
          ];
        } else return [{ type: 'Client', id: 'LIST' }];
      },
    }),
    addNewClient: builder.mutation({
      query: (clientData) => ({
        url: '/clients',
        method: 'POST',
        body: clientData,
      }),
      invalidatesTags: [{ type: 'Client', id: 'LIST' }],
    }),
    updateClient: builder.mutation({
      query: (clientData) => ({
        url: '/clients',
        method: 'PATCH',
        body: clientData,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Client', id: arg.id }],
    }),
    deleteClient: builder.mutation({
      query: ({ id }) => ({
        url: '/clients',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Client', id: arg.id }],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useAddNewClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientsApiSlice;

export const selectClientsResult =
  clientsApiSlice.endpoints.getClients.select();

const selectClientsData = createSelector(
  selectClientsResult,
  (clientsResult) => clientsResult.data
);

export const {
  selectAll: selectAllClients,
  selectById: selectClientById,
  selectIds: selectClientIds,
} = clientsAdapter.getSelectors(
  (state) => selectClientsData(state) ?? initialState
);
