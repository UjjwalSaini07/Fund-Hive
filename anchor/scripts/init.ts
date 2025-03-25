import 'dotenv/config'
import * as anchor from '@coral-xyz/anchor'
import { Fundus } from '../target/types/fundus'
import idl from '../target/idl/fundus.json'
import fs from 'fs'
import { getClusterURL } from '@/utils/helper'
const { SystemProgram, PublicKey } = anchor.web3

const main = async (cluster: string) => {
  // Creates a connection to the cluster
  const connection = new anchor.web3.Connection(
    getClusterURL(cluster),
    'confirmed'
  )

  // Load the wallet from the deployer's keypair file
  const keypairPath = `${process.env.HOME}/.config/solana/id.json`
  const keypairData = JSON.parse(fs.readFileSync(keypairPath, 'utf-8'))
  const wallet = anchor.web3.Keypair.fromSecretKey(Uint8Array.from(keypairData))

  // Create a provider
  const provider = new anchor.AnchorProvider(
    connection,
    new anchor.Wallet(wallet),
    {
      commitment: 'confirmed',
    }
  )

  anchor.setProvider(provider)

  // Load the program
  const program = new anchor.Program<Fundus>(idl as any, provider)
  const [programStatePda] = PublicKey.findProgramAddressSync(
    [Buffer.from('program_state')],
    program.programId
  )

  try {
    const state = await program.account.programState.fetch(programStatePda)
    console.log(`Program already initialized, status: ${state.initialized}`)
  } catch (error) {
    const tx = await program.methods
      .initialize()
      .accountsPartial({
        programState: programStatePda,
        deployer: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc()

    await connection.confirmTransaction(tx, 'finalized')
    console.log('Program initialized successfully.', tx)
  }
}

const cluster: string = process.env.NEXT_PUBLIC_CLUSTER || 'localhost'
main(cluster).catch((error) => console.log(error))

