import { useState, useEffect } from 'react'
import { BigNumber, ethers } from "ethers"
import { contractAddress, abi} from "../contract_provider"
import Navbar from '../components/Navbar'
import "../css/home.css"
import Card from "../components/Card"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Home({username}) {

  const [entranceFee, setEntranceFee] = useState("0 ETH")
  const [numberOfPlayers, setNumberOfPlayers] = useState("0")
  const [recentWinner, setRecentWinner] = useState("0x")
  const [potentialPrize, setpotentialPrize] = useState("0 ETH")
  const [provider, setProvider] = useState("null")
  const [lottery, setLottery] = useState("null")
  const [accountBalance, setaccountBalance] = useState("0.0")
  

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

  

  async function updateUIValues() {
    if(lottery !== "null") {
      const entranceFeeFromCall = (await lottery.i_entranceFee())
      const numPlayersFromCall = (await lottery.getNumberOfParticipants()).toString()
      const recentWinnerFromCall = (await lottery.s_winner()).toString()
      const temp_signer = provider.getSigner()
      const temp_address = await temp_signer.getAddress()
      const balance = await provider.getBalance(temp_address)
      const balanceInEther = ethers.utils.formatEther(balance);

      let potentialPrizeMoney
      if(numPlayersFromCall == 0) {
        potentialPrizeMoney = entranceFeeFromCall
      }
      else {
        const one = BigNumber.from(1)
        const four = BigNumber.from(4)
        const five = BigNumber.from(5)
        const temp_bigPlayers = BigNumber.from(numPlayersFromCall)
        potentialPrizeMoney = entranceFeeFromCall.mul(temp_bigPlayers.add(one)).mul(four).div(five)
      }

      setaccountBalance(balanceInEther)
      setEntranceFee(ethers.utils.formatUnits(entranceFeeFromCall, "ether") + " ETH")
      setNumberOfPlayers(numPlayersFromCall)
      setRecentWinner(recentWinnerFromCall.slice(0, 7) + "....")
      setpotentialPrize(ethers.utils.formatUnits(potentialPrizeMoney, "ether") + " ETH")
      

    }
    else if(window.ethereum) {
      const temp_provider = new ethers.providers.Web3Provider(window.ethereum)
      const temp_signer = temp_provider.getSigner()
      const temp_lottery = new ethers.Contract(contractAddress, abi, temp_signer)

      setProvider(temp_provider)
      setLottery(temp_lottery)
    }
  }
  useEffect(() => {
    updateUIValues()
  })

  async function enterLottery() {
    if(window.ethereum && lottery !== "null" && parseFloat(accountBalance) >= 0.01) {
      const LotteryEntranceFee = await lottery.i_entranceFee();
      let transactionResponse = await lottery.enter_lottery({value: LotteryEntranceFee})
      await ListenforTxMined(transactionResponse, provider)
      console.log("YES2")
    }
    else if(parseFloat(accountBalance) < 0.01) {
      toast.error("You don't have enough ETH", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
    else {
      toast.error("Metamask wallet not detected", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
  }


  return (
    <>
    <Navbar username={username}/>
    <div className="home-wrapper">
        
      
      <div
        style={{
          display:"flex",
          justifyContent:"space-around",
          marginRight:"10%",
          marginLeft:"10%",
          marginTop:"5%"
        }}
      >
        <Card Title={"ENTRANCE FEE"} DataValue={entranceFee} ImageSrc={"/assets/ethereum.png"}/>
        <Card Title={"NUMBER OF PARTICIPANTS"} DataValue={numberOfPlayers} ImageSrc={"/assets/group.png"}/>
        <Card Title={"PREVIOUS WINNER"} DataValue={recentWinner} ImageSrc={"/assets/trophy.png"}/>
        <Card Title={"POTENTIAL PRIZE"} DataValue={potentialPrize} ImageSrc={"/assets/ethereum.png"}/>
      </div>
      <div
        style={{
          marginTop:"5%",
          textAlign:"center"
        }}
      >
      
        <small
          className='d-inline-flex px-2 py-1 fw-semibold text-primary bg-primary bg-opacity-10 border border-success border-opacity-10 rounded-2'
          style={{
            position:"relative",
            marginRight:"1em",
            top:"2px"
          }}
        >
          Account Balance: {accountBalance} ETH
        </small>
        <button className="btn btn-primary" onClick={enterLottery}>
          Enter Lottery
        </button>
        <ToastContainer />
      </div>
    </div>
    </>
  )
}

export default Home;