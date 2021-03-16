import React, { useEffect, useState } from 'react';

export const FormCategory = ({ saveChange, cancelEdit, itemId, itemName }) => {
  const [catName, setCatName] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    saveChange(catName);
  };

  useEffect (() => {
    setCatName(itemName);
  }, [itemName]);

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <span>ID:</span><br />
        <input type="text" value={itemId} readOnly />
      </div>
      <div style={{marginTop: '6px'}}>
        <span>Nama Kategori:</span><br />
        <input type="text" style={{width: '100%'}} value={catName} onChange={(e) => setCatName(e.target.value)} />
      </div>
      <div style={{marginTop: '6px', marginBottom: '12px'}}>
        <input type="submit" value="Save" />
        {' '}<input type="button" value="Cancel" onClick={(e)=>cancelEdit()} />
      </div>
    </form>
  );
};
