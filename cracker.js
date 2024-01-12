const wl = require('./WLEN');
const { Wallet, providers } = require('ethers');
const mysql = require('mysql');

/*
let pool = mysql.createPool({
    connectionLimit : 10,
    host     : '192.168.0.166',
    user     : 'dev0',
    password : '1I#aKW@E4Xk!Mh',
    database : 'dacc_evm_cracker'
});
*/
const ESKey = "E5CSKCC5SWWP3DAZDXK26ZNKMGSDE3HZX6"; 
const mnemonicCnt = 12;
const wlLength = wl.en.length;
const logBase = 1000;
let tryCnt = 0;

let mnemonicNbr = [];
let mnemonicArr = [];
let mnemonic = "";

const logWallet = (wallet, ethBal) => {
    console.log(`Logging wallet`); 
    setTimeout(() => { genMnemonic(); }, 1000);
    /*
    pool.query(
        `insert into wallet (address, privateKey, publicKey, mnemonic, ethBal, createdAt) 
        values ('${wallet.address}', '${wallet.privateKey}', '${wallet.publicKey}'
        , '${wallet.mnemonic.phrase}', ${ethBal}, now());`, function (error, results, fields) {
        if (error)  { 
            console.log(`Error`);  
        } else { 
            console.log(`Logged`);
        }
    });
    setTimeout(() => { genMnemonic(); }, 1000);
    */
}

const checkBalance = async (wallet) => {
    const provider = new providers.EtherscanProvider(null, ESKey);
    const balance = await provider.getBalance(wallet.address);
    console.log(`Balance: ${balance} ETH`);
    // 
    // logWallet(wallet, balance);
}

const recoverWallet = () => {
    try {
        const wallet = Wallet.fromMnemonic(mnemonic); 
        console.log(`Good: ${wallet.mnemonic.phrase}`);
        // console.log(`Address: ${wallet.address}`);
        // console.log(`Private Key: ${wallet.privateKey}`);
        // console.log(`Public Key: ${wallet.publicKey}`);
        // console.log(wallet);
        console.log(wallet)
        console.log(wallet.privateKey)
        // checkBalance(wallet); 
    } catch (e) {
        // console.log(e.message);
        setTimeout(() => { genMnemonic(); }, 1000 * 10);
        /*
        tryCnt++;
        if (tryCnt % logBase == 0) {
            console.log(`${tryCnt} tried.`);
        }
        */
    }
}

const genMnemonic = () => {
    mnemonicNbr = [];
    mnemonicArr = [];
    genMnemonicNbr();
    mnemonic = "";
    // tryCnt = 0;
    // 
    mnemonic = mnemonicArr.join(' ');
    // mnemonic = "script model shed frost favorite tip uncover scatter obscure hello diagram noodle";
    //
    recoverWallet();
}

const randomSeed = () => {
    return Math.floor(Math.random() * (wlLength - 1) + 0); 
}

const genMnemonicNbr = () => {
    while (mnemonicNbr.length < mnemonicCnt) {
        let _i = randomSeed(); 
        if (mnemonicNbr.length == 0) {
            mnemonicNbr.push(_i);
            mnemonicArr.push(wl.en[_i]);
        } else {
            if (!mnemonicNbr.includes(_i)) {
                mnemonicNbr.push(_i);
                mnemonicArr.push(wl.en[_i]);
            } else {
                genMnemonicNbr();
            }
        }
    }
}

genMnemonic();
console.log(`Go!!`);