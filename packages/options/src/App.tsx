import logo from './assets/logo.png';
import './App.css';
import { getIsUnblockAllWithSingleClick } from '@green-blocker/extension-messages';
import { useEffect, useState } from 'react';

function App() {
  const [isUnblockAllWithSingleClick, setIsUnblockAllWithSingleClick] =
    useState<null | boolean>(null);

  useEffect(() => {
    getIsUnblockAllWithSingleClick().then(setIsUnblockAllWithSingleClick);
  }, []);

  if (isUnblockAllWithSingleClick === null) {
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
          <input type="checkbox" checked={true} /> Unblock all sites with one
          click.
        </label>
      </div>
    </div>
  );
}

export default App;
