export interface ProposedAction { actionType: string; financialImpact?: number; isCustomerFacing?: boolean }
export function classifyRisk(action: ProposedAction) {
  if ((action.financialImpact ?? 0) > 0 || action.isCustomerFacing) return { risk: 'high' as const, reason: 'Non-overridable security policy: financial or external impact.' };
  return { risk: 'low' as const, reason: 'Internal, reversible action with no financial or external impact.' };
}
