import { default as React, Fragment} from 'react';
import ReactDOM from 'react-dom'
import { useAuth, useApi } from '../../services';
import {useSpring, animated} from 'react-spring';


const DashboardHomePage = () => {
  const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1]
  const trans = (x, y, s) => `perspective(3500px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 1, tension: 10, friction: 50 } }))
  
  
  return (
    <Fragment>
      <div class="dashboard-content">

          
        <div class="d-flex flex-column">

          <div class="d-flex flex-row statistics">

            <div class="stat"> 
              <div> 
                <p class="stat-title">RENNERS</p>
              </div>
              <div class="stat-info"> 
                <div class="col-6">
                  <i class="stat-icon fas fa-bicycle"></i> 
                </div>
                <div class="col-6">
                  <p class="stat-amount">25</p>
                </div>
              </div>
            </div>

            <div class="stat"> 
              <div> 
                <p class="stat-title">RITTEN</p>
              </div>
              <div class="stat-info"> 
                <div class="col-6">
                  <i class="stat-icon fas fa-road"></i> 
                </div>
                <div class="col-6">
                  <p class="stat-amount">25</p>
                </div>
              </div>
            </div>
{/* 
            <div class="stat"> 
              <div> 
                <p class="stat-title">OVERWINNINGEN</p>
              </div>
              <div class="stat-info"> 
                <div class="col-6">
                  <i class="stat-icon2 fas fa-trophy"></i> 
                </div>
                <div class="col-6">
                  <p class="stat-amount">25</p>
                </div>
              </div>
            </div> */}

           
            <div class="stat"> 
              <div> 
                <p class="stat-title">KILOMETERS</p>
              </div>
              <div class="stat-info"> 
                <div class="col-6">
                  <i class="stat-icon fas fa-bicycle"></i> 
                </div>
                <div class="col-6">
                  <p class="stat-amount">25</p>
                </div>
              </div>
            </div>
            
          </div>

         
          
        

          <div  class="d-flex">
              
              <animated.div
               
                onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
                onMouseLeave={() => set({ xys: [0, 0, 1] })}
                style={{ transform: props.xys.to(trans) }}
              >

              <div class="stat-featured">

                <div class="stat-featuredrider">
                  <p class="stat-title2">LAATSTE TOEVOEGING</p>

                  <p class="stat-title3">EDDY MERCKX</p>

                  <p class="stat-title3">1960-1970</p>
                </div>
                  
              </div>
              </animated.div>
            
          </div>


        </div>
      </div>
    </Fragment>
  );
};

export default DashboardHomePage;