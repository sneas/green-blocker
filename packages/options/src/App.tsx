import logo from './assets/logo.png';
import './App.css';
import { ChangeEvent, useEffect, useState } from 'react';
import * as api from './api';

function App() {
  const [isUnblockAllWithClick, setIsUnblockAllWithClick] = useState<
    null | boolean
  >(null);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    await api.setUnblockAllWithSingleClick(checked).catch(() => null);
  };

  useEffect(() => {
    api.getIsUnblockAllWithSingleClick().then(setIsUnblockAllWithClick);
  }, []);

  if (isUnblockAllWithClick === null) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="text-center">
      <header>
        <div>
          <img src={logo} width={240} alt="Green Blocker Logo" />
        </div>
      </header>
      <div>
        <label>
          <input
            type="checkbox"
            defaultChecked={isUnblockAllWithClick}
            onChange={handleChange}
          />{' '}
          Unblock all sites with one click.
        </label>
      </div>
    </div>
  );
}

export default App;
