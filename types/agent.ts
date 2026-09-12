export type LoopStage = 'Observe' | 'Understand' | 'Detect' | 'Investigate' | 'Reason' | 'Recommend' | 'Approve_AutoAct' | 'Act';
export interface StageCriteria { stage: LoopStage; selectedPresets: string[]; customConditions: string[] }
export interface UserWorkflowConfig { id: string; name: string; stages: Record<LoopStage, StageCriteria> }
export type RiskLevel = 'low' | 'high';
export interface AgentOutput { sessionId: string; status: 'no_signal' | 'investigating' | 'recommendation' | 'auto_executed'; signal?: string; risk: RiskLevel; riskReason: string; recommendation?: { actionType: string; payload: Record<string, unknown> }; reasoning: string; requiresApproval: boolean; sources: { internal: string[]; external: string[] }; autoActionsLog: Array<{ actionType: string; executedAt: string; risk: 'low'; details: string }> }
