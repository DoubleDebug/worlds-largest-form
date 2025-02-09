import "./App.css";
import { Form } from "./components/Form";
import { queryClient } from "./utils/query-client";
import { QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>World's largest form</h1>
      <p>This form is being filled out by 1 people right now.</p>
      <Form />
    </QueryClientProvider>
  );
}

export default App;
