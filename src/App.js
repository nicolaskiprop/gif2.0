import { useEffect } from 'react';
import './App.css';

const App = () => {

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('phantom wallet found!');
        }
      } else {
        alert('Solana object not found! Get a phantom wallet 👻')
      }
    } catch (error) {
      console.error((error));
    }
  };

/*
   * When our component first mounts, let's check to see if we have a connected
   * Phantom Wallet
   */

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);

  }, []);

  return (
    <div >
      <header className='header'>
        <span className='text'>
          <h1 className='h1'>Gif portal</h1>
          <p className='p1'>View your GIF collection in the metaverse</p>
        </span>
       
      </header>
    </div>
  );
}

export default App;
