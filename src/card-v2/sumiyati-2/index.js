import React, { Fragment, useState } from 'react'
import axios from 'axios'
import { useIntl } from 'react-intl';
import Logo  from '../../assets/sumiyati.svg';
import Spinner from '../../components/spinner'

const HEADERS = {
  Accept: 'application/pdf',
  'Content-Type': 'application/json'
}

const Sumiyati2 = () => {
  const intl = useIntl();
  const [load, setLoad] = useState(false)
  const [param, setParam] = useState({
    since: 2021,
    prefix: 621,
    from: 1,
    to: 100
  })
  //const [open, setOpen] = useState(false)
  const title = 'Toko ';
  // useEffect(()=> {

  // })

  // const handleDivClick = () => {
  //   setOpen(true)
  // }

  // const handleCancelClick = () => {
  //   setOpen(false)
  // }

  const handleSubmit = (e) => {
    setLoad(true)
    e.preventDefault()
    axios.post('http://pixel.id/sumiyati-2/', param, {
      responseType: 'arraybuffer',
      headers: HEADERS
    })
    .then(response => {
      const blob = new Blob([response.data], {
        type: 'application/pdf' //intl.formatMessage({ id: 'downloadType' }),
      });
      var url = window.URL.createObjectURL(blob)
      var a = document.createElement('a')
      a.href = url
      a.download = 'id-card-toko-sumiyati-2.pdf';
      a.click()
      a.remove()
      setTimeout(() => window.URL.revokeObjectURL(url), 100)
      setLoad(false)
    }).catch(error => {
      console.log(error)
    })

    //setOpen(false)
  }

  return (
    <Fragment>
          <h3>{title} <img className="img-logo" width={180} src={Logo} alt="Toko Hj. Sumiyati" /></h3>
          <table>
            <tbody>
              <tr>
                <td>Version:</td><td>V.2</td>
                </tr>
              <tr>
                <td>Barcode Module:</td><td>EAN-8</td>
              </tr>
            </tbody>
          </table>

          <div className="blockv2">
            <form onSubmit={(e) => handleSubmit(e)} key="form1">
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
                  <input type="submit" name="submit" id="submit" value="Download" />
                </div>
              </div>
            </form>
          </div>
      <div className="block">        
        <div>          
          {load && <><span className="spinner"><Spinner size={64} sizeUnit={'px'} color={'#0300a1'} /></span>
          <span className="wait-for-me">{intl.formatMessage({ id: 'pleaseWait' })}</span></>}
        </div>
      </div>
    </Fragment>
  )
}

export default Sumiyati2