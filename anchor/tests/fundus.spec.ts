import * as anchor from '@coral-xyz/anchor'
import { Fundus } from '../target/types/fundus'
import idl from '../target/idl/fundus.json'
import fs from 'fs'
const { SystemProgram, PublicKey } = anchor.web3

const toggleProvider = (user: 'deployer' | 'creator') => {
  let wallet: any
  if (user === 'creator') {
    const keypairData = JSON.parse(fs.readFileSync('user.json', 'utf-8'))
    wallet = anchor.web3.Keypair.fromSecretKey(Uint8Array.from(keypairData))
  } else {
    const keypairPath = `${process.env.HOME}/.config/solana/id.json`
    const keypairData = JSON.parse(fs.readFileSync(keypairPath, 'utf-8'))
    wallet = anchor.web3.Keypair.fromSecretKey(Uint8Array.from(keypairData))
  }

  const defaultProvider = anchor.AnchorProvider.local()

  const provider = new anchor.AnchorProvider(
    defaultProvider.connection,
    new anchor.Wallet(wallet),
    defaultProvider.opts
  )

  anchor.setProvider(provider)

  return provider
}

describe('fundus', () => {
  let provider = toggleProvider('creator')
  let program = new anchor.Program<Fundus>(idl as any, provider)

  let CID: any, DONORS_COUNT: any, WITHDRAW_COUNT: any

  it('creates a campaign', async () => {
    provider = toggleProvider('creator')
    program = new anchor.Program<Fundus>(idl as any, provider)
    const creator = provider.wallet

    const [programStatePda] = PublicKey.findProgramAddressSync(
      [Buffer.from('program_state')],
      program.programId
    )

    const state = await program.account.programState.fetch(programStatePda)
    CID = state.campaignCount.add(new anchor.BN(1))

    const [campaignPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('campaign'), CID.toArrayLike(Buffer, 'le', 8)],
      program.programId
    )

    const title = `Test Campaign Title #${CID.toString()}`
    const description = `Test Campaign description #${CID.toString()}`
    const image_url = `https://dummy_image_${CID.toString()}.png`
    const goal = new anchor.BN(25 * 1_000_000_000) // 25 SOLtoken

    const tx = await program.methods
      .createCampaign(title, description, image_url, goal)
      .accountsPartial({
        programState: programStatePda,
        campaign: campaignPda,
        creator: creator.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc()

    console.log('Transaction Signature:', tx)

    const campaign = await program.account.campaign.fetch(campaignPda)
    console.log('Campaign:', campaign)
    DONORS_COUNT = campaign.donors
    WITHDRAW_COUNT = campaign.withdrawals
  })

  it('update a campaign', async () => {
    provider = toggleProvider('creator')
    program = new anchor.Program<Fundus>(idl as any, provider)
    const creator = provider.wallet

    const [campaignPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('campaign'), CID.toArrayLike(Buffer, 'le', 8)],
      program.programId
    )

    const title = `Update Test Campaign Title #${CID.toString()}`
    const description = `Updated Test Campaign description #${CID.toString()}`
    const image_url = `https://dummy_image_${CID.toString()}.png`
    const goal = new anchor.BN(30 * 1_000_000_000) // 30 SOLtoken

    const tx = await program.methods
      .updateCampaign(CID, title, description, image_url, goal)
      .accountsPartial({
        campaign: campaignPda,
        creator: creator.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc()

    console.log('Transaction Signature:', tx)

    const campaign = await program.account.campaign.fetch(campaignPda)
    console.log('Campaign:', campaign)
  })

  it('donate to campaign', async () => {
    provider = toggleProvider('deployer')
    program = new anchor.Program<Fundus>(idl as any, provider)

    const donor = provider.wallet

    const [campaignPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('campaign'), CID.toArrayLike(Buffer, 'le', 8)],
      program.programId
    )

    const [transactionPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('donor'),
        donor.publicKey.toBuffer(),
        CID.toArrayLike(Buffer, 'le', 8),
        DONORS_COUNT.add(new anchor.BN(1)).toArrayLike(Buffer, 'le', 8),
      ],
      program.programId
    )

    const donorBefore = await provider.connection.getBalance(donor.publicKey)
    const campaignBefore = await provider.connection.getBalance(campaignPda)

    const donation_amount = new anchor.BN(Math.round(10.5 * 1_000_000_000))
    const tx = await program.methods
      .donate(CID, donation_amount)
      .accountsPartial({
        campaign: campaignPda,
        transaction: transactionPda,
        donor: donor.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc()

    console.log('Transaction Signature:', tx)

    const donorAfter = await provider.connection.getBalance(donor.publicKey)
    const campaignAfter = await provider.connection.getBalance(campaignPda)
    const transaction = await program.account.transaction.fetch(transactionPda)

    console.log('Donation:', transaction)

    console.log(`
      donor balance before: ${donorBefore},
      donor balance after: ${donorAfter}, 
    `)

    console.log(`
      campaign balance before: ${campaignBefore},
      campaign balance after: ${campaignAfter}, 
    `)
  })

  it('withdraw from campaign', async () => {
    provider = toggleProvider('creator')
    program = new anchor.Program<Fundus>(idl as any, provider)
    const creator = provider.wallet

    const [programStatePda] = PublicKey.findProgramAddressSync(
      [Buffer.from('program_state')],
      program.programId
    )

    const [campaignPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('campaign'), CID.toArrayLike(Buffer, 'le', 8)],
      program.programId
    )

    const [transactionPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('withdraw'),
        creator.publicKey.toBuffer(),
        CID.toArrayLike(Buffer, 'le', 8),
        WITHDRAW_COUNT.add(new anchor.BN(1)).toArrayLike(Buffer, 'le', 8),
      ],
      program.programId
    )

    const creatorBefore = await provider.connection.getBalance(
      creator.publicKey
    )
    const campaignBefore = await provider.connection.getBalance(campaignPda)

    const programState = await program.account.programState.fetch(
      programStatePda
    )
    const platformBefore = await provider.connection.getBalance(
      programState.platformAddress
    )

    const donation_amount = new anchor.BN(Math.round(3.5 * 1_000_000_000))
    const tx = await program.methods
      .withdraw(CID, donation_amount)
      .accountsPartial({
        programState: programStatePda,
        campaign: campaignPda,
        transaction: transactionPda,
        creator: creator.publicKey,
        platformAddress: programState.platformAddress,
        systemProgram: SystemProgram.programId,
      })
      .rpc()

    console.log('Transaction Signature:', tx)

    const creatorAfter = await provider.connection.getBalance(creator.publicKey)
    const campaignAfter = await provider.connection.getBalance(campaignPda)
    const transaction = await program.account.transaction.fetch(transactionPda)

    const platformAfter = await provider.connection.getBalance(
      programState.platformAddress
    )

    console.log('Withdrawal:', transaction)

    console.log(`
      creator balance before: ${creatorBefore},
      creator balance after: ${creatorAfter}, 
    `)

    console.log(`
      platform balance before: ${platformBefore},
      platform balance after: ${platformAfter}, 
    `)

    console.log(`
      campaign balance before: ${campaignBefore},
      campaign balance after: ${campaignAfter}, 
    `)
  })

  it('delete a campaign', async () => {
    provider = toggleProvider('creator')
    program = new anchor.Program<Fundus>(idl as any, provider)
    const creator = provider.wallet

    const [campaignPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('campaign'), CID.toArrayLike(Buffer, 'le', 8)],
      program.programId
    )

    const tx = await program.methods
      .deleteCampaign(CID)
      .accountsPartial({
        campaign: campaignPda,
        creator: creator.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc()

    console.log('Transaction Signature:', tx)

    const campaign = await program.account.campaign.fetch(campaignPda)
    console.log('Campaign:', campaign)
  })

  it('updates platform fee', async () => {
    provider = toggleProvider('deployer')
    program = new anchor.Program<Fundus>(idl as any, provider)
    const updater = provider.wallet

    const [programStatePda] = PublicKey.findProgramAddressSync(
      [Buffer.from('program_state')],
      program.programId
    )

    const stateBefore = await program.account.programState.fetch(
      programStatePda
    )
    console.log('state:', stateBefore)

    const tx = await program.methods
      .updatePlatformSettings(new anchor.BN(7))
      .accountsPartial({
        updater: updater.publicKey,
        programState: programStatePda,
      })
      .rpc()

    console.log('Transaction Signature:', tx)

    const stateAfter = await program.account.programState.fetch(programStatePda)
    console.log('state:', stateAfter)
  })
})
