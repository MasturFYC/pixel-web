import React, { Fragment, useState, useEffect, useCallback } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios'
import { useIntl } from 'react-intl';
import DownPict from '../assets/download.svg';
//import Checkbox from "./Checkbox";

//const mks = ["Qur'an", "Hadits", "Aqidah", "Akhlak", "Fiqih", "SKI", "Bahasa Arab"];
// const classes = ["Kelas 1","Kelas 2","Kelas 3", "Kelas 4"];
const animatedComponents = makeAnimated();
const cbStyle = {
  verticalAlign: 'top',
  paddingTop: '8px',
  whiteSpace: 'nowrap',
  minWidth: '125px',
  display: 'flex',
  float: 'left',
};

// const selectStyle = {
//   menu: (provided, state) => ({
//     ...provided,
//     padding: '10px'
//   })
// }

const mySelect = {
  control: (provide, state) => ({
    ...provide,
    minWidth: 225
  })
};

const divRow = {
  clear: 'both',
  padding: '6px 0',
  float: 'none',
  display: 'flex',
  overFLow: 'auto',
  wordBreak: 'break-all',
  maxWidth: '100%',
}

const divCol = {
  float: 'left',
  minWidth: '225px',
  horizontalAlignment: 'top',
  display: 'flex',
  width: 'auto',
}

const myForm = {
  marginBottom: '36px'
}

const myButton = {
  height: '32px',
  paddingLeft: '36px',
  paddingRight: '12px',
  backgroundImage: `url(${DownPict})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '22px',
  backgroundPosition: '4px 3px',
  border: '1px solid #cecece',
  cursor: 'pointer',
};

const Mdta2 = () => {
  const intl = useIntl();
  const [isInit, setInit] = useState(true)
  const [kecamatan, setKecamatan] = useState([]);
  const [kecamatanId, setKecamatanId] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
/*
    let kecs = [];
    for (const item in kecamatanId) {
      const { value } = kecamatanId[item];
      kecs.push(value)
    }
*/

    let webSite = 'http://pixel.id/mdta2/get-rekap.php';
    axios.post(webSite, {
      kec: kecamatanId
    }, {
      responseType: 'arraybuffer',
      headers: {
        Accept: 'application/pdf',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      const blob = new Blob([response.data], {
        type: intl.formatMessage({ id: 'downloadType' }),
      });
      var url = window.URL.createObjectURL(blob)
      var a = document.createElement('a')
      a.href = url
      a.download = 'mdta2.pdf'
      a.click()
      a.remove()
      setTimeout(() => window.URL.revokeObjectURL(url), 100)
    }).catch(error => {
      console.log(error)
    })
  }

  const loadKecamatan = useCallback(async () => {
    let configs = {
      responseType: "json"
    };

    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    await axios.post('http://pixel.id/mdta2/get-kecamatan.php',
      configs, headers)
      .then(res => {
        setKecamatan(res.data);
      }).catch(error => {
        console.log(error)
      })
  }, []);

  useEffect(() => {
    let isLoaded = false;

    const getKecamatan = () => {
      if (!isLoaded) {
        loadKecamatan();
      }
    }

    getKecamatan();
    return () => {
      isLoaded = true;
    }
  }, [isInit, loadKecamatan]);

  const createOption = item => ({
    label: item.name,
    value: item.id
  });
  const createSelectOptions = () => kecamatan.map(createOption);


  return (
    <Fragment>
      <h1>
        DAFTAR REKAPITULASI SISWA MDTA
      </h1>
      <form onSubmit={(e) => handleSubmit(e)} style={myForm}>
        <div style={divRow}>
          <div style={cbStyle}><label htmlFor="kec">Kecamatan:</label></div>
          <div style={divCol}>
            <Select
              styles={mySelect}
              id="kec"
              placeholder={'Pilih kecamatan...'}
              closeMenuOnSelect={false}
              components={animatedComponents}
              defaultValue={kecamatanId}
              isMulti
              onChange={setKecamatanId}
              options={createSelectOptions()}
            />
          </div>
        </div>
        <div style={divRow}>
          <div style={cbStyle}>{' '}</div>
          <div style={divCol}>
            <input
              style={myButton}
              type="submit"
              name="submit"
              id="submit"
              value="Download"
              disabled={kecamatanId === null || kecamatanId.length === 0}
            />
          </div>
        </div>
      </form>
    </Fragment>
  );
}

export default Mdta2;