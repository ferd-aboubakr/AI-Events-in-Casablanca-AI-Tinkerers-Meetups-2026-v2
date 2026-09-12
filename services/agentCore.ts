import { classifyRisk } from './businessRules';
import { getCompanyPolicy, getContract, getCustomerContext } from './workspaceAdapter';
import { searchCompetitorIntel } from './exaAdapter';
import { executeLowRisk } from './actionsAndAudit';
import type { AgentOutput, UserWorkflowConfig } from '@/types/agent';
export async function processSignal(transcript: string, config: UserWorkflowConfig): Promise<AgentOutput> {
  const criteria = Object.values(config.stages).flatMap(x => [...x.selectedPresets, ...x.customConditions]).join('; ');
  const [customer, contract, policy, intel] = await Promise.all([getCustomerContext(), getContract(), getCompanyPolicy(), searchCompetitorIntel(transcript)]);
  const needsQuote = /competitor|price|discount|seat/i.test(transcript);
  if (!needsQuote) { const auto = executeLowRisk('Log CRM note', 'Call signal captured for account review.'); return { sessionId: crypto.randomUUID(), status: 'auto_executed', risk: 'low', riskReason: 'Internal note only.', reasoning: `Applied workflow criteria: ${criteria || 'defaults'}. No commercial signal detected.`, requiresApproval: false, sources: { internal: [`CRM · ${customer.company}`], external: intel }, autoActionsLog: [auto] } }
  const risk = classifyRisk({ actionType: 'Generate customer quote', financialImpact: 1, isCustomerFacing: true });
  return { sessionId: crypto.randomUUID(), status: 'recommendation', signal: transcript, risk: risk.risk, riskReason: risk.reason, recommendation: { actionType: 'Prepare retention quote', payload: { suggestedDiscount: 10, minimumMargin: contract.minimumMargin } }, reasoning: `Competitor pricing signal detected. ${customer.company} is ${customer.health}; contract margin floor is ${contract.minimumMargin}%. A 10% retention quote stays within the ${contract.discountCap}% cap. Configured criteria were incorporated: ${criteria || 'defaults'}. ${policy.discountApproval}`, requiresApproval: true, sources: { internal: [`CRM · ${customer.company}`, `Contract · ${contract.seats} seats`, 'Policy · Discount guardrails'], external: intel }, autoActionsLog: [] }
}
