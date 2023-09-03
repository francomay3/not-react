import Button from "./Button";

const App = () => (
  <Button onClick={() => alert("Hello World")}>alert me!</Button>
);

const rootElement = document.getElementById("root");
rootElement.appendChild(<App />);

export default App;
