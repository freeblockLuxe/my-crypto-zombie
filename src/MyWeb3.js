import Web3 from "web3";
import abi from './ZombieCore.json'
import ContractAddress from './ContractAddress'

const MyWeb3 ={
    init() {
        /*
        '1': Ethereum Main Network
        '2': Morden Test network
        '3': Ropsten Test Network
        '4': Rinkeby Test Network
        '5': Goerli Test Network
        '42': Kovan Test Network
        */
        return new Promise((resolve, reject) => {
            //let currentChainId = parseInt(window.ethereum.chainId, 16)
            let ethereum = window.ethereum
            ethereum.autoRefreshOnNetworkChange = false
            ethereum.enable().then(function (accounts) {
                let provider = window['ethereum'] || window.web3.currentProvider
                window.web3 = new Web3(provider)
                window.web3.eth.net.getId().then(function (result) {
                    let currentChainId = result
                    window.web3.currentProvider.setMaxListeners(300)
                    let currentContractAddress = ContractAddress[currentChainId]
                    if(currentContractAddress !== undefined){
                        window.MyContract = new window.web3.eth.Contract(abi.abi,currentContractAddress)
                        window.defaultAccount = accounts[0].toLowerCase()
                        //that.allEvents(window.MyContract)
                        resolve(true)
                    }else{
                        reject('Unknow Your ChainId:'+currentChainId)
                    }
                })
            }).catch(function (error) {
                console.log(error)
            })
        })
    },
    zombieCount() {
        return new Promise((resolve, reject) => {
            window.MyContract.methods.zombieCount().call().then(function(zombieCount) {
                resolve(zombieCount)
            })
        })
    },
    zombies(zombieId){
        return new Promise((resolve, reject) => {
            if(zombieId>=0){
                window.MyContract.methods.zombies(zombieId).call().then(function(zombies) {
                    resolve(zombies)
                })
            }
        })
    },
    zombieToOwner(zombieId){
        return new Promise((resolve, reject) => {
            if(zombieId>=0){
                window.MyContract.methods.zombieToOwner(zombieId).call().then(function(zombies) {
                    resolve(zombies.toLowerCase())
                })
            }
        })
    },
    getZombiesByOwner(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.getZombiesByOwner(window.defaultAccount).call().then(function(zombies) {
                resolve(zombies)
            })
        })
    },
    createZombie(_name){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.createZombie(_name).send({from:window.defaultAccount})
            .on('transactionHash', function(transactionHash){
                resolve(transactionHash)
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log({confirmationNumber:confirmationNumber,receipt:receipt})
            })
            .on('receipt', function(receipt){
                console.log({receipt:receipt})
                window.location.reload()
            })
            .on('error', function(error,receipt){
                console.log({error:error,receipt:receipt})
                reject({error:error,receipt:receipt})
            })
        })
    },
    buyZombie(_name){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.zombiePrice().call().then(function(zombiePrice) {
                window.MyContract.methods.buyZombie(_name).send({from:window.defaultAccount,value:zombiePrice})
                .on('transactionHash', function(transactionHash){
                    resolve(transactionHash)
                })
                .on('confirmation', function(confirmationNumber, receipt){
                    console.log({confirmationNumber:confirmationNumber,receipt:receipt})
                })
                .on('receipt', function(receipt){
                    console.log({receipt:receipt})
                    window.location.reload()
                })
                .on('error', function(error,receipt){
                    console.log({error:error,receipt:receipt})
                    reject({error:error,receipt:receipt})
                })
            })
        })
    },
    attack(_zombieId,_targetId){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.attack(_zombieId,_targetId).send({from:window.defaultAccount})
            .on('transactionHash', function(transactionHash){
                resolve(transactionHash)
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log({confirmationNumber:confirmationNumber,receipt:receipt})
            })
            .on('receipt', function(receipt){
                console.log({receipt:receipt})
                window.location.reload()
            })
            .on('error', function(error,receipt){
                console.log({error:error,receipt:receipt})
                reject({error:error,receipt:receipt})
            })
        })
    },
    changeName(_zombieId,_name){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.changeName(_zombieId,_name).send({from:window.defaultAccount})
            .on('transactionHash', function(transactionHash){
                resolve(transactionHash)
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log({confirmationNumber:confirmationNumber,receipt:receipt})
            })
            .on('receipt', function(receipt){
                console.log({receipt:receipt})
                window.location.reload()
            })
            .on('error', function(error,receipt){
                console.log({error:error,receipt:receipt})
                reject({error:error,receipt:receipt})
            })
        })
    },
    feed(_zombieId){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.feed(_zombieId).send({from:window.defaultAccount})
            .on('transactionHash', function(transactionHash){
                resolve(transactionHash)
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log({confirmationNumber:confirmationNumber,receipt:receipt})
            })
            .on('receipt', function(receipt){
                console.log({receipt:receipt})
                window.location.reload()
            })
            .on('error', function(error,receipt){
                console.log({error:error,receipt:receipt})
                reject({error:error,receipt:receipt})
            })
        })
    },
    levelUp(_zombieId){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.levelUpFee().call().then(function(levelUpFee) {
                window.MyContract.methods.levelUp(_zombieId).send({from:window.defaultAccount,value:levelUpFee})
                .on('transactionHash', function(transactionHash){
                    resolve(transactionHash)
                })
                .on('confirmation', function(confirmationNumber, receipt){
                    console.log({confirmationNumber:confirmationNumber,receipt:receipt})
                })
                .on('receipt', function(receipt){
                    console.log({receipt:receipt})
                    window.location.reload()
                })
                .on('error', function(error,receipt){
                    console.log({error:error,receipt:receipt})
                    reject({error:error,receipt:receipt})
                })
            })
        })
    },
    zombieFeedTimes(_zombieId){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.zombieFeedTimes(_zombieId).call().then(function(zombieFeedTimes) {
                resolve(zombieFeedTimes)
            })
        })
    },
    minPrice(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.minPrice().call().then(function(minPrice) {
                resolve(window.web3.utils.fromWei(minPrice,'ether'))
            })
        })
    },
    tax(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.tax().call().then(function(tax) {
                resolve(window.web3.utils.fromWei(tax,'ether'))
            })
        })
    },
    saleMyZombie(_zombieId,_price){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.saleMyZombie(_zombieId,window.web3.utils.toWei(_price.toString())).send({from:window.defaultAccount})
            .on('transactionHash', function(transactionHash){
                resolve(transactionHash)
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log({confirmationNumber:confirmationNumber,receipt:receipt})
            })
            .on('receipt', function(receipt){
                console.log({receipt:receipt})
                window.location.reload()
            })
            .on('error', function(error,receipt){
                console.log({error:error,receipt:receipt})
                reject({error:error,receipt:receipt})
            })
        })
    },
    zombieShop(_zombieId){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.zombieShop(_zombieId).call().then(function(shopInfo) {
                shopInfo.price = window.web3.utils.fromWei(shopInfo.price,'ether')
                resolve(shopInfo)
            })
        })
    },
    getShopZombies(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.getShopZombies().call().then(function(zombieIds) {
                resolve(zombieIds)
            })
        })
    },
    buyShopZombie(_zombieId,_price){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.buyShopZombie(_zombieId).send({from:window.defaultAccount,value:window.web3.utils.toWei(_price.toString())})
            .on('transactionHash', function(transactionHash){
                resolve(transactionHash)
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log({confirmationNumber:confirmationNumber,receipt:receipt})
            })
            .on('receipt', function(receipt){
                console.log({receipt:receipt})
                window.location.reload()
            })
            .on('error', function(error,receipt){
                console.log({error:error,receipt:receipt})
                reject({error:error,receipt:receipt})
            })
        })
    },

    owner(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.owner().call().then(function(owner) {
                resolve(owner.toLowerCase())
            })
        })
    },
    name(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.name().call().then(function(name) {
                resolve(name)
            })
        })
    },
    symbol(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.symbol().call().then(function(symbol) {
                resolve(symbol)
            })
        })
    },
    checkBalance(){
        return new Promise((resolve, reject) => {
            this.owner().then(function (owner) {
                if(window.defaultAccount === owner){
                    window.MyContract.methods.checkBalance().call({from:window.defaultAccount}).then(function(balance) {
                        resolve(window.web3.utils.fromWei(balance,'ether'))
                    })
                }else{
                    reject('You are not contract owner')
                }
            })
        })
    },
    setAttackVictoryProbability(_attackVictoryProbability){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.setAttackVictoryProbability(_attackVictoryProbability).send({from:window.defaultAccount})
            .then(function(result) {
                resolve(result)
            })
        })
    },
    levelUpFee(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.levelUpFee().call().then(function(levelUpFee) {
                resolve(window.web3.utils.fromWei(levelUpFee,'ether'))
            })
        })
    },
    setLevelUpFee(_fee){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.setLevelUpFee(window.web3.utils.toWei(_fee.toString())).send({from:window.defaultAccount})
            .then(function(result) {
                resolve(result)
            })
        })
    },
    setMinPrice(_value){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.setMinPrice(window.web3.utils.toWei(_value.toString())).send({from:window.defaultAccount})
            .then(function(result) {
                resolve(result)
            })
        })
    },
    zombiePrice(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.zombiePrice().call().then(function(zombiePrice) {
                resolve(window.web3.utils.fromWei(zombiePrice,'ether'))
            })
        })
    },
    setZombiePrice(_value){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.setZombiePrice(window.web3.utils.toWei(_value.toString())).send({from:window.defaultAccount})
            .then(function(result) {
                resolve(result)
            })
        })
    },
    setTax(_value){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.setTax(window.web3.utils.toWei(_value.toString())).send({from:window.defaultAccount})
            .then(function(result) {
                resolve(result)
            })
        })
    },
    withdraw(){
        return new Promise((resolve, reject) => {
            this.owner().then(function (owner) {
                if(window.defaultAccount === owner){
                    window.MyContract.methods.withdraw().send({from:window.defaultAccount}).then(function(res) {
                        resolve(res)
                    })
                }else{
                    reject('You are not contract owner')
                }
            })
        })
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    EventNewZombie(){
        return window.MyContract.events.NewZombie({},{fromBlock: 0, toBlock: 'latest'})
    },
    EventSaleZombie(){
        return new Promise((resolve, reject) => {
            window.MyContract.events.SaleZombie({fromBlock: 0, toBlock: 'latest'},function (error, event) {
                resolve(event)
            })
        })
    },

    allEvents(){
        window.MyContract.events.allEvents({fromBlock: 0}, function(error, event){
            console.log({allEvents:event})
        //}).on("connected", function(subscriptionId){
        //    console.log({connected_subscriptionId:subscriptionId})
        //}).on('data', function(event){
        //    console.log({event_data:event})
        }).on('changed', function(event){
            console.log({event_changed:event})
        }).on('error', function(error, receipt) { 
            console.log({event_error:error,receipt:receipt})
        })
    }
}
    
export default MyWeb3;