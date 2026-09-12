export async function searchCompetitorIntel(query: string) {
  if (!process.env.EXA_API_KEY || process.env.USE_MOCK_FALLBACKS === 'true') return ['Competitor X pricing page: $20/seat monthly', 'Market analysis: enterprise pricing is increasingly usage-based'];
  try { const response = await fetch('https://api.exa.ai/search', { method: 'POST', signal: AbortSignal.timeout(5000), headers: { 'x-api-key': process.env.EXA_API_KEY, 'content-type': 'application/json' }, body: JSON.stringify({ query, numResults: 2 }) }); return response.ok ? ((await response.json()).results?.map((x: { title: string }) => x.title) ?? []) : [] } catch { return [] }
}
