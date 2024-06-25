import s from "./App.module.scss";
import { Layout } from "./Layout/Layout";
function App() {
  return (
    <div className={s.app}>
      <Layout />
    </div>
  );
}

export default App;
