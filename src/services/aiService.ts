import { ChatMessage } from '../types';

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg_welcome',
    sender: 'coach',
    text: "Akwaaba, Ama! I've reviewed your latest financial profile for Ama's Kitchen. Your readiness score is 742 / 1000 with an 86% Evidence Confidence Index. You have a solid foundation supported by 6 months of active Mobile Money receipts and steady Susu savings. How can I guide you today?",
    timestamp: 'Just now',
    suggestedQuestions: [
      "Why isn't my readiness higher?",
      "What should I improve first?",
      "What evidence am I missing?",
      "How can I prepare for a GH₵8,000 financing need?",
      "What happens if my income becomes more consistent?",
    ],
  },
];

const PREDEFINED_RESPONSES: Record<string, string> = {
  "Why isn't my readiness higher?":
    "Your income (18/20) and savings habits (18/20) are genuinely impressive! The primary factors capping your score at 742 are Documentation Completeness (8/15) and Cash-flow Stability (14/20). Because paper receipts from Makola wholesalers haven't been formalized into digital records, lenders have lower certainty around your net margins. Strengthening your documentation alone could unlock up to +44 readiness points.",

  "What should I improve first?":
    "Focus on Priority #1 in your 30-day plan: Add business records consistently. Uploading delivery notes and vendor receipts for your weekly poultry and vegetable restocking will boost your Documentation score from 8/15 toward 13/15 within 60 days. This is the fastest, lowest-cost way to make your business look institutional-grade.",

  "What evidence am I missing?":
    "Currently, you have 6 months of verified MTN Mobile Money inflows, but you are missing formal supplier invoices and an audited profit-and-loss summary. Even simple photographed wholesale receipts from your food provisioners count toward closing this gap and lifting your Evidence Confidence Index from 86% toward 95%.",

  "How can I prepare for a GH₵8,000 financing need?":
    "To comfortably qualify for a GH₵8,000 inventory expansion loan: First, your current monthly operating turnover (GH₵ 14,850) easily covers typical monthly repayments of ~GH₵ 850. Second, ensure your remaining refrigerator lease installments (GH₵ 450/mo) continue to be paid without delay. If you maintain your GH₵ 200/week MoMo Vault savings for another 4 weeks, your profile will be in the top quartile of food retail applicants in Accra.",

  "What happens if my income becomes more consistent?":
    "If you maintain steady MoMo inflows above GH₵ 3,000 weekly for 8 consecutive weeks, our What-If model projects your readiness score will climb from 742 to 768 (+26 points). Eliminating mid-week dips signals to capital providers that you have dependable daily lunch patron volume.",
};

class AIService {
  private messages: ChatMessage[] = [...INITIAL_MESSAGES];

  getMessages(): ChatMessage[] {
    return this.messages;
  }

  async sendMessage(userText: string): Promise<ChatMessage> {
    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: 'Just now',
    };
    this.messages.push(userMsg);

    // Find match or generate deterministic response
    const matchedKey = Object.keys(PREDEFINED_RESPONSES).find(
      (k) => k.toLowerCase() === userText.trim().toLowerCase()
    );

    let replyText = '';
    if (matchedKey) {
      replyText = PREDEFINED_RESPONSES[matchedKey];
    } else if (userText.toLowerCase().includes('loan') || userText.toLowerCase().includes('capital') || userText.toLowerCase().includes('8000') || userText.toLowerCase().includes('8,000')) {
      replyText = "For an expansion capital need of GH₵ 8,000, your 742 readiness score already proves debt service coverage. Lenders look for steady cash buffers and verified supplier history. By sharing your CapitalBridge Financial Passport, you present 6 months of verified MoMo receipts rather than an unverified informal claim.";
    } else if (userText.toLowerCase().includes('score') || userText.toLowerCase().includes('742') || userText.toLowerCase().includes('readiness')) {
      replyText = "Your 742 score reflects a 'Good foundation'. It is calculated deterministically across 6 signals: Income (18/20), Business Activity (19/20), Savings (18/20), Cash Flow (14/20), Debt Burden (11/15), and Documentation (8/15). CapitalBridge never guesses or manufactures scores—every point maps to verified evidence.";
    } else {
      replyText = `Thank you for your question regarding Ama's Kitchen. Based on your 742 readiness score and 86% Evidence Confidence, your strongest asset is steady daily retail turnover. I recommend checking your 30-Day Improvement Plan to tackle documentation gaps, or testing the What-If Simulator to explore how specific business decisions impact your profile.`;
    }

    // Simulate AI thinking time
    await new Promise((r) => setTimeout(r, 600));

    const coachMsg: ChatMessage = {
      id: `coach_${Date.now()}`,
      sender: 'coach',
      text: replyText,
      timestamp: 'Just now',
      suggestedQuestions: [
        "What evidence am I missing?",
        "How can I prepare for a GH₵8,000 financing need?",
        "What should I improve first?",
      ],
    };

    this.messages.push(coachMsg);
    return coachMsg;
  }
}

export const aiService = new AIService();
