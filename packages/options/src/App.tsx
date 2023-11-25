import logo from './assets/logo.png';
import './App.css';
import { getIsUnblockAllWithSingleClick, setIsUnblockAllWithSingleClick } from '@green-blocker/extension-messages';
import { ChangeEvent, useEffect, useState } from 'react';

function App() {
  const [isUnblockAllWithClick, setIsUnblockAllWithClick] =
    useState<null | boolean>(null);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    await setIsUnblockAllWithSingleClick(checked).catch(() => null);
  };

  useEffect(() => {
    getIsUnblockAllWithSingleClick().then(setIsUnblockAllWithClick);
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
          /> Unblock all sites with one
          click.
        </label>
      </div>
    </div>
  );
}

export default App;
