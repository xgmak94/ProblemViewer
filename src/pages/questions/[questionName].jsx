import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Search from '../../components/Search';
import Readme from '../../components/Readme';

const fileTypes = ['java', 'js', 'py'];

export default function QuestionPage() {
  const router = useRouter();
  const { questionName } =
    router.query || window.location.href.split('/')[4].replaceAll('%20', ' ');
  const [solutions, setSolutions] = useState({});
  const [display, setDisplay] = useState('');
  const [selected, setSelected] = useState('');
  const [description, setDescription] = useState('');
  const [fileType, setFileType] = useState('java');

  useEffect(() => {
    const getQuestionData = async () => {
      let results = await axios.get('/api/question', {
        params: { question: questionName },
      });
      setSolutions(results.data);
      setDisplay(results.data[fileType]);
    };

    getQuestionData();
  }, [questionName]);

  //   if(solutions && solutions.java) {
  //     let ret = solutions?.java?.split("/")[0];
  //     setDescription(ret);
  //   }
  // }, [solutions]);

  useEffect(() => {
    if (!solutions[fileType]) {
      setDisplay('');
      return;
    }
    setDisplay(solutions[fileType]);
  }, [fileType]);

  function changeText(e, type) {
    setSelected(fileType);
    setFileType(type);
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
    axios
      .post('/api/question', info)
      .then((results) => {
        alert('Posted');
      })
      .catch((err) => {
        alert('Error');
      });
  }

  function handleReset(e) {
    setDisplay(solutions[selected]).then((results) => {
      alertify.success('Reset');
    });
  }

  return (
    <>
      <Search />
      <div>{questionName}</div>
      <div className="m-3">
        <div className="m-3 d-flex justify-content-around" id="extension-container">
          {fileTypes.map((fileType) => {
            return (
              <button
                className={
                  fileType === selected ? 'btn btn-primary btn-lg' : 'btn btn-secondary btn-lg'
                }
                key={fileType}
                onClick={(e) => changeText(e, fileType)}
              >
                {fileType}
              </button>
            );
          })}
        </div>
        <div className="form-group m-3">
          <textarea
            className="form-control form-control-lg"
            rows="15"
            resize="false"
            value={display}
            onChange={(e) => editText(e)}
          />
        </div>
        <div className="mb-3 d-flex justify-content-around">
          <button className="btn btn-secondary" type="submit" onClick={(e) => handleSubmit(e)}>
            Save
          </button>
          <button className="btn btn-secondary" type="submit" onClick={(e) => handleReset(e)}>
            Reset
          </button>
        </div>
        <Readme questionName={questionName} selected={selected} />
      </div>
    </>
  );
}
