import "./App.css";
import { Form } from "./components/Form";
import { useCounterStore } from "./stores/counter";

function App() {
  const { count, increment } = useCounterStore();

  return (
    <>
      <h1>World's largest form</h1>
      <p>This form is being filled out by {count} people right now.</p>
      <div className="card">
        <button onClick={increment}>count is {count}</button>
      </div>
      <Form />
    </>
  );
}

export default App;
