import { useState, useMemo } from "react";

function useInteractions() {
  // 查询所有书籍
  //保存书籍列表
  const [bookList, setBookList] = useState([]);
  function onGetBooksList(value) {
    setBookList(value);
  }
  const initialValues = useMemo(() => ({
    name: "",
    numbering: "",
    sort: "",
    synopsis: "",
  }));
  // 增加书籍
  const [inputData, setInputData] = useState(initialValues);

  function onBeforeAdd() {
    return inputData;
  }
  function onAfterAdd() {
    //清空输入框的值
    setInputData(initialValues);
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
    inputData,
    onGetBooksList,
    onBeforeAdd,
    onAfterAdd,
  };
}
export default useInteractions;
