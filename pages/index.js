import Head from 'next/head'
import Web3 from "web3";
import { useState, useEffect } from 'react';

import {ADDRESS, ABI} from "../config.js"

export default function Home() {

  // FOR WALLET
  const [signedIn, setSignedIn] = useState(false)

  const [walletAddress, setWalletAddress] = useState(null)

  // FOR MINTING
  const [how_many_rgbpunks, set_how_many_rgbpunks] = useState(1)

  const [rgbpunksContract, setrgbpunksContract] = useState(null)

  // INFO FROM SMART Contract

  const [totalSupply, setTotalSupply] = useState(0)

  const [saleStarted, setSaleStarted] = useState(false)

  const [tokenPrice, settokenPrice] = useState(0)

  useEffect( async() => { 

    signIn()

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
        // checks if connected network is mainnet (change this to rinkeby if you wanna test on testnet)
        .then((network) => {console.log(network);if(network != "rinkeby"){alert("You are on " + network+ " network. Change network to mainnet or you won't be able to do anything here")} });  
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
    // console.log("saleisActive" , salebool)
    setSaleStarted(salebool)

    const totalSupply = await rgbpunksContract.methods.totalSupply().call() 
    setTotalSupply(totalSupply)

    const tokenPrice = await rgbpunksContract.methods.tokenPrice().call() 
    settokenPrice(tokenPrice)
   
  }
  
  async function mintPunks(how_many_rgbpunks) {
    if (rgbpunksContract) {
 
      const price = Number(tokenPrice)  * how_many_rgbpunks 

      const gasAmount = await rgbpunksContract.methods.mintToken(how_many_rgbpunks).estimateGas({from: walletAddress, value: price})
      console.log("estimated gas",gasAmount)

      console.log({from: walletAddress, value: price})

      rgbpunksContract.methods
            .mintToken(how_many_rgbpunks)
            .send({from: walletAddress, value: price, gas: String(gasAmount)})
            .on('transactionHash', function(hash){
              console.log("transactionHash", hash)
            })
          
    } else {
        console.log("Wallet not connected")
    }
    
  };



	return (
		
<html>
	<head>
		<title>RGB Punks</title>
    
		<meta property="og:title" content="RGB Punks" key="ogtitle" />
		<meta property="og:description" content="Most colorful punks for your PFP" key="ogdesc" />
		<meta property="og:type" content="website" key="ogtype" />
		<meta property="og:url" content="https://rgbpunks.io/" key="ogurl"/>
		<meta property="og:image" content="https://rgbpunks.io/images/600x400.jpg" key="ogimage"/>
		<meta property="og:site_name" content="rgbpunks.io/" key="ogsitename" />
		<meta name="twitter:card" content="summary_large_image" key="twcard"/>
		<meta property="twitter:domain" content="https://rgbpunks.io" key="twdomain" />
		<meta property="twitter:url" content="https://rgbpunks.io/" key="twurl" />
		<meta name="twitter:title" content="RGB Punks" key="twtitle" />
		<meta name="twitter:description" content="Most colorful punks for your PFP" key="twdesc" />
		<meta name="twitter:image" content="https://rgbpunks.io/images/600x400.jpg" key="twimage" />
	</head>
	<body id="bodyy" className="flex flex-col flex-wrap items-center justify-center min-h-screen ">
	
		<div id="header" className='w-full'>
			<div className="flex flex-wrap items-center justify-between w-auto Kanit-Black">
				<a href="/" className="logo rgb text-center sm:text-left w-full sm:w-auto select-none">RGB PUNKS</a>
				<nav className="flex flex-wrap flex-row justify-around Kanit-Black">
					<a href="#about"  className="text-4xl text-black hover:text-yellow-500 m-6 select-none">Info</a>
					<a href="#traits" className="text-4xl text-black hover:text-yellow-500 m-6 select-none">Features</a>
					<a href="#gallery" className="text-4xl text-black hover:text-yellow-500 m-6 select-none">Gallery</a>
					<a href="#faq" className="text-4xl text-black hover:text-yellow-500 m-6 select-none">FAQ</a>

					<a href="https://twitter.com/rgbpunks " className="m-6" target="_blank"><img src="images/twitter.png" width="35" alt="" className="transform hover:scale-110" /></a>
					<a href="https://discord.gg/62BznErEx5" className="m-6" target="_blank"><img src="images/discord.svg" width="35" alt="" className="transform hover:scale-110" /></a>
					<a href="/" className="m-6" target="_blank"><img src="images/opensea.png" width="35" alt="" className="transform hover:scale-110" /></a>
					<a href="/" className="m-6" target="_blank"><img src="images/etherscan.png" width="35" alt="" className="transform hover:scale-110" /></a>
				</nav>
			</div>
		</div>

		<div className="w-full" id="about">
			<div className="flex flex-row flex-wrap" id="block1" >
				<div className="flex w-full lg:w-1/2 p-10 items-center">
					<div className="AmikoRegular space-y-4">
						<p className="text-3xl text-black my-6  AmikoBold">WHAT IS THIS COLLECTION ABOUT?</p>
						<p className="text-2xl text-black   AmikoRegular">About color and about punks, of course. RGB punks is a collection of 10,000 colored punks. 
            Each has a unique color combination of the elements. They look unusual, funny and cool. RGB punks are a great way to express yourself in the NFT space.</p>
            <p className="text-xl text-black   AmikoRegular">More info in our server:</p>
						<a href="https://discord.gg/62BznErEx5" target="_blank" class="inline-block px-5 py-3 text-xl Kanit-Black  text-center text-black transition duration-200 bg-yellow-500 rounded-lg hover:bg-yellow-600 ">Join Discord</a>
            <p className="text-2xl AmikoBold">Launch date: Sep 25th 8PM UTC(но это не точно) </p>
						<p className="text-2xl AmikoBold">Price: 0.03 ETH + gas</p>
            <p className="text-2xl AmikoBold">Total supply: 10k</p>
            
					</div>
				</div>
				<div className="flex flex-col lg:w-1/2 items-center p-10 space-y-7  md:shadow-2xl">
            <span className="flex Kanit-Black text-4xl text-black items-center   my-4 mt-20">MINTED:&nbsp;<span className=" text-4xl"> {!signedIn ?  <>-</>  :  <>{totalSupply}</> } / 10000</span></span>
            <div className="flex justify-around  mt-8 mx-6">
              <span className="flex Kanit-Black text-xl md:text-3xl text-black items-center bg-grey-lighter rounded rounded-r-none px-3 font-bold">I want to mint</span>

              <input type="number" min="1" max="20" value={how_many_rgbpunks} onChange={ e => set_how_many_rgbpunks(e.target.value) } name=""
                    className="Kanit-Black pl-4 text-xl md:text-2xl inline bg-grey-lighter  py-2 font-normal rounded text-grey-darkest  font-bold"/>
                    
              <span className="flex Kanit-Black text-xl md:text-3xl text-black items-center bg-grey-lighter rounded rounded-r-none px-3 font-bold">RGB Punk(s)!</span>
            </div>
            <span className="flex Kanit-Black text-black items-center -mt-16">max 20 per transaction</span>
            
            {saleStarted ? 
            <button onClick={() => mintPunks(how_many_rgbpunks)} className="mt-4 Kanit-Black text-3xl border-6 transition duration-200 bg-yellow-500 rounded-lg hover:bg-yellow-600  text-black p-2 ">MINT {how_many_rgbpunks} RGB Punk(s) for {(tokenPrice * how_many_rgbpunks) / (10 ** 18)} ETH + gas</button>        
            : <button className="mt-4 Kanit-Black text-xl border-6 text-black transition duration-200 bg-yellow-500 rounded-lg hover:bg-yellow-600 p-2 ">SALE IS NOT ACTIVE OR NO WALLET IS CONNECTED</button>        

            }
            <div className="flex  my-2 font-bold  justify-end  ">
              {!signedIn ? <button onClick={signIn} className="Kanit-Black inline-block  duration-200 bg-yellow-500 rounded-lg hover:bg-yellow-600  no-underline py-2 px-4 mx-4">Connect Wallet with Metamask</button>
              :
              <button onClick={signOut} className="Kanit-Black inline-block transition duration-200 bg-yellow-500 rounded-lg hover:bg-yellow-600 no-underline py-2 px-4 mx-4 ">Connected: {walletAddress}</button>}
            </div>
				</div>
			</div>
			<section id="traits" class="w-full bg-white pt-7 pb-7 md:pt-20 md:pb-24">
        <div class="box-border flex flex-col items-center content-center mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl">

        
          <div class="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
              <img src="images/traits2.png" class="p-2 pl-6 pr-5  drop-shadow-2xl"/>
          </div>

        
        <div class="box-border order-first w-full text-black border-solid md:w-1/2 p-10 md:order-none">
            <h2 class="m-0 text-2xl text-black AmikoRegular font-semibold leading-tight lg:text-3xl md:text-2xl">
            Unique colors / low rarity grade
            </h2>
            <p class="pt-4 pb-8 m-0 leading-7 text-xl text-left text-black AmikoRegular border-0 border-gray-300 sm:pr-12  ">
            Each RGB Punk has a unique algorithmically generated set of colors. 
            Each is beautiful in its own way. 
            This collection does not have the usual rarity grading. 
            There are no traits that strongly distinguish some punks from the rest. 
            The community will decide which punks are worth more.
            </p>
            
        </div>
        
    </div>
    <div class="box-border flex flex-col items-center content-center  mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl">

        
        <div class="box-border w-full text-black border-solid md:w-1/2 p-10 xl:pl-32">
            <h2 class="m-0 text-2xl text-black AmikoRegular font-semibold leading-tight lg:text-3xl md:text-2xl">
                Cool PFP
            </h2>
            <p class="pt-4 pb-8 m-0 leading-7 text-xl text-black AmikoRegular  border-0 border-gray-300  ">
            At first, the idea of multicolored punks may seem simple. 
            But color plays an important role in personality psychology. 
            Color is a powerful tool for self-expression. That's why RGB Punks are cool. They attract attention.
            </p>
            
        </div>
        
        <div class="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2">
            <img src="images/snoop.png" class="pl-4 sm:pr-10 drop-shadow-2xl "/>
        </div>
    </div>
  </section>
      <section id="gallery" class="">
        <div class="container max-w-6xl mx-auto pb-8">
        <h2 className=" text-3xl text-black AmikoBold text-center font-bold md:text-4xl pt-10">GALLERY</h2>
        <div class="grid grid-cols-4 gap-8 mt-10 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0">

            <div class="relative flex flex-col items-center justify-between col-span-4  overflow-hidden  ">
                <img src="images/gallery8.png" alt=""  className="feature-image"/>
            </div>

            <div class="relative flex flex-col items-center justify-between col-span-4  overflow-hidden ">
                <img src="images/gallery7.png" alt=""  className="feature-image"/>
            </div>

            <div class="relative flex flex-col items-center justify-between col-span-4  overflow-hidden ">
                <img src="images/gallery6.png" alt=""  className="feature-image"/>
            </div>

            <div class="relative flex flex-col items-center justify-between col-span-4  overflow-hidden ">
                <img src="images/gallery3.png" alt=""  className="feature-image"/>
            </div>

            <div class="relative flex flex-col items-center justify-between col-span-4  overflow-hidden ">
                <img src="images/gallery5.png" alt=""  className="feature-image"/>
            </div>

            <div class="relative flex flex-col items-center justify-between col-span-4  overflow-hidden ">
                <img src="images/gallery4.png" alt=""  className="feature-image"/>
            </div>

        </div>
       </div>
    </section>
			<div>
				<div id="faq">             
           <section class="py-24">
              <div class="px-8 mx-auto max-w-7xl lg:px-16">
                  <h2 class="mb-4 text-2xl text-black AmikoBold text-center font-bold md:text-3xl">Frequently Asked Questions</h2>
                  <div class="grid grid-cols-1 gap-0 text-black text-lg AmikoRegular md:grid-cols-2 md:gap-16">
                      <div>
                          <h5 class="mt-10 mb-3 font-semibold text-black">What are RGB Punks?</h5>
                          <p>A collection of 10k punks with unique color combinations.</p>
                          <h5 class="mt-10 mb-3 font-semibold text-black">What is the idea?</h5>
                          <p>From a psychological point of view, color is a powerful tool for self-expression. So, the idea is simple: it is a PFPs to express yourself through color in NFT space.</p>
                          <h5 class="mt-10 mb-3 font-semibold text-black">Are RGB Punks minting on their own smart contract?</h5>
                          <p>Yes. A  <a href="/" target="_blank" class="text-indigo-500 underline">link</a> to the contract will be published on launch day.</p>
                          <h5 class="mt-10 mb-3 font-semibold text-black">How many RGB Punks are available?</h5>
                          <p>10k. The first 50 will be reserved by the creator for the giveaways and other.</p>
                      </div>
                      <div>
                          <h5 class="mt-10 mb-3 font-semibold text-black">What will the minting price be for RGB Punks?</h5>
                          <p>0.03 eth + gas</p>
                          <h5 class="mt-10 mb-3 font-semibold text-black">What is the mint limit at a time?</h5>
                          <p>20 per transaction</p>
                          <h5 class="mt-10 mb-3 font-semibold text-black">What kind of NFTs are RGB Punks?</h5>
                          <p>ERC-721 hosted on IPFS</p>
                          <h5 class="mt-10 mb-3 font-semibold text-black">When will the RGB Punks be revealed?</h5>
                          <p>Almost immediately. Any delays are related to the processing time by OpenSea.</p>
                      </div>
                  </div>
              </div>
           </section>
				</div>
			</div>
			<div id="contact" className="flex flex-wrap justify-around items-center">
				<h2 className="text-black AmikoRegular  text-center">© Copyright 2021 RGB Punks</h2>
				<div className="flex flex-wrap flex-row justify-around ">
					<a href="https://twitter.com/rgbpunks " className="m-8" target="_blank"><img src="images/twitter.png" width="35" alt="Official Twitter Page" className="transform hover:scale-110" /></a>
					<a href="https://discord.gg/62BznErEx5" className="m-8" target="_blank"><img src="images/discord.svg" width="35" alt="" className="transform hover:scale-110" /></a>
					<a href="/" className="m-8" target="_blank"><img src="images/opensea.png" width="35" alt="" className="transform hover:scale-110" /></a>
					<a href="/" className="m-8" target="_blank"><img src="images/etherscan.png" width="35" alt="" className="transform hover:scale-110" /></a>
				</div>
			</div>
		</div>
	</body>
</html>
    )
}