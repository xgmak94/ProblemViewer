import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function QuestionPage() {
  const router = useRouter();
  const { questionName } =
    router.query ||
    window.location.href.split('/')[4].replaceAll('%20', ' ');
  const [solutions, setSolutions] = useState({});
  const [display, setDisplay] = useState('');
  const [selected, setSelected] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/question', {
        params: { question: questionName },
      })
      .then((results) => {
        setSolutions(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function changeText(e, fileType) {
    setSelected(fileType);
    if (!solutions[fileType]) {
      setDisplay('');
    } else {
      setDisplay(solutions[fileType]);
    }
  }

  function editText(e) {
    setDisplay(e.target.value);
  }

  return (
    <>
      <div>{questionName}</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}
      >
        {fileTypes.map((fileType) => {
          return (
            <button
              className={fileType === selected ? "btn btn-primary" : "btn btn-secondary"}
              key={fileType}
              onClick={(e) => changeText(e, fileType)}
            >
              {fileType}
            </button>
          );
        })}
        <div className="form-group" style={{ gridColumn: '1/4' }}>
          <textarea
            className="form-control form-control-lg"
            id="exampleFormControlTextarea1"
            rows="20" // hardcoded this is the size of my browser...
            resize="false"
            value={display}
            onChange={(e) => editText(e)}
          ></textarea>
        </div>
      </div>
    </>
  );
}

let fileTypes = ['java', 'js', 'py'];
