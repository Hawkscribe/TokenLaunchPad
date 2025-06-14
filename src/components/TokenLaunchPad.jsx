import { useState } from "react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { Connection } from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";const MINT_SIZE = 82; 
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
export function TokenLaunchpad() {
    const {connection}=useConnection();
    const [name,setName]=useState("");
    const [symbol,setSymbol]=useState("");
    const [imgUrl,setImgUrl]=useState("");
    const [initialSupply,setInitialSupply]=useState("");

    const wallet=useWallet();
async function  createToken(){

    // createMint();
const lamports=await getMinimumBalanceForRentExemptMint(Connection);
const keypair=Keypair.generate();

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: mintKeypair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_PROGRAM_ID,
            }),
            createInitializeMint2Instruction(mintKeypair.publicKey, 9, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID)
        );
        const recentBlockhash=await connection.getLatestBlockhash();
        transaction.recentBlockhash=recentBlockhash.blockhash;
        transaction.feePayer=wallet.publicKey;

        transaction.partialSign(keypair);
        wallet.sendTransaction(transaction);
}

    return  <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>
        <input className='inputText' type='text' placeholder='Name'onChange={(e)=>{
            setName(e.target.value);
        }}></input> <br />
        <input className='inputText' type='text' placeholder='Symbol'onChange={(e)=>{
            setSymbol(e.target.value);
        }}></input> <br />
        <input className='inputText' type='text' placeholder='Image URL'onChange={(e)=>{
            setImgUrl(e.target.value);
        }}></input> <br />
        <input className='inputText' type='text' placeholder='Initial Supply'onChange={(e)=>{
            setInitialSupply(e.target.value);
        }}></input> <br />
        <button onClick={createToken}className='btn'
         >Create a token</button>
    </div>
}