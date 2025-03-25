import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js'
import 'dotenv/config'

export async function POST(request: Request) {
  const secretKey = process.env.SECRET_KEY || ''
  const cluster = process.env.NEXT_PUBLIC_CLUSTER || 'devnet'
  const providedKey = request.headers.get('x-secret-key')

  if (providedKey !== secretKey) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { accountAddress } = await request.json()

  if (!accountAddress) {
    return new Response('Invalid accountAddress', { status: 400 })
  }

  const connection = new Connection(clusterApiUrl(cluster as any))
  const publicKey = new PublicKey(accountAddress)
  const accountInfo = await connection.getAccountInfo(publicKey)

  if (!accountInfo) {
    return new Response('Account not found', { status: 404 })
  }

  const isProgram = accountInfo.executable
  const isPDA = PublicKey.isOnCurve(publicKey.toBuffer()) === false

  let accountType = 'wallet'
  if (isProgram) {
    accountType = 'program'
  } else if (isPDA) {
    accountType = 'pda'
  }

  try {
    const balance = await connection.getBalance(publicKey)

    return new Response(
      JSON.stringify({ type: accountType, accountInfo, balance }),
      {
        status: 200,
      }
    )
  } catch (error) {
    return new Response(`Error: ${error}`, { status: 500 })
  }
}
