import react, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGlobalContext } from '../components/GlobalStore';
import axios from 'axios';
import styles from '../../styles/Home.module.css';

export default function Home() {
  const { folders, setFolders } = useGlobalContext();
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [limit, setLimit] = useState(5);

  function handleChange(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    if (search.length >= 1) {
      setFiltered(
        folders.filter((name) => {
          return name.toLowerCase().includes(search.toLowerCase());
        })
      );
    } else {
      setFiltered([]);
    }
  }, [search]);

  return (
    <div
      id="search-container"
      style={{
        margin: '1rem',
        padding: '1rem',
        borderBottom: '1px solid',
      }}
    >
      <input
        type="email"
        className="form-control form-control-lg"
        placeholder="Search for a problem..."
        value={search}
        onChange={(e) => handleChange(e)}
        style={{ textAlign: 'center' }}
      />
      <div id="question-container">
        {filtered.slice(0, limit).map((folder, idx) => {
          return (
            <div
              key={idx}
              className="row m-1"
            >
              <Link href={`/questions/${folder}`}>
                <button type="button" className="btn btn-link col-sm">
                  {folder}
                </button>
              </Link>
              <div className="col-sm text-center d-flex justify-content-around">
                <button className="btn btn-secondary">Java</button>
                <button className="btn btn-secondary">JavaScript</button>
                <button className="btn btn-secondary">Python</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
