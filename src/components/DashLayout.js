import { Outlet } from 'react-router-dom';

import DashHeader from './DashHeader';
import DashFooter from './DashFooter';

export default function DashLayout() {
  return (
    <>
      <DashHeader />
      <div className="container-lg px-4 py-5 px-lg-0 text-center">
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
}
