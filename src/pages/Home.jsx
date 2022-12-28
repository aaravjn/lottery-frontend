import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { contractAddress, abi} from "../contract_provider"
import Navbar from '../components/Navbar'
import "../css/home.css"

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const lottery = new ethers.Contract(contractAddress, abi, signer)


function Home({username, address}) {

  const [buttonText, setButtonText] = useState("Connect")
  const [entranceFee, setEntranceFee] = useState("0")
  const [numberOfPlayers, setNumberOfPlayers] = useState("0")
  const [recentWinner, setRecentWinner] = useState("0")
  
  async function updateUIValues() {

    const entranceFeeFromCall = (await lottery.i_entranceFee()).toString()
    const numPlayersFromCall = (await lottery.getNumberOfParticipants()).toString()
    const recentWinnerFromCall = (await lottery.s_winner()).toString()
    setEntranceFee(entranceFeeFromCall)
    setNumberOfPlayers(numPlayersFromCall)
    setRecentWinner(recentWinnerFromCall)

  } 
  useEffect(() => {
    updateUIValues()
  })

  function ListenforTxMined(transactionResponse, provider, email){
    console.log(`Mining ${transactionResponse.hash}`)
    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReciept) => {
            console.log(
            `Transaction Confirmed with ${transactionReciept.confirmations} confirmations`
            )
            resolve()
        })
    })
  }

  async function connect() {
    if(window.ethereum){
      window.ethereum.request({method:'eth_requestAccounts'})
      setButtonText("Metamask Connected")
    }
    else{
      alert("Please install the metamask extension")
    }
  }

  async function enterLottery() {
    if((await signer.getAddress()) === address){
      const LotteryEntranceFee = await lottery.i_entranceFee();
      let transactionResponse = await lottery.enter_lottery({value: LotteryEntranceFee})
      await ListenforTxMined(transactionResponse, provider)
    }
    else {
      console.log("The metamask account you are using is not valid, please switch your account")
    }
  }
  return (
    <>
    <Navbar username={username}/>
    <div className="home-wrapper">
        <button className="connect btn btn-primary d-block" onClick={connect}>{buttonText}</button>
      
      <div className='info'>
        <div>Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH</div>
        <div>The current number of players is: {numberOfPlayers}</div>
        <div>The most previous winner was: {recentWinner}</div>
      </div>
      <button className="enter btn btn-primary d-block" onClick={enterLottery}>Enter Lottery</button>
    </div>
    </>
  )
}

export default Home;