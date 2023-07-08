import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectUserById } from './usersApiSlice';
import EditUserForm from './EditUserForm';

export default function EditUser() {
  const params = useParams();

  const user = useSelector((state) => selectUserById(state, params?.id));

  return <>{user ? <EditUserForm user={user} /> : <div>Loading...</div>}</>;
}
