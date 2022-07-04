import Head from 'next/head'
import Web3 from "web3";
import { useState, useEffect } from 'react';

import { ADDRESS, ABI } from "../config.js"

export default function Home() {

  // FOR WALLET
  const [signedIn, setSignedIn] = useState(false)

  const [walletAddress, setWalletAddress] = useState(null)

  // FOR MINTING
  const [how_many_rgbpunks, set_how_many_rgbpunks] = useState(1)

  const [rgbpunksContract, setrgbpunksContract] = useState(null)

  // INFO FROM SMART Contract

  const [totalSupply, setTotalSupply] = useState(0)

  const [saleIsActive, setsaleIsActive] = useState(false)

  const [tokenPrice, settokenPrice] = useState(0)

  const [freeTokenPrice, setFreeTokenPrice] = useState(0)

  useEffect(async () => {

    // signIn()

  }, [])

  async function signIn() {
    if (typeof window.web3 !== 'undefined') {
      // Use existing gateway
      window.web3 = new Web3(window.ethereum);

    } else {
      alert("No Ethereum interface injected into browser. Read-only access");
    }

    window.ethereum.enable()
      .then(function (accounts) {
        window.web3.eth.net.getNetworkType()
          // checks if connected network is main(change this to rinkeby if you wanna test on testnet)
          .then((network) => { console.log(network); if (network != "main") { alert("You are on " + network + " network. Change network to mainnet or you won't be able to do anything here") } });
        let wallet = accounts[0]
        setWalletAddress(wallet)
        setSignedIn(true)
        callContractData(wallet)

      })
      .catch(function (error) {
        // Handle error. Likely the user rejected the login
        console.error(error)
      })
  }

  //

  async function signOut() {
    setSignedIn(false)
  }

  async function callContractData(wallet) {
    // let balance = await web3.eth.getBalance(wallet);
    // setWalletBalance(balance)
    const rgbpunksContract = new window.web3.eth.Contract(ABI, ADDRESS)
    setrgbpunksContract(rgbpunksContract)

    const salebool = await rgbpunksContract.methods.saleIsActive().call()
    // console.log("saleIsActive" , salebool)
    setsaleIsActive(salebool)

    const totalSupply = await rgbpunksContract.methods.totalSupply().call()
    setTotalSupply(totalSupply)

    const tokenPrice = await rgbpunksContract.methods.tokenPrice().call()
    settokenPrice(tokenPrice)

    const freeTokenPrice = await rgbpunksContract.methods.freeTokenPrice().call()
    setFreeTokenPrice(tokenPrice)

  }

  async function freeMintPunks(how_many_rgbpunks) {
    if (rgbpunksContract) {

      const price = Number(freeTokenPrice) * how_many_rgbpunks

      const gasAmount = await rgbpunksContract.methods.freeMint(how_many_rgbpunks).estimateGas({ from: walletAddress, value: price })
      console.log("estimated gas", gasAmount)

      console.log({ from: walletAddress, value: price })

      rgbpunksContract.methods
        .freeMint(how_many_rgbpunks)
        .send({ from: walletAddress, value: price, gas: String(gasAmount) })
        .on('transactionHash', function (hash) {
          console.log("transactionHash", hash)
        })

    } else {
      console.log("Wallet not connected")
    }

  }

  async function mintPunks(how_many_rgbpunks) {
    if (rgbpunksContract) {

      const price = Number(tokenPrice) * how_many_rgbpunks

      const gasAmount = await rgbpunksContract.methods.mintTokens(how_many_rgbpunks).estimateGas({ from: walletAddress, value: price })
      console.log("estimated gas", gasAmount)

      console.log({ from: walletAddress, value: price })

      rgbpunksContract.methods
        .mintTokens(how_many_rgbpunks)
        .send({ from: walletAddress, value: price, gas: String(gasAmount) })
        .on('transactionHash', function (hash) {
          console.log("transactionHash", hash)
        })

    } else {
      console.log("Wallet not connected")
    }

  };



  return (

    <html>
      <head>
        <title>v256 Phunks</title>

        <meta property="og:title" content="v256 Phunks" />
        <meta property="og:description" content="" key="ogdesc" />
        <meta property="og:type" content="website" key="ogtype" />
        <meta property="og:url" content="https://v256phunks.xyz/" key="ogurl" />
        <meta property="og:image" content="" key="ogimage" />
        <meta property="og:site_name" content="v256 Phunks" key="ogsitename" />

        <meta name="twitter:card" content="summary_large_image" key="twcard" />
        <meta property="twitter:domain" content="https://v256phunks.xyz" key="twdomain" />
        <meta property="twitter:url" content="https://v256phunks.xyz/" key="twurl" />
        <meta name="twitter:title" content="v256 Phunks" key="twtitle" />
        <meta name="twitter:description" content="" key="twdesc" />
        <meta name="twitter:image" content="" key="twimage" />
      </head>
      <body id="bodyy" className="flex flex-col flex-wrap items-center  min-h-screen ">

        <div id="header" className='w-full'>
          <div className="flex flex-wrap items-center justify-center  w-auto Kanit-Black">
            <a href="/" className="logo rgb text-center sm:text-center w-full sm:w-auto select-none">v256 PHUNKS</a>
            
          </div>
          <div className="flex flex-wrap items-center mt-5 justify-center   w-auto Kanit-Black">
            <nav className="flex flex-wrap flex-row space-x-10 ml-10 justify-around Kanit-Black">
              <a href="https://twitter.com/v256phunks " className="" target="_blank"><img src="images/twitter.png" width="35" alt="" className="transform hover:scale-110" /></a>
              {/* <a href="https://discord.gg/62BznErEx5" className="" target="_blank"><img src="images/discord.svg" width="35" alt="" className="transform hover:scale-110" /></a> */}
              <a href="#" className="" target="_blank"><img src="images/opensea.png" width="35" alt="" className="transform hover:scale-110" /></a>
              <a href="https://etherscan.io/address/0x63280c13c90fd24bf74fe116a70e79768bf64238#writeContract" className="" target="_blank"><img src="images/etherscan.png" width="35" alt="" className="transform hover:scale-110" /></a>
            </nav>
          </div>
        </div>

        <div className="w-full" id="about">
 {/* block 1 */}
          <div className="flex flex-row flex-wrap justify-center" id="block1" >
            <div className="flex flex-col lg:w-1/2 items-center  py-10 space-y-7  ">
            <img src="images/img2.gif"width="400" class="   drop-shadow-2xl "/>
            <div className='flex flex-col items-center justify-center  w-auto'>
            {!signedIn ? <button onClick={signIn} className="Kanit-Black inline-block  duration-200 bg-cust-yellow rounded-lg hover:bg-cust-yellow  no-underline py-2 px-2 mx-4">Connect Wallet with Metamask</button>
              :
              <button onClick={signOut} className="Kanit-Black inline-block transition duration-200 bg-cust-yellow rounded-lg hover:bg-cust-yellow no-underline py-2 px-2 mx-4 ">Connected: {walletAddress}</button>}
            </div>
            </div>


 

            <div className="flex w-full lg:w-1/2 py-10 mb-14 items-center">
              <div className="Kanit-Regular space-y-4 bg-blue-600 drop-shadow-lg">
              <ul class="list-disc text-2xl text-black p-2  Kanit-Regular leading-10">
                <li><span class="text-cust-yellow">6969</span> BIZARRE PHUNKS. EACH HAS TRAITS WITH UNIQUE COLOR FROM RGB RANGE</li>
                <li>FIRST <span class="text-cust-yellow">1420 ARE FREE</span> / 1 PER TX</li>
                <li>THEN <span class="text-cust-yellow">0.0069 ETH</span> EACH / MAX 25 PER TX</li>
                <li>WE USE GAS OPTIMIZED <span class="text-cust-yellow">ERC-721A</span> METHOD</li>
                <li><span class="text-cust-yellow">REVEAL</span> IS SHORTLY AFTER SALES START</li>
                
              </ul>
              </div>
            </div>


          </div>
        </div>
 {/* block 3         */}
        <div id="block2" className='w-full'>
          <div className='flex flex-col items-center justify-center  w-auto'>
 
            <span className="flex Kanit-Black text-4xl text-black">MINTED:&nbsp;<span className=" text-4xl"> {!signedIn ? <>-</> : <>{totalSupply}</>} / 6969</span></span>
            <div className="flex justify-around  mt-8 mx-6">
              <span className="flex Kanit-Black text-xl md:text-3xl text-black items-center bg-grey-lighter rounded rounded-r-none px-3 font-bold">Mint</span>

              <input type="number" min="1" max="25" value={how_many_rgbpunks} onChange={e => set_how_many_rgbpunks(e.target.value)} name=""
                className="Kanit-Black pl-4  inline bg-grey-lighter  py-2 font-normal rounded text-grey-darkest  font-bold" />

              <span className="flex Kanit-Black text-xl md:text-3xl text-black items-center bg-grey-lighter rounded rounded-r-none px-3 font-bold">v256 Phunk(s)</span>
            </div>
            <span className="flex Kanit-Black text-black items-center mt-5">max 25 per transaction</span>
          </div>
          <div className="flex flex-row justify-center space-x-10 mb-4">
            {saleIsActive ?
              <button onClick={() => freeMintPunks(how_many_rgbpunks)} className="mt-4 Kanit-Black text-3xl border-6 transition duration-200 bg-cust-yellow rounded-lg hover:bg-cust-yellow  text-black p-2 ">MINT {1} for FREE + gas</button>
              : <button className="mt-4 Kanit-Black text-xl border-6 text-black transition duration-200 bg-cust-yellow rounded-lg hover:bg-cust-yellow p-2 ">SALE IS NOT ACTIVE OR NO WALLET IS CONNECTED</button>

            }
            {saleIsActive ?
              <button onClick={() => mintPunks(how_many_rgbpunks)} className="mt-4 Kanit-Black text-3xl border-6 transition duration-200 bg-cust-yellow rounded-lg hover:bg-cust-yellow  text-black p-2 ">MINT {how_many_rgbpunks} for {(tokenPrice * how_many_rgbpunks) / (10 ** 18)} ETH + gas</button>
              : <button className="mt-4 Kanit-Black text-xl border-6 text-black transition duration-200 bg-cust-yellow rounded-lg hover:bg-cust-yellow p-2 ">SALE IS NOT ACTIVE OR NO WALLET IS CONNECTED</button>

            }

          </div>
          {/* <div className='flex flex-col items-center justify-center  w-auto'>
            {!signedIn ? <button onClick={signIn} className="Kanit-Black inline-block  duration-200 bg-cust-yellow rounded-lg hover:bg-cust-yellow  no-underline py-2 px-4 mx-4">Connect Wallet with Metamask</button>
              :
              <button onClick={signOut} className="Kanit-Black inline-block transition duration-200 bg-cust-yellow rounded-lg hover:bg-cust-yellow no-underline py-2 px-4 mx-4 ">Connected: {walletAddress}</button>}
            </div> */}
        </div>
      </body>
    </html>
  )
}