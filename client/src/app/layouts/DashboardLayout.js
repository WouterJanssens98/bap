import { default as React } from 'react';

import { Footer, Header } from '../components';


const DashboardLayout = ({children}) => {

  return (
    <div className="page d-flex dash-color">
        <Header/>
            <main className="page-main">
                {children}
            </main>
    </div>
  );
};

export default DashboardLayout;