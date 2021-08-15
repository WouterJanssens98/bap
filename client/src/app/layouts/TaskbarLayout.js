import { default as React } from 'react';



const TaskbarLayout = ({children}) => {


  return (
    <div className="page">
            <main className="page-main">
                {children}
            </main>
    </div>
  );
};

export default TaskbarLayout;