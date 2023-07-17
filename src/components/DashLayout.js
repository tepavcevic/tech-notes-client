import { Outlet } from 'react-router-dom';

import DashHeader from './DashHeader';
import DashFooter from './DashFooter';

export default function DashLayout() {
  return (
    <>
      <DashHeader />
      <div className="main-content container-lg px-4 pb-5 text-center">
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
}
