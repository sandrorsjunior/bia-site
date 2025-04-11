import React, { useEffect, useState, useRef } from "react";
import "./style.css";

export const Map = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const svgRef = useRef();

  useEffect(() => {
    const geoViewBox = svgRef.current?.getAttribute("data-mapsvg-geoviewbox");
    console.log("GeoViewBox:", geoViewBox);
  }, []);

  useEffect(() => {
    async function getShape() {
      try {
        const response = await fetch("./map_svg.json");
        if (!response.ok) {
          throw new Error("Failed to fetch map data");
        }
        const shape = await response.json();
        setData(shape);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getShape();
  }, []);

  // Set SVG size based on the window size
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="map">
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        height="100vh"
        viewBox="0 0 1068.000000 2047.000000"
        preserveAspectRatio="xMidYMid meet"
        ref={svgRef}
      >
        <g
          transform="translate(0.000000,2047.000000) scale(0.100000,-0.100000)"
          fill="#000000"
          stroke="none"
        >
          {data.map((p, index) => (
            <path 
                className={p.region}
                key={p.id} d={p.d} title={p.title} id={p.id} />
          ))}
        </g>
      </svg>
    </div>
  );
};
