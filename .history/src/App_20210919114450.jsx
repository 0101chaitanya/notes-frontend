function App() {
  let countDownFrom = (num) => {
    console.log(num);
    if (num >= 1) {
      countDownFrom(num - 1);
    }
    return;
  };
  countDownFrom(10);

  return <div className="App"></div>;
}

export default App;
