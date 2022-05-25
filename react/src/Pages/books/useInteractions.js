import { useState } from "react";

function useInteractions() {
  // 查询所有书籍
  //保存书籍列表
  const [bookList, setBookList] = useState([]);
  function onGetBooksList(value) {
    setBookList(value);
  }
  // 增加书籍
  const [inputData, setInputData] = useState({
    name: "",
    numbering: "",
    sort: "",
    synopsis: "",
  });
  function onGetInputData(value) {
    setInputData(value);
  }

  //获取输入框的值
  function getinput(e, name) {
    setInputData((i) => {
      let val = e.target.value;
      if (name === "numbering") {
        val = Number(e.target.value);
      }
      return { ...i, [name]: val };
    });
  }

  return {
    getinput,
    bookList,
    onGetBooksList,
    inputData,
    onGetInputData,
  };
}
export default useInteractions;
