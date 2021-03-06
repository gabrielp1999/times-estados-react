import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Selects() {
  const [ufList, setUfList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [selectedUf, setSelectedUf] = useState();
  const [imgTeam, setImgTeam] = useState('');
  const [url, setUrl] = useState(`https://timesjs.herokuapp.com`);

  useEffect(() => {
    axios.get(`${url}/estados`).then((response) => {
      setUfList(response.data);
      const getState = response.data.find( e => {
        return e;
      });
      setSelectedUf(getState.uf);
    });
  },[]);

  useEffect(() => {
    if(selectedUf){
      axios.get(`${url}/times/${selectedUf}`).then((response) => {
        setTeamList(response.data);
        setImgTeam(response.data[0].url);
      });
    }
  }, [selectedUf]);

  const changeState = e => {
    setSelectedUf(e.target.value);
  }

  const changeTeam = e => {
    setImgTeam(e.target.value);
  }

  return(
    <>
      <div className='selects'>
        <div className="card">
          <label className='title'>Estados</label>
          <select 
            className='selects1'
            name="select"
            onChange={changeState}>
              {ufList.map((estado) => (
                <option key={estado.uf} value={estado.uf}>{estado.nome}</option>
              ))}
          </select>
        </div>

        <div className="card">
          <label className='title'>Times</label>
          <select 
            className='selects1'
            onChange={changeTeam}
            name="select">
              {teamList.map((team) => (
                team.estado === selectedUf &&
                <option key={team.sigla} value={team.url}>{team.time}</option>
              ))}
          </select>
        </div>
        <div className="card"> 
         {imgTeam && <img src={imgTeam}/>}
        </div>
      </div>
    </>
  )
}

export default Selects;