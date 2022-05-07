import { useEffect , useState } from 'react';
import './App.css';
import Twitter from '../src/assets/Twitter.svg';



//constants
const TEST_GIFS = [
  'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
	'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
	'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
	'https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp'
]


const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = 'https:/twitter.com/${TWITTER_HANDLE}';



const App = () => {


  const [ walletAddress, setWalletAddress ] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('phantom wallet found!');
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log('Connected with Public key:',
            response.publickey.toString()
          );
        }
      } else {
        alert('Solana object not found! Get a phantom wallet 👻')
      }
    } catch (error) {
      console.error((error));
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('connected with public key:', response.publickey.toString());
      setWalletAddress(response.publickey.toString());
    }
   };


  const renderNotConnectedContainer = () => (
    <button
      className="button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button >
  );



  const renderConnectedContainer = () => (
    <div className='connectedContainer'>
      <div className='gifGrid'>
        {TEST_GIFS.map(gif => (
          <div className='gifItem' key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );
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
      <div className={walletAddress ? 'authed-container' : 'container'}>
      <header className='header'>
        <span className='text'>
          <h1 className='h1'>🖼 Gif portal</h1>
          <p className='p1'>View your GIF collection in the metaverse</p>
          {!walletAddress && renderNotConnectedContainer()}
        </span>
        <div className="footer-container">
        <img alt="Twitter Logo" className="twitter-logo" src={Twitter} />
        <a
          className="footer-text"
          href={TWITTER_LINK}
          target="_blank"
          rel="noreferrer"
        >{`built on @${TWITTER_HANDLE}`}</a>
      </div>
      </header>
      
     
    </div>
    </div>
  );
}

export default App;
