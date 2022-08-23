import react, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGlobalContext } from '../components/GlobalStore';
import axios from 'axios';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { folders, setFolders } = useGlobalContext();
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  function handleChange(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    if (search.length >= 1) {
      setFiltered(
        folders.filter((name) => {
          return name.toLowerCase().includes(search);
        })
      );
    } else {
      setFiltered([]);
    }
  }, [search]);

  return (
    <>
      <input
        type="email"
        className="form-control form-control-lg"
        placeholder="Search for a problem..."
        value={search}
        onChange={(e) => handleChange(e)}
        style={{ textAlign: 'center' }}
      />
      <div id="question-container">
        {filtered.map((folder, idx) => {
          return (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '50% repeat(3, 1fr)',
              }}
            >
              <Link href={`/questions/${folder}`}>
                <button type="button" className="btn btn-link">
                  {folder}
                </button>
              </Link>
              <div>
                <button className="btn btn-secondary">Java</button>
              </div>
              <div>
                <button className="btn btn-secondary">
                  JavaScript
                </button>
              </div>
              <div>
                <button className="btn btn-secondary">Python</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
