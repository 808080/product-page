import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <main>
      Root
      <Outlet />
    </main>
  );
};

export default App;
