import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { store } from '../../app/store';
import { usersApiSlice } from '../users/usersApiSlice';
import { notesApiSlice } from '../notes/notesApiSlice';
import { clientsApiSlice } from '../clients/clientsApiSlice';

export default function Prefetch() {
  useEffect(() => {
    store.dispatch(
      notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true })
    );
    store.dispatch(
      usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true })
    );
    store.dispatch(
      clientsApiSlice.util.prefetch('getClients', 'clientsList', {
        force: true,
      })
    );
  }, []);
  return <Outlet />;
}
