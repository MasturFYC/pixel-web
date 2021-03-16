import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FormCategory } from './FormCategory';

const URL_DATA = 'http://localhost:3000/categories'

const LIList = ({itemId, itemName}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [catName, setName] = useState('')

  const cancelEdit = () => {
    setIsEdit(false)
  }

  const saveChange = (v) => {
    setIsEdit(false)
    setName(v);
  }

  useEffect(() => {
    setName(itemName);
  }, [itemName])

  return (
    <li>
    {isEdit === true ? (
      <FormCategory saveChange={saveChange} cancelEdit={cancelEdit} itemId={itemId} itemName={catName} />
    )
    : (
      <span onClick={(e) => setIsEdit(true)} style={{cursor: 'pointer'}}>{catName}</span>
    )
    }
    </li>
  )
}

const CategoryList = () => {
  const [catList, setCatList] = useState([]);
  const [catCount, setCatCount] = useState(0);

  const loadCategories =  useCallback(async () => {
    await axios.get(URL_DATA, {
      select: 'id, name',
      order: 'name'
    }).then((response) => {
      const count = response.data.length;
      setCatCount(count);
      setCatList(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }, []);

  useEffect (()=> {
    if(catCount === 0) {
      loadCategories();
    }
  }, [catCount, loadCategories])

  return (
    <ul>
      {catList && catList.length && catList.map((item) => 
        <LIList
          key={`key_${item.id}`}
          itemId={item.id}
          itemName={item.name}
          />
      )}
    </ul>
  )
}

export default CategoryList;