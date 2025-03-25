import { AnchorProvider, BN, Program, Wallet } from '@coral-xyz/anchor'
import {
  Connection,
  PublicKey,
  SystemProgram,
  TransactionSignature,
} from '@solana/web3.js'
import { Fundus } from '../../anchor/target/types/fundus'
import idl from '../../anchor/target/idl/fundus.json'
import { Campaign, ProgramState, Transaction } from '@/utils/interfaces'
import { store } from '@/store'
import { globalActions } from '@/store/globalSlices'
import { getClusterURL } from '@/utils/helper'

let tx: any
const { setCampaign, setDonations, setWithdrawls, setStates } = globalActions
const CLUSTER: string = process.env.NEXT_PUBLIC_CLUSTER || 'localhost'
const RPC_URL: string = getClusterURL(CLUSTER)

export const getProvider = (
  publicKey: PublicKey | null,
  signTransaction: any,
  sendTransaction: any
): Program<Fundus> | null => {
  if (!publicKey || !signTransaction) {
    console.error('Wallet not connected or missing signTransaction')
    return null
  }

  const connection = new Connection(RPC_URL, 'confirmed')
  const provider = new AnchorProvider(
    connection,
    { publicKey, signTransaction, sendTransaction } as unknown as Wallet,
    { commitment: 'processed' }
  )

  return new Program<Fundus>(idl as any, provider)
}

export const getProviderReadonly = (): Program<Fundus> => {
  const connection = new Connection(RPC_URL, 'confirmed')

  const walllet = {
    publicKey: PublicKey.default,
    signTransaction: async () => {
      throw new Error('Read-only provider cannot sign transactions.')
    },
    signAllTransaction: async () => {
      throw new Error('Read-only provider cannot sign transactions.')
    },
  }

  const provider = new AnchorProvider(
    connection,
    walllet as unknown as Wallet,
    { commitment: 'processed' }
  )

  return new Program<Fundus>(idl as any, provider)
}

export const createCampaign = async (
  program: Program<Fundus>,
  publicKey: PublicKey,
  title: string,
  description: string,
  image_url: string,
  goal: number
): Promise<TransactionSignature> => {
  const [programStatePda] = PublicKey.findProgramAddressSync(
    [Buffer.from('program_state')],
    program.programId
  )

  const state = await program.account.programState.fetch(programStatePda)
  const CID = state.campaignCount.add(new BN(1))

  const [campaignPda] = PublicKey.findProgramAddressSync(
    [Buffer.from('campaign'), CID.toArrayLike(Buffer, 'le', 8)],
    program.programId
  )

  const goalBN = new BN(goal * 1_000_000_000)
  tx = await program.methods
    .createCampaign(title, description, image_url, goalBN)
    .accountsPartial({
      programState: programStatePda,
      campaign: campaignPda,
      creator: publicKey,
      systemProgram: SystemProgram.programId,
    })
    .rpc()

  const connection = new Connection(
    program.provider.connection.rpcEndpoint,
    'confirmed'
  )

  await connection.confirmTransaction(tx, 'finalized')
  return tx
}

export const updateCampaign = async (
  program: Program<Fundus>,
  publicKey: PublicKey,
  pda: string,
  title: string,
  description: string,
  image_url: string,
  goal: number
): Promise<TransactionSignature> => {
  const campaign = await program.account.campaign.fetch(pda)

  const goalBN = new BN(goal * 1_000_000_000)
  const tx = await program.methods
    .updateCampaign(campaign.cid, title, description, image_url, goalBN)
    .accountsPartial({
      campaign: pda,
      creator: publicKey,
      systemProgram: SystemProgram.programId,
    })
    .rpc()

  const connection = new Connection(
    program.provider.connection.rpcEndpoint,
    'confirmed'
  )

  await connection.confirmTransaction(tx, 'finalized')
  return tx
}

export const deleteCampaign = async (
  program: Program<Fundus>,
  publicKey: PublicKey,
  pda: string
): Promise<TransactionSignature> => {
  const campaign = await program.account.campaign.fetch(pda)

  const tx = await program.methods
    .deleteCampaign(campaign.cid)
    .accountsPartial({
      campaign: pda,
      creator: publicKey,
      systemProgram: SystemProgram.programId,
    })
    .rpc()

  const connection = new Connection(
    program.provider.connection.rpcEndpoint,
    'confirmed'
  )

  await connection.confirmTransaction(tx, 'finalized')
  return tx
}

export const updatePlatform = async (
  program: Program<Fundus>,
  publicKey: PublicKey,
  percent: number
): Promise<TransactionSignature> => {
  const [programStatePda] = PublicKey.findProgramAddressSync(
    [Buffer.from('program_state')],
    program.programId
  )

  const tx = await program.methods
    .updatePlatformSettings(new BN(percent))
    .accountsPartial({
      updater: publicKey,
      programState: programStatePda,
    })
    .rpc()

  const connection = new Connection(
    program.provider.connection.rpcEndpoint,
    'confirmed'
  )

  await connection.confirmTransaction(tx, 'finalized')
  return tx
}

export const donateToCampaign = async (
  program: Program<Fundus>,
  publicKey: PublicKey,
  pda: string,
  amount: number
): Promise<TransactionSignature> => {
  const campaign = await program.account.campaign.fetch(pda)

  const [transactionPda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from('donor'),
      publicKey.toBuffer(),
      campaign.cid.toArrayLike(Buffer, 'le', 8),
      campaign.donors.add(new BN(1)).toArrayLike(Buffer, 'le', 8),
    ],
    program.programId
  )

  const donation_amount = new BN(Math.round(amount * 1_000_000_000))
  const tx = await program.methods
    .donate(campaign.cid, donation_amount)
    .accountsPartial({
      campaign: pda,
      transaction: transactionPda,
      donor: publicKey,
      systemProgram: SystemProgram.programId,
    })
    .rpc()

  const connection = new Connection(
    program.provider.connection.rpcEndpoint,
    'confirmed'
  )

  await connection.confirmTransaction(tx, 'finalized')
  return tx
}

export const withdrawFromCampaign = async (
  program: Program<Fundus>,
  publicKey: PublicKey,
  pda: string,
  amount: number
): Promise<TransactionSignature> => {
  const campaign = await program.account.campaign.fetch(pda)

  const [programStatePda] = PublicKey.findProgramAddressSync(
    [Buffer.from('program_state')],
    program.programId
  )

  const [transactionPda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from('withdraw'),
      publicKey.toBuffer(),
      campaign.cid.toArrayLike(Buffer, 'le', 8),
      campaign.withdrawals.add(new BN(1)).toArrayLike(Buffer, 'le', 8),
    ],
    program.programId
  )

  const programState = await program.account.programState.fetch(programStatePda)

  const withdraw_amount = new BN(Math.round(amount * 1_000_000_000))
  const tx = await program.methods
    .withdraw(campaign.cid, withdraw_amount)
    .accountsPartial({
      programState: programStatePda,
      campaign: pda,
      transaction: transactionPda,
      creator: publicKey,
      platformAddress: programState.platformAddress,
      systemProgram: SystemProgram.programId,
    })
    .rpc()

  const connection = new Connection(
    program.provider.connection.rpcEndpoint,
    'confirmed'
  )

  await connection.confirmTransaction(tx, 'finalized')
  return tx
}

export const fetchActiveCampaigns = async (
  program: Program<Fundus>
): Promise<Campaign[]> => {
  const campaigns = await program.account.campaign.all()
  const activeCampaigns = campaigns.filter((c) => c.account.active)
  return serializedCampaigns(activeCampaigns)
}

export const fetchUserCampaigns = async (
  program: Program<Fundus>,
  publicKey: PublicKey
): Promise<Campaign[]> => {
  const campaigns = await program.account.campaign.all()
  const useCampaigns = campaigns.filter((c) => {
    return c.account.creator.toBase58() == publicKey.toBase58()
  })
  return serializedCampaigns(useCampaigns)
}

export const fetchCampaignDetails = async (
  program: Program<Fundus>,
  pda: string
): Promise<Campaign> => {
  const campaign = await program.account.campaign.fetch(pda)
  const serialized: Campaign = {
    ...campaign,
    publicKey: pda,
    cid: campaign.cid.toNumber(),
    creator: campaign.creator.toBase58(),
    goal: campaign.goal.toNumber() / 1e9,
    amountRaised: campaign.amountRaised.toNumber() / 1e9,
    timestamp: campaign.timestamp.toNumber() * 1000,
    donors: campaign.donors.toNumber(),
    withdrawals: campaign.withdrawals.toNumber(),
    balance: campaign.balance.toNumber() / 1e9,
  }

  store.dispatch(setCampaign(serialized))

  return serialized
}

export const fetchAllDonations = async (
  program: Program<Fundus>,
  pda: string
): Promise<Transaction[]> => {
  const campaign = await program.account.campaign.fetch(pda)
  const transactions = await program.account.transaction.all()

  const donations = transactions.filter((tx) => {
    return tx.account.cid.eq(campaign.cid) && tx.account.credited
  })

  store.dispatch(setDonations(serializedTxs(donations)))
  return serializedTxs(donations)
}

export const fetchAllWithsrawals = async (
  program: Program<Fundus>,
  pda: string
): Promise<Transaction[]> => {
  const campaign = await program.account.campaign.fetch(pda)
  const transactions = await program.account.transaction.all()

  const withdrawals = transactions.filter((tx) => {
    return tx.account.cid.eq(campaign.cid) && !tx.account.credited
  })

  store.dispatch(setWithdrawls(serializedTxs(withdrawals)))
  return serializedTxs(withdrawals)
}

export const fetchProgramState = async (
  program: Program<Fundus>
): Promise<ProgramState> => {
  const [programStatePda] = PublicKey.findProgramAddressSync(
    [Buffer.from('program_state')],
    program.programId
  )

  const programState = await program.account.programState.fetch(programStatePda)

  const serialized: ProgramState = {
    ...programState,
    campaignCount: programState.campaignCount.toNumber(),
    platformFee: programState.platformFee.toNumber(),
    platformAddress: programState.platformAddress.toBase58(),
  }

  store.dispatch(setStates(serialized))
  return serialized
}

const serializedCampaigns = (campaigns: any[]): Campaign[] => {
  return campaigns.map((c: any) => ({
    ...c.account,
    publicKey: c.publicKey.toBase58(),
    cid: c.account.cid.toNumber(),
    creator: c.account.creator.toBase58(),
    goal: c.account.goal.toNumber() / 1e9,
    amountRaised: c.account.amountRaised.toNumber() / 1e9,
    timestamp: c.account.timestamp.toNumber() * 1000,
    donors: c.account.donors.toNumber(),
    withdrawals: c.account.withdrawals.toNumber(),
    balance: c.account.balance.toNumber() / 1e9,
  }))
}

const serializedTxs = (transactions: any[]): Transaction[] => {
  return transactions.map((c: any) => ({
    ...c.account,
    publicKey: c.publicKey.toBase58(),
    owner: c.account.owner.toBase58(),
    cid: c.account.cid.toNumber(),
    amount: c.account.amount.toNumber() / 1e9,
    timestamp: c.account.timestamp.toNumber() * 1000,
  }))
}
