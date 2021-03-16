import React, { Fragment, useState } from 'react'
import axios from 'axios'
import { useIntl } from 'react-intl';
import Logo from '../assets/toko-cipto.svg';
import Spinner from './spinner'

const myHeaders = {
  Accept: 'application/pdf',
  'Content-Type': 'application/json'
}

const TokoCipto = () => {
  const intl = useIntl();
  const [load, setLoad] = useState(false)
  const [param, setParam] = useState({
    since: 16,
    prefix: 1706,
    from: 1,
    to: 100
  })
  const [open, setOpen] = useState(false)
  const title = 'Toko Cipto';

  // useEffect(()=> {

  // })

  const handleDivClick = () => {
    setOpen(true)
  }

  const handleCancelClick = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    setLoad(true)
    e.preventDefault()
    axios.post(intl.formatMessage({ id: 'downloadUrl' }) + 'cipto-toko/card.php', param, {
      responseType: 'arraybuffer',
      headers: myHeaders      
    })
    .then(response => {
      const blob = new Blob([response.data], {
        type: intl.formatMessage({ id: 'downloadType' }),
      });
      var url = window.URL.createObjectURL(blob)
      var a = document.createElement('a')
      a.href = url
      a.download = intl.formatMessage({ id: 'downloadTokoCipto' })
      a.click()
      a.remove()
      setTimeout(() => window.URL.revokeObjectURL(url), 100)
      setLoad(false)
    }).catch(error => {
      console.log(error)
    })

    setOpen(false)
  }

  return (
    <Fragment>

      {open ?
        <Fragment>
          <h3>{title}</h3>
          <div className="block">
            <form onSubmit={(e) => handleSubmit(e)} key="form1"
            style={{backgroundImage: `url(${Logo})` }}
            className="form-back co-3"
            >
              <div>
                <pre>
                <div className="form-control">
                    <label htmlFor="prefix">Since: </label> <input
                      type="number" autoFocus
                      name="since"
                      value={param.since}
                      onChange={(e) => setParam({...param, [e.target.name]: e.target.value})} /></div>
                    <div className="form-control">
                    <label htmlFor="prefix">Prefix:</label> <input
                      type="number"
                      name="prefix"
                      value={param.prefix}
                      onChange={(e) => setParam({...param, [e.target.name]: e.target.value})} /></div>
                  <div className="form-control"><label htmlFor="from">Start: </label> <input
                    type="number"
                    name="from"
                    value={param.from} 
                    onChange={(e) => setParam({...param, [e.target.name]: e.target.value})}/></div>
                  <div className="form-control"><label htmlFor="to">End:   </label> <input
                    type="number"
                    name="to"
                    value={param.to}
                    onChange={(e) => setParam({...param, [e.target.name]: e.target.value})} /></div>
                </pre>
                <div className="form-control">
                  <input type="submit" name="submit" id="submit" value="Submit" />
                  {' '}<button onClick={(e) => handleCancelClick(e)}>Cancel</button>
                </div>
              </div>
            </form>
          </div> 
        </Fragment> :
      <div className="block">
        <div style={{ cursor: 'pointer' }} onClick={handleDivClick}>            
          <img className="img-logo" width={180} src={Logo} alt="Toko Awalia" />
          {load && <><span className="spinner"><Spinner size={64} sizeUnit={'px'} color={'#6a0074'} /></span>
          <span className="wait-for-me">{intl.formatMessage({ id: 'pleaseWait' })}</span></>}
        </div>
      </div>
      }
    </Fragment>
  )
}

export default TokoCipto