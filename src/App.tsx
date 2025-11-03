import { RouterProvider } from "react-router-dom";
import { Provider } from "./components/Chakra/provider";
import { router } from "./routes";
import "./i18n";

function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
