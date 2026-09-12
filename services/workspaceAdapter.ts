const mockCustomer = { company: 'Northstar Health', plan: 'Growth', renewal: '2026-10-31', health: 'At risk', owner: 'Maya Chen' };
export async function getCustomerContext() { return mockCustomer }
export async function getContract() { return { minimumMargin: 25, seats: 120, renewalTerm: 'Annual', discountCap: 15 } }
export async function getCompanyPolicy() { return { discountApproval: 'Director approval required above 15%', externalMessages: 'Human approval required' } }
