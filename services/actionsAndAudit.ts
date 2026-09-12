export const auditLog: Array<{ actionType: string; executedAt: string; risk: 'low'; details: string }> = [];
export function executeLowRisk(actionType: string, details: string) { const entry = { actionType, executedAt: new Date().toISOString(), risk: 'low' as const, details }; auditLog.unshift(entry); return entry }
