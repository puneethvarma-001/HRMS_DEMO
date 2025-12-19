import { AIRequest, AIResponse, AIAuditLog } from './types';

/**
 * AI client for making RBAC-aware AI requests
 */
export class AIClient {
  private baseUrl: string;
  private auditLogs: AIAuditLog[] = [];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Send an AI query
   * This method enforces RBAC by requiring permissions in the request
   */
  async query(request: AIRequest): Promise<AIResponse> {
    const response = await fetch(`${this.baseUrl}/api/ai/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`AI query failed: ${response.statusText}`);
    }

    const result = await response.json() as AIResponse;

    // Log the interaction for audit
    this.logAIInteraction({
      id: result.id,
      userId: request.userId,
      tenantId: request.tenantId,
      query: request.query,
      response: result.content,
      timestamp: result.timestamp,
      permissionsChecked: request.permissions,
      wasAllowed: true,
    });

    return result;
  }

  /**
   * Stream AI responses
   * For long-running AI queries that need to stream responses
   */
  async *streamQuery(request: AIRequest): AsyncGenerator<string> {
    const response = await fetch(`${this.baseUrl}/api/ai/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`AI stream failed: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    const decoder = new TextDecoder();

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        yield chunk;
      }
    } finally {
      reader.releaseLock();
    }
  }

  /**
   * Log AI interaction for audit trail
   */
  private logAIInteraction(log: AIAuditLog): void {
    this.auditLogs.push(log);
    // In production, this would send to an audit service
    console.log('[AI Audit]', log);
  }

  /**
   * Get audit logs
   */
  getAuditLogs(): AIAuditLog[] {
    return [...this.auditLogs];
  }
}

/**
 * Create AI client instance
 */
export function createAIClient(baseUrl: string): AIClient {
  return new AIClient(baseUrl);
}
