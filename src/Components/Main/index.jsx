import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Selects() {
  const [ufList, setUfList] = useState();
  const [teamList, setTeamList] = useState();
  const [selectedUf, setSelectedUf] = useState();

  useEffect(() => {
    axios.get('/estados.json').then((response) => {
      setUfList(response.data);
    });
    axios.get('/times.json').then((resp) => {
      setTeamList(resp.data);
    });
  },[]);

  const changeState = e => {
    setSelectedUf(e.target.value);
  }

  console.log(selectedUf)
  return(
    <div className='selects'>
      <div className="card">
        <label>Estados</label>
        <select 
          name="select"
          onChange={changeState}>
            {ufList?.map((estado)=> (
              <option value={estado.uf}>{estado.nome}</option>
            ))}
        </select>
      </div>

      <div className="card">
        <label>Times</label>
        <select 
          // onChange='changeTeam'
          name="select">
        </select>
      </div>

      <div className="card"></div>
    </div>
  )
}

export default Selects;