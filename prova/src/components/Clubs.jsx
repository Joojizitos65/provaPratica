import React, { useEffect, useState } from 'react';

export default function Clubs() {
  const [clubs, setClubs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchClubs = () => {
      setLoading(true)
      fetch('https://api.cartola.globo.com/clubes')
        .then(response => response.json())
        .then(data => {
          console.log('API Response:', data)
          setClubs(Object.values(data) || [])
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching clubs:', error)
          setError(error)
          setLoading(false)
        });
    };

    fetchClubs();
  }, []);

  return (
    <main>
      {loading && <p>Carregando...</p>}
      {error && <p>Error: {error.message}</p>}
      {clubs.map(club => (
        <div key={club.id} className="times">
          <img src={club.escudos['60x60']} alt={club.nome} className='timeescudo' />
          <div className='nomeapelido'>
          <h2 className='timenome'>{club.nome}</h2>
          <p className='timesapleido'>{club.apelido}</p>
            </div>
          
        </div>
      ))}
    </main>
  );
}