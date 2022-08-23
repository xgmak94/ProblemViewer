import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const fileTypes = ['java', 'js', 'py'];

export default function QuestionPage() {
  const router = useRouter();
  const { questionName } =
    router.query ||
    window.location.href.split('/')[4].replaceAll('%20', ' ');
  const [solutions, setSolutions] = useState({});
  const [display, setDisplay] = useState('');
  const [selected, setSelected] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios
      .get('/api/question', {
        params: { question: questionName },
      })
      .then((results) => {
        setSolutions(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   if(solutions && solutions.java) {
  //     let ret = solutions?.java?.split("/")[0];
  //     setDescription(ret);
  //   }
  // }, [solutions]);

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

  async function handleSubmit(e) {
    let info = {
      questionName: questionName,
      extension: selected,
      solution: display,
    };
    await axios.post('/api/question', info);
  }

  function handleReset(e) {
    setDisplay(solutions[selected]);
  }

  return (
    <>
      <div>{questionName}</div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          id="extension-container"
          style={{ display: 'flex', justifyContent: 'space-around' }}
        >
          {fileTypes.map((fileType) => {
            return (
              <button
                className={
                  fileType === selected
                    ? 'btn btn-primary btn-lg'
                    : 'btn btn-secondary btn-lg'
                }
                key={fileType}
                onClick={(e) => changeText(e, fileType)}
              >
                {fileType}
              </button>
            );
          })}
        </div>
        {/* <div className="form-group" id="description-container">
          <textarea
            className="form-control form-control-lg"
            rows="10"
            value={description}
          />
        </div> */}
        <div className="form-group">
          <textarea
            className="form-control form-control-lg"
            rows="15"
            resize="false"
            value={display}
            onChange={(e) => editText(e)}
          />
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'space-around' }}
        >
          <button
            className="btn btn-secondary"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Save
          </button>
          <button
            className="btn btn-secondary"
            type="submit"
            onClick={(e) => handleReset(e)}
          >
            Reset
          </button>
        </div>
        <input
          type="email"
          className="form-control form-control-lg"
          value={readme(questionName)
            }
          style={{ textAlign: 'center' }}
        />
          <input
          type="email"
          className="form-control form-control-lg"
          value={filePath(questionName, selected)}
          style={{ textAlign: 'center' }}
        />
      </div>
    </>
  );
}

function readme(questionName) {
  let ret = "";
  let num = questionName.split(" ")[0].slice(0, -1);
  ret += num + " | " + `[${questionName.split(".")[1].slice(1)}]`;

  let arr = questionName.toLowerCase().split(" ");
  arr = arr.slice(1);

  ret += "(http://leetcode.com/problems/" + arr.join("-") + ") |";

  return ret;
}

function filePath(questionName, ext) {
  let ret = "";
  ret += `[${ext}](./Leetcode/` + questionName.split(" ").join("%20") + `/Solution.${ext}`;

  return ret;
}