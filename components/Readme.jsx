import React from 'react';

export default function Readme({ questionName, selected }) {
  return (
    <div className="m-3">
      <input
        type="email"
        className="form-control form-control-lg mb-3 text-center"
        defaultValue={readme(questionName)}
      />
      <input
        type="email"
        className="form-control form-control-lg text-center"
        defaultVlue={filePath(questionName, selected)}
      />
    </div>
  );
}

function readme(questionName) {
  if(questionName === '') return '';

  let ret = "";
  let num = questionName.split(" ")[0].slice(0, -1);
  if(questionName.split(".").length > 1) {
    ret += num + " | " + `[${questionName.split(".")[1].slice(1)}]`;
  }

  let arr = questionName.toLowerCase().split(" ");
  arr = arr.slice(1);

  ret += "(http://leetcode.com/problems/" + arr.join("-") + ") |";

  return ret;
}

function filePath(questionName, ext) {
  let text = ext;
  if(text === 'java') {
    text = ext.slice(0, 1).toUpperCase() + ext.slice(1)
  }
  let ret = "";
  ret += `[${text}](./Leetcode/${questionName.split(" ").join("%20")}/Solution.${ext})`;

  return ret;
}
