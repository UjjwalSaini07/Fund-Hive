import {
  fetchCampaignDetails,
  getProviderReadonly,
} from '@/services/blockchain'
import 'dotenv/config'

export async function GET(request: Request) {
  const secretKey = process.env.SECRET_KEY || ''
  const providedKey = request.headers.get('x-secret-key')

  if (providedKey !== secretKey) {
    return new Response('Unauthorized', { status: 401 })
  }

  const url = new URL(request.url)
  const pda = url.searchParams.get('pda')

  if (!pda) {
    return new Response('Invalid campaign program derived address (pda)', {
      status: 400,
    })
  }

  // Validate the pda format (assuming Solana PDA is a base58 string of 32 bytes)
  const base58Regex = /^[A-HJ-NP-Za-km-z1-9]{32,44}$/
  if (!base58Regex.test(pda)) {
    return new Response('Invalid Solana PDA format', {
      status: 400,
    })
  }

  const program = getProviderReadonly()

  try {
    const campaign = await fetchCampaignDetails(program!, pda)
    return new Response(JSON.stringify(campaign), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response('Error fetching campaign', { status: 500 })
  }
}
