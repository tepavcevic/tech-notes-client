import { Outlet } from 'react-router-dom';

import DashHeader from './DashHeader';
import DashFooter from './DashFooter';

export default function DashLayout() {
  return (
    <>
      <DashHeader />
      <section className="container-md main-content pb-5">
        <Outlet />
      </section>
      <DashFooter />
    </>
  );
}
