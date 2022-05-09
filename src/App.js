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
  const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState([]);

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
    <div className="connected-container">
      
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendGif();
        }}
      >
        <input
          type="text"
          placeholder="Enter gif link!"
          value={inputValue}
         // onChange={onInputChange}
        />
        <button type="submit" className="cta-button submit-gif-button">
          Submit
        </button>
      </form>
      <div className="gif-grid">
        {TEST_GIFS.map(gif => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );

  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log('Gif link:', inputValue);
      setGifList([...gifList, inputValue]);
      setInputValue('');
    } else {
      console.log('Empty input. Try again.');
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

  useEffect(() => {
    if (walletAddress) {
      console.log('fetching GIF list....');

      setGifList(TEST_GIFS);
    }
  }, [walletAddress]);

  return (
    <div >
      <div className={walletAddress ? 'authed-container' : 'container'}>
      <header className='header'>
        <span className='text'>
          <h1 className='h1'>🖼 Gif portal</h1>
          <p className='p1'>View your GIF collection in the metaverse</p>
          </span>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        
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
