import React, {useState} from 'react'

import { Roller } from 'react-awesome-spinners'
const Spinner = (props) => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(true)  
  return (
    loading && <Roller {...props} />
  );
}

export default Spinner;