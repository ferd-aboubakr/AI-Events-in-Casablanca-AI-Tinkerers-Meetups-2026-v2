import { processSignal } from '@/services/agentCore';
import type { UserWorkflowConfig } from '@/types/agent';
export async function POST(request: Request) { const { transcript, config } = await request.json() as { transcript: string; config: UserWorkflowConfig }; return Response.json(await processSignal(transcript, config)) }
