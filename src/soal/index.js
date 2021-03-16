import React, { Fragment, useState, useEffect, useCallback } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios'
import { useIntl } from 'react-intl';
import DownPict from '../assets/download.svg';
//import Checkbox from "./Checkbox";

const mks = ["Akidah", "Akhlaq", "Al-Qur'an", "B. Arab", "Fikih", "Hadits", "Tarikh Islam"];
const classes = ["Kelas 1","Kelas 2","Kelas 3", "Kelas 4"];
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

const LembarSoal = () => {
  const intl = useIntl();
  const [isInit, setInit] = useState(true)
  const [kecamatan, setKecamatan] = useState([]);

  const [kecamatanId, setKecamatanId] = useState([{label: 'Anjatan', value: 'Anjatan'}]);
  // const [kecamatanId, setKecamatanId] = useState('Anjatan')
  const [mk, setMk] = useState([{label: mks[0], value: mks[0]}])
  const [kelas, setKelas] = useState(classes.map(
    (key, item) => ({
      label: key, 
      value: item+1
    }),
    {}
  ));
  //  [{label: classes[0], value: classes[0]}])

  // const [checkboxes, setCheckBoxes] = useState(mks.reduce(
  //   (options, option) => ({
  //     ...options,
  //     [option]: option === 'Akidah' ? true : false
  //   }),
  //   {}
  // ));

  // const [kelas, setClass] = useState(classes.reduce(
  //   (options, option) => ({
  //     ...options,
  //     [option]: true
  //   }),
  //   {}
  // ));

  const handleSubmit = (e) => {
    e.preventDefault();

    let arrMK = [];
    let arrClass = [];
    let kecs = [];

    /*
    for(let i = 0; i < kecamatanId.length; i++) {
      kecs.push(kecamatanId[i].value);
    }
    */

     for(const item in kecamatanId) {
       const {value} = kecamatanId[item]; 
       kecs.push(value)
     }
    //  console.log(kecs)
    //  return 0;
    for(const item in mk) {
      const {value} = mk[item]; 
      arrMK.push(value)
    }
    for(const item in kelas) {
      const {value} = kelas[item]; 
      arrClass.push(value)
    }

    // console.log(arrMK, arrClass);
    // return 0;
    // Object.keys(checkboxes)
    //   .filter(checkbox => checkboxes[checkbox])
    //   .forEach(checkbox => {
    //     arrMK.push(checkbox);
    //   });

    // Object.keys(kelas)
    //   .filter(name => kelas[name])
    //   .forEach(name => {
    //     arrClass.push(parseInt(name.split(' ')[1]));
    //   });

    let webSite = 'http://pixel.id/lembar-soal/index-all-mk-class-kec.php';
    axios.post(webSite, {
      kec: kecs.sort(),
      mk: arrMK.sort(),
      class: arrClass.sort((a,b)=>(a - b))
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
      a.download = 'lembar-soal.pdf'
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

    await axios.post('http://pixel.id/lembar-soal/get-kecamatan.php',
      configs, headers)
      .then(res => {
        setKecamatan(res.data);
      }).catch(error => {
        console.log(error)
      })
  }, []);

  useEffect(() => {
    if (isInit === true) {
      loadKecamatan();
      setInit(false);
    }
  }, [isInit, loadKecamatan]);


  // const handleCheckboxChange = changeEvent => {
  //   //changeEvent.preventDefault();
  //   const { name } = changeEvent.target;
  //   setCheckBoxes({
  //     ...checkboxes,
  //     [name]: !checkboxes[name]
  //   });
  // };

  // const handleMkChange = e => {

  //   const value = !selectMK;
  //   setSelectMK(value);

  //   let rest = mks.reduce(
  //     (options, option) => ({
  //       ...options,
  //       [option]: value
  //     }),
  //     {}
  //   )
  //   setCheckBoxes(rest)
  // };

  // const handleClassChange = e => {
  //   //changeEvent.preventDefault();
  //   const { name } = e.target;
  //   setClass({
  //     ...kelas,
  //     [name]: !kelas[name]
  //   });
  // };

  // const createCheckbox = option => (
  //   <Checkbox
  //     label={option}
  //     isSelected={checkboxes[option]}
  //     onCheckboxChange={handleCheckboxChange}
  //     key={option}
  //   />
  // );

  // const createClassbox = option => (
  //   <Checkbox
  //     label={option}
  //     isSelected={kelas[option]}
  //     onCheckboxChange={handleClassChange}
  //     key={option}
  //   />
  // );

  const createOption = item => ({
    label: item.name,
    value: item.name
  });

  const createMp = item => ({
    label: item,
    value: item
  });

  const createKelas = (key, item) => ({
    label: key,
    value: item+1
  });
  
  const createSelectOptions = () => kecamatan.map(createOption);
  const createCheckboxes = () => mks.map(createMp);
  const createClassboxes = () => classes.map(createKelas);


  return (
    <Fragment>
      <h1>Lembar Soal</h1>
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
                    {/* <select name="kec" id="kec"
                    style={{ marginLeft: '4px' }}
                    onChange={(e) => setKecamatanId(e.target.value)}
                    value={kecamatanId}
                  > */}
                    { /* kecamatan && kecamatan.length && createSelectOptions() */}
                  {/* </select> */}
        </div>
        <div style={divRow}>
          <div style={cbStyle}><label htmlFor="kelas">Kelas:</label></div>
          <div style={divCol}>
            <Select
              styles={mySelect}
              id="kelas"
              placeholder={'Pilih Kelas...'}
              closeMenuOnSelect={true}
              components={animatedComponents}
              defaultValue={kelas}
              isMulti
              onChange={setKelas}
              options={createClassboxes()}
                />{/* createClassboxes() */}
          </div>
        </div>
        <div style={divRow}>
          <div style={cbStyle}><label htmlFor="mp">Mata Pelajaran:</label></div>
                    {/* <Checkbox
                      label={'Mata Pelajaran:'}
                      isSelected={selectMK}
                      onCheckboxChange={(e) => handleMkChange(e)}
                      key={'key1'}
                    /> */}
          <div style={divCol}>
            <Select
              styles={mySelect}
              id="mp"
              placeholder={'Pilih Mata Pelajaran...'}
              closeMenuOnSelect={true}
              components={animatedComponents}
              defaultValue={mk}
              isMulti
              onChange={setMk}
              options={createCheckboxes()}
            />
                    {/* createCheckboxes() */}
          </div>
        </div>
        <div style={divRow}>
          <div style={cbStyle}>{' '}</div>
          <div style={divCol}>
            <input style={myButton} type="submit" name="submit" id="submit" value="Download" />
          </div>
        </div>
      </form>
    </Fragment>
  );
}

export default LembarSoal;