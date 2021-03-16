import React from 'react';
import { useIntl } from 'react-intl';
//import Switch from 'react-switch';
//import MySelect from './test-react-select'
import LembarSoal from './soal'
import Mdta from './mdta'
import { FaHeart, FaBars } from 'react-icons/fa';
import {
  CiptoRabat,
  TokoCipto,
  TokoAwaliya,
  TokoSumiyati,
  TokoSyauqi,
  DianJaya,
  HjIdah
} from './components'
import { Route } from 'react-router-dom';
import { CategoryList } from '../src/category'

const Main = ({
  collapsed,
  rtl,
  image,
  handleToggleSidebar,
  handleCollapsedChange,
  handleRtlChange,
  handleImageChange,
}) => {
  const intl = useIntl();
  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>
      {/* <header> */}
      {/* <h1 style={{marginLeft: '20px'}}> */}
      {/* <img width={80} src={reactLogo} alt="react logo" />
           */}
      {/* {intl.formatMessage({ id: 'title' })} */}
      {/* </h1> */}
      {/* <p>{intl.formatMessage({ id: 'description' })}</p> */}
      {/* </header> */}
      <header>
        <h1 style={{ marginLeft: '20px' }}>
          {/* <img width={80} src={reactLogo} alt="react logo" /> */}
          {intl.formatMessage({ id: 'title' })}
        </h1>
        {/* <p>{intl.formatMessage({ id: 'description' })}</p> */}
      </header>
      <div className="main-body">
        <Route exact path="/">
          <CiptoRabat />
          <TokoCipto />
          <TokoAwaliya />
          <TokoSumiyati />
          <TokoSyauqi />
          <DianJaya />
          <HjIdah />
        </Route>
        {/* <Route exact path="/my-select" component={MySelect} /> */}
        <Route exact path="/lembar-soal" component={LembarSoal} />
        <Route exact path="/mdta" component={Mdta} />
        <Route exact path="/category" component={CategoryList} />        
      </div>
      <footer>
        <small>
          © 2020 made with <FaHeart style={{ color: 'red' }} /> by -{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/gucel_id">
            FYC
          </a>
        </small>
        <br />
        <div className="social-bagdes">
          <a href="https://twitter.com/gucel_id" target="_blank" rel="noopener noreferrer">
            <img
              alt="Twitter Follow"
              src="https://img.shields.io/twitter/follow/gucel_id?label=twitter&style=social"
            />
          </a>
        </div>
      </footer>
    </main>
  );
};

export default Main;
