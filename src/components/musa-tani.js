import React, { Fragment, useState } from 'react'
import axios from 'axios'
import { useIntl } from 'react-intl';
import Logo  from '../assets/musa-tani.svg';
import Spinner from './spinner'

const HEADERS = {
  Accept: 'application/pdf',
  'Content-Type': 'application/json'
}

const MusaTani = () => {
  const intl = useIntl();
  const [load, setLoad] = useState(false)
  const [param, setParam] = useState({
    since: 20,
    prefix: 321,
    from: 1,
    to: 100
  })
  const [open, setOpen] = useState(false)
  const title = 'Musa Tani';
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
    axios.post(intl.formatMessage({ id: 'downloadUrl' }) + 'musa-tani/card.php', param, {
      responseType: 'arraybuffer',
      headers: HEADERS
    })
    .then(response => {
      const blob = new Blob([response.data], {
        type: intl.formatMessage({ id: 'downloadType' }),
      });
      var url = window.URL.createObjectURL(blob)
      var a = document.createElement('a')
      a.href = url
      a.download = 'id-card-musa-tani.pdf'
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
            className="form-back co-7"
            >
              <div>
                <pre>
                <div className="form-control">
                    <label htmlFor="since">Since: </label> <input
                      type="number" 
                      id="since"
                      maxLength={2}
                      value={param.since}
                      onChange={(e) => setParam({...param, since: e.target.value})} /></div>
                    <div className="form-control">
                    <label htmlFor="prefix">Prefix:</label> <input
                      type="number"
                      id="prefix"
                      maxLength={4}
                      value={param.prefix}
                      onChange={(e) => setParam({...param, prefix: e.target.value})} /></div>
                  <div className="form-control"><label htmlFor="from">Start: </label> <input
                    type="number"
                    id="from"
                    maxLength={4}
                    autoFocus
                    value={param.from} 
                    onChange={(e) => setParam({...param, from: e.target.value})}/></div>
                  <div className="form-control"><label htmlFor="to">End:   </label> <input
                    type="number"
                    id="to"
                    maxLength={4}
                    value={param.to}
                    onChange={(e) => setParam({...param, to: e.target.value})} /></div>
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
          <img className="img-logo" width={180} src={Logo} alt="Musa Tani Logo" />
          {load && <><span className="spinner"><Spinner size={64} sizeUnit={'px'} color={'#0b2c80'} /></span>
          <span className="wait-for-me">{intl.formatMessage({ id: 'pleaseWait' })}</span></>}
        </div>
      </div>
      }
    </Fragment>
  )
}

export default MusaTani