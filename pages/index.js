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
		<link rel="icon" href="/favicon.ico" />

		<meta property="og:title" content="RGB Punks" key="ogtitle" />
		<meta property="og:description" content=" !!!!!!!!" key="ogdesc" />
		<meta property="og:type" content="website" key="ogtype" />
		<meta property="og:url" content="https://rgbpunks.io/" key="ogurl"/>
		<meta property="og:image" content="https://rgbpunks.io/images/Hola.gif" key="ogimage"/>
		<meta property="og:site_name" content="https://rgbpunks.io/" key="ogsitename" />

		<meta name="twitter:card" content="summary_large_image" key="twcard"/>
		<meta property="twitter:domain" content="https://rgbpunks.io" key="twdomain" />
		<meta property="twitter:url" content="https://rgbpunks.io/" key="twurl" />
		<meta name="twitter:title" content="RGB Punks" key="twtitle" />
		<meta name="twitter:description" content="!!!!!!" key="twdesc" />
		<meta name="twitter:image" content="https://rgbpunks.io/images/Hola.gif" key="twimage" />
	</head>
	<body id="bodyy" className="flex flex-col flex-wrap items-center justify-center min-h-screen ">
	
		<div id="header" className='w-full'>
			<div className="flex flex-wrap items-center justify-between w-auto Kanit-Black">
				<a href="/" className="logo text-center sm:text-left w-full sm:w-auto">RGB PUNKS</a>
				<nav className="flex flex-wrap flex-row justify-around Kanit-Black">
					<a href="#about"  className="text-4xl text-black transform hover:scale-110 m-6">Info</a>
					<a href="#traits" className="text-4xl text-black transform hover:scale-110 m-6">Traits</a>
					<a href="#gallery" className="text-4xl text-black transform hover:scale-110 m-6">Gallery</a>
					<a href="#faq" className="text-4xl text-black transform hover:scale-110 m-6">FAQ</a>

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
					<div className="AmikoRegular">
						<p className="text-3xl text-black my-6  AmikoRegular">WHAT IS THE IDEA OF THE PROJECT?</p>
						<p className="text-xl text-black   AmikoRegular">
						ABOUT RARITY
						Following the recent worldwide pandemic, emerging reports suggest that several banana species have begun exhibiting strange characteristics. Our research team located across the globe has commenced efforts to study and document these unusual phenomena.

						Concerned about parties trying to suppress our research, the team has opted to store our findings on the blockchain to prevent interference. Although this is a costly endeavour, our mission has never been cleare</p>
						<p className="text-2xl AmikoRegular">LAUNCH DATE: Sep 18th 8PM UTC </p>
						<p className="text-2xl AmikoRegular">TOTAL SUPPLY: 10k</p>
						<p className="text-2xl AmikoRegular">PRICE: 0.035 ETH</p>
					</div>
				</div>
				<div className="flex flex-col lg:w-1/2 items-center p-10">
					<span className="flex AmikoRegular text-3xl text-white items-center bg-grey-lighter rounded rounded-r-none my-4 ">MINTED:  <span className="text-blau text-4xl"> {!signedIn ?  <>-</>  :  <>{totalSupply}</> } / 10000</span></span>
					<div id="mint" className="flex justify-around  mt-8 mx-6">
						<span className="flex AmikoRegular text-3xl text-white items-center bg-grey-lighter rounded rounded-r-none px-3 font-bold">I want to mint</span>

						<input type="number" min="1" max="10" value={how_many_rgbpunks} onChange={ e => set_how_many_rgbpunks(e.target.value) } name=""
								  className="AmikoRegular pl-4 text-2xl  inline bg-grey-lighter  py-2 font-normal rounded text-grey-darkest  font-bold"/>
								  
						<span className="flex AmikoRegular text-3xl text-white items-center bg-grey-lighter rounded rounded-r-none px-3 font-bold">RGB Punks!</span>
					</div>
					{saleStarted ? 
					<button onClick={() => mintPunks(how_many_rgbpunks)} className="mt-4 AmikoRegular text-2xl border-6 bg-blau  text-white hover:text-black p-2 ">MINT {how_many_rgbpunks} RGB Punks for {(tokenPrice * how_many_rgbpunks) / (10 ** 18)} ETH + GAS</button>        
					: <button className="mt-4 AmikoRegular text-2xl border-6 bg-blau  text-white hover:text-black p-2 ">SALE IS NOT ACTIVE OR NO WALLET IS CONNECTED</button>        

					}
					<div className="flex  my-2 font-bold  justify-end  ">
						{!signedIn ? <button onClick={signIn} className="AmikoRegular inline-block border-2 border-black bg-white border-opacity-100 no-underline hover:text-black py-2 px-4 mx-4 shadow-lg hover:bg-blue-500 hover:text-gray-100">Connect Wallet with Metamask</button>
						:
						<button onClick={signOut} className="AmikoRegular inline-block border-2 border-black bg-white border-opacity-100 no-underline hover:text-black py-2 px-4 mx-4 shadow-lg hover:bg-blue-500 hover:text-gray-100">Wallet Connected: {walletAddress}</button>}
					</div>
				</div>
			</div>
			
			<div id="traits" className="flex flex-wrap justify-around items-center py-6">
				<div className=" p-4"><img src="images/traits.png" alt="" width="500px" className="feature-image"/></div>
				<div className="flex flex-col justify-between mx-6 sm:w-1/2 w-4/5 py-6 ">
					<h2 className="text-black Kanit-Black text-6xl text-center">ABOUT RARITY</h2>
					<p className="text-xl text-black my-6  AmikoRegular"> Following the recent worldwide pandemic, <span className="font-bold"> emerging reports </span>  suggest that several <span className="font-bold"> banana species </span> have begun exhibiting <span className="font-bold"> strange characteristics. </span> Our research team located across the globe has commenced efforts to <span className="font-bold"> study and document </span>  these unusual phenomena.</p>
					<p className="text-xl text-black my-6  AmikoRegular"> Concerned about parties trying to suppress our research, the team has opted to store our findings on the blockchain to prevent interference. Although this is a costly endeavour, our mission has never been clearer.</p>
					<p className="text-xl text-black my-6  AmikoRegular"> The fate of the world's bananas depends on it.</p>
					<p className="text-xl text-black my-6  AmikoRegular"> Your support in this time of need is greatly appreciated!</p>
				</div>
			</div>

			<div id="gallery" className=" py-6">
				<h2 className="text-blau Kanit-Black text-7xl text-center">GALLERY</h2>
				<div className="flex flex-wrap  items-center mx-6   py-6 ">
					<div className="md:w-1/2">
						<div className=" border-blue-300 p-2"><img src="images/gallery1.png" alt="" width="600px" className="feature-image"/></div>
					</div>
					<div className="md:w-1/2 flex flex-wrap">
						<div className=" p-2 w-1/2"><img src="images/gallery4.png" alt="" width="400px" className="feature-image"/></div>
						<div className=" p-2 w-1/2"><img src="images/gallery2.png" alt="" width="400px" className="feature-image"/></div>
						<div className=" p-2 w-1/2"><img src="images/gallery3.png" alt="" width="400px" className="feature-image"/></div>
						<div className=" p-2 w-1/2"><img src="images/gallery5.png" alt="" width="400px" className="feature-image"/></div>
					</div>
				</div>
			</div>
			<div>
				<div id="faq">             
           <section class="py-24">
              <div class="px-8 mx-auto max-w-7xl lg:px-16">
                  <h2 class="mb-4 text-xl font-bold md:text-3xl">Frequently Asked Questions</h2>
                  <div class="grid grid-cols-1 gap-0 text-gray-600 md:grid-cols-2 md:gap-16">
                      <div>
                          <h5 class="mt-10 mb-3 font-semibold text-gray-900">What is Tails</h5>
                          <p>Tails is a drag and drop page builder built on Top of TailwindCSS. You can drop components to create a page that you can export.</p>
                          <h5 class="mt-10 mb-3 font-semibold text-gray-900">Can I try it for Free?</h5>
                          <p>Absolutely, you can try out tails for free; however, if you wish to access all the components and export the page you'll need to upgrade your account.</p>
                          <h5 class="mt-10 mb-3 font-semibold text-gray-900">Where do I go to upgrade my account?</h5>
                          <p>
                              You can upgrade your account by visiting <a href="https://devdojo.com/pro" class="text-indigo-500 underline">The Pro Upgrade Page</a>. You will also gain access to many other applications and sections of the site.
                              <a href="https://help.hellonext.co/faq/startup-eligibility/" target="_blank">here</a>.
                          </p>
                          <h5 class="mt-10 mb-3 font-semibold text-gray-900">How long will I have access to Tails</h5>
                          <p>
                              You will have unlimited access to all your pre-built pages; however, if you want to be able to download and export your pages, you'll need a pro account.
                              <a href="https://paddle.com" target="_blank">Paddle</a> for processing payments.
                          </p>
                      </div>
                      <div>
                          <h5 class="mt-10 mb-3 font-semibold text-gray-900">How do I implement into my project</h5>
                          <p>Implementation in your project is very simple. You can use the exported page as a starting point, or you can copy and paste the HTML into your own page.</p>
                          <h5 class="mt-10 mb-3 font-semibold text-gray-900">What is the license on the pages?</h5>
                          <p>You have unlimited use to the templates used in Tails; however, you cannot re-use the templates to sell for others to use.</p>
                          <h5 class="mt-10 mb-3 font-semibold text-gray-900">Can I cancel my account if I not longer need it?</h5>
                          <p>Of course, you can feel free to cancel your account at anytime, and you can feel free to come back and upgrade again whenever you're ready.</p>
                          <h5 class="mt-10 mb-3 font-semibold text-gray-900">What if I need help with my project?</h5>
                          <p>If you need assistance implementing the templates into your project you can contact support or you can visit our <a href="https://devdojo.com/questions" class="text-indigo-500 underline">question section</a>.
                          </p>
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