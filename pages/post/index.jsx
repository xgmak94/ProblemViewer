import React, { useState } from 'react';
import axios from 'axios';

let original = {
  questionName: '',
  extension: 'java',
  solution: '',
};
function PostPage() {
  const [info, setInfo] = useState(original);

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post('/api/question', info)
      .then((results) => {
        console.log(results);
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
      <form>
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">
            Solution
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="10"
            value={info.solution}
            onChange={(e) => changeInfo(e, 'solution')}
          />
        </div>
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
      </form>
    </>
  );
}

export default PostPage;
