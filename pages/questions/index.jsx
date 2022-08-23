import react, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGlobalContext } from '../../components/GlobalStore';
import axios from 'axios';

export default function QuestionMain() {
  const {folders, setFolders} = useGlobalContext();

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
