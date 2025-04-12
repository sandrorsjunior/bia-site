import React, { useEffect, useState, useRef } from "react";
import "./style.css";

export const Info = ({regionCurrent}) => {

    const start_model = {
      region: "",
      title: "",
      artista: "",
      fragrancia: ".",
      ilustracao: "",
      cores: "",
      musica: "",
      tom: "",
      frase_final:""
    }
    const [data, setData] = useState([]);
    const [info, setInfo] = useState(start_model);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);;

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("./data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch map data");
        }
        const shape = await response.json();
        setData(shape);
        let infoElement = shape.filter((el)=>el.region==regionCurrent);
        setInfo(infoElement.length > 0? infoElement[0] : start_model);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    let infoElement = data.filter((el)=>el.region==regionCurrent);
    setInfo(infoElement.length > 0? infoElement[0] : start_model);
  }, [regionCurrent]);



  return (
    <div style={{
      maxWidth: '400px',
      margin: 'auto auto',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      borderLeft: '8px solid #D6BCFA',
      fontFamily: 'sans-serif'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#6B46C1'
      }}>{info.title}</h2>

      <p style={{ color: '#4A5568', fontSize: '14px', marginTop: '10px' }}>
        <strong>Artista:</strong> <span style={{ fontStyle: 'italic' }}>{info.artista}</span>
      </p>

      <p style={{ marginTop: '12px' }}>
        <strong>Fragrância:</strong> {info.fragrancia}
      </p>

      <p style={{ marginTop: '12px' }}>
        <strong>Ilustração:</strong> {info.ilustracao}
      </p>

      <p style={{ marginTop: '12px' }}>
        <strong>Cores:</strong> {info.cores}
      </p>

      <p style={{ marginTop: '12px' }}>
        <strong>Música:</strong> {info.musica}
      </p>

      <p style={{ marginTop: '12px' }}>
        <strong>Tom:</strong> {info.tom}
      </p>

      
    </div>
  );
};