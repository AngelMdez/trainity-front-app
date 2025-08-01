import { UserForm } from './UserForm';
import { UserList } from './UserList';

export default function UsersPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Usuarios</h1>
      <UserForm />
      <UserList />
    </div>
  );
}
