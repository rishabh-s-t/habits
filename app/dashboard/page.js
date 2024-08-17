import Dashboard from '../component/Dashboard';
import Main from '../component/Main';
import Login from '../component/Login';

export const metadata = {
  title: 'habits | dashboard',
};

export default function DashboardPage() {
  return (
    <Main>
      <Dashboard />
    </Main>
  );
}
