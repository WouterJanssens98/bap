import { default as React } from 'react';

import { Taskbar } from '../components';


const TaskbarLayout = ({children}) => {

  return (
    <div className="page">
        <Taskbar/>
            <main className="page-main taskbar-setup">
                {children}
            </main>
    </div>
  );
};

export default TaskbarLayout;