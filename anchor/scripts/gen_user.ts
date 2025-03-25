import { Keypair } from '@solana/web3.js'
import fs from 'fs'

const user = Keypair.generate()
const keypairData = JSON.stringify(Array.from(user.secretKey))

fs.writeFileSync('user.json', keypairData)

console.log('Keypair generated and saved as user.json')
console.log(`Public Key:`, user.publicKey.toBase58())
