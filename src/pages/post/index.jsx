import React, { useState } from 'react';
import axios from 'axios';
import Readme from '../../components/Readme';
import Search from '../../components/Search';

let original = {
  questionName: '',
  extension: 'java',
  solution: '',
};
function PostPage() {
  const [info, setInfo] = useState(original);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post('/api/question', info)
      .then((results) => {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changeInfo(e, field) {
    setInfo((prev) => {
      let obj = {
        ...prev,
      };
      obj[field] = e.target.value;
      return obj;
    });
  }

  function handleReset(e) {
    e.preventDefault();
    setInfo(original);
  }

  return (
    <>
      <Search />
      <form>
        <div className="form-group m-3">
          <label htmlFor="questionName">Question Name</label>
          <input
            type="email"
            className="form-control form-control-lg"
            id="questionName"
            placeholder="1. Two Sum"
            value={info.questionName}
            onChange={(e) => changeInfo(e, 'questionName')}
          />
        </div>
        <div className="form-group m-3">
          <label htmlFor="exampleFormControlSelect1">Extension</label>
          <select
            className="form-control form-control-lg"
            id="exampleFormControlSelect1"
            value={info.extension}
            onChange={(e) => changeInfo(e, 'extension')}
          >
            <option>java</option>
            <option>js</option>
            <option>py</option>
          </select>
        </div>
        <div className="form-group m-3">
          <label htmlFor="exampleFormControlTextarea1">Solution</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="10"
            value={info.solution}
            onChange={(e) => changeInfo(e, 'solution')}
          />
        </div>
        <div className="m-3">
          <button className="btn btn-secondary" type="submit" onClick={(e) => handleSubmit(e)}>
            Save
          </button>
          <button className="btn btn-secondary" type="submit" onClick={(e) => handleReset(e)}>
            Reset
          </button>
        </div>
      </form>
      {submitted && (
        <div class="alert alert-primary" role="alert">
          Successful post!
        </div>
      )}
      <Readme questionName={info.questionName} selected={info.extension} />
    </>
  );
}

export default PostPage;
