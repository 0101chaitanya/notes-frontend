function App() {
  let countDownFrom = (num) => {
    console.log(num);
    countDownFrom(num - 1);
  };
  countDownFrom(10);

  return <div className="App"></div>;
}

export default App;
