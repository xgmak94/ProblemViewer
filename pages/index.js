import react, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/questions').then((results) => {
      setFolders(results.data);
    });
  }, []);

  return (
    <>
      {folders.map((folder, idx) => {
        return (
          <div key={idx}>
            <Link href={`/questions/${folder}`}>
              <button type="button" className="btn btn-link">{folder}</button>
            </Link>
          </div>
        );
      })}
    </>
  );
}
