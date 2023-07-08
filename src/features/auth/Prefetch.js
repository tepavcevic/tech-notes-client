import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { store } from '../../app/store';
import { usersApiSlice } from '../users/usersApiSlice';
import { notesApiSlice } from '../notes/notesApiSlice';

export default function Prefetch() {
  useEffect(() => {
    console.log('subscribing');
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      console.log('unsubscriving');
      notes.unsubscribe();
      users.unsubscribe();
    };
  });
  return <Outlet />;
}
