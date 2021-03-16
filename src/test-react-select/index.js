import React, {useState} from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();
const options = [
  { value: 'chocolate', label: 'Chocolate', key: 'key1' },
  { value: 'strawberry', label: 'Strawberry', key: 'key2' },
  { value: 'vanilla', label: 'Vanilla', key: 'key3' }
]

export default function MySelect() {
  const [selectedOption, setSelectedOption] = useState([options[0]]);
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={selectedOption}
      isMulti
      onChange={setSelectedOption}
      options={options}
    />
  );
}