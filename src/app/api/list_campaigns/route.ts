import {
  fetchActiveCampaigns,
  getProviderReadonly,
} from '@/services/blockchain'
import 'dotenv/config'

export async function GET(request: Request) {
  const secretKey = process.env.SECRET_KEY || ''
  const providedKey = request.headers.get('x-secret-key')

  if (providedKey !== secretKey) {
    return new Response('Unauthorized', { status: 401 })
  }

  const program = getProviderReadonly()

  try {
    const campaigns = await fetchActiveCampaigns(program!)
    return new Response(JSON.stringify(campaigns), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response('Error fetching campaigns', { status: 500 })
  }
}
