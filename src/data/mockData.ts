import type { Feedback } from '../lib/types'

const locations = ['Lekki', 'Ikeja', 'Yaba', 'Victoria Island', 'Surulere']
const services = [
  'Oil Change',
  'Brake Service',
  'AC Repair',
  'Wheel Alignment',
  'Engine Diagnostics',
  'Full Service',
]

const rows: Array<
  Omit<Feedback, 'feedbackId' | 'receivedAt' | 'status'>
> = [
  {
    customerName: 'Chidi Okafor',
    customerEmail: 'chidi.okafor@example.com',
    location: 'Lekki',
    service: 'Oil Change',
    originalMessage:
      'I brought my car in for a simple oil change and when I picked it up there was a large fresh scratch across the hood that was not there before. When I pointed it out, the staff denied it happened at the shop and refused to look into it.',
    sentiment: 'negative',
    sentimentScore: -0.92,
    severity: 'high',
    severityScore: 0.91,
    isRepeatNegative: true,
    route: 'manager_alert',
    category: 'Service quality',
    theme: 'Vehicle damage',
    issue: 'Vehicle damaged during service',
    aiSummary:
      'Customer reports a fresh hood scratch after an oil change and says the concern was dismissed by staff.',
    aiDraftReply:
      'Subject: Re: Your Recent Oil Change Visit — Lekki Location\n\nDear Mr. Okafor,\n\nThank you for bringing this to our attention. We sincerely apologize for the damage concern and for how your report was handled. A manager from our Lekki location will contact you within 1–2 business days to review the details, inspect the vehicle, and discuss next steps toward a resolution.\n\nThe Lekki Team',
    responseSent: false,
    alertAcknowledged: false,
    confidence: 0.98,
    source: 'Gmail',
  },
  {
    customerName: 'Amina Yusuf',
    customerEmail: 'amina.yusuf@example.com',
    location: 'Lekki',
    service: 'Full Service',
    originalMessage:
      'The service took longer than expected and nobody updated me. The work itself was okay.',
    sentiment: 'negative',
    sentimentScore: -0.34,
    severity: 'low',
    severityScore: 0.29,
    isRepeatNegative: false,
    route: 'private_queue',
    category: 'Customer experience',
    theme: 'Service delays',
    issue: 'Long wait without updates',
    aiSummary:
      'Customer was dissatisfied with the wait and lack of communication, but says the work itself was acceptable.',
    aiDraftReply:
      'Subject: Re: Your Recent Service Visit — Lekki Location\n\nDear Ms. Yusuf,\n\nThank you for sharing your experience. We are sorry the service took longer than expected and that we did not keep you updated. We appreciate your feedback and will review how we communicate delays with customers.\n\nThe Lekki Team',
    responseSent: false,
    alertAcknowledged: false,
    confidence: 0.94,
    source: 'Gmail',
  },
  {
    customerName: 'Tunde Bello',
    customerEmail: 'tunde.bello@example.com',
    location: 'Ikeja',
    service: 'Brake Service',
    originalMessage:
      'Excellent service. The team explained everything clearly and my brakes feel great.',
    sentiment: 'positive',
    sentimentScore: 0.91,
    severity: 'low',
    severityScore: 0.08,
    isRepeatNegative: false,
    route: 'ready_to_post',
    category: 'Service quality',
    theme: 'Staff professionalism',
    issue: 'Clear service communication',
    aiSummary:
      'Customer praised the quality of work and clear explanations.',
    aiDraftReply: '',
    responseSent: false,
    alertAcknowledged: false,
    confidence: 0.99,
    source: 'Gmail',
  },
  {
    customerName: 'Ngozi Eze',
    customerEmail: 'ngozi.eze@example.com',
    location: 'Yaba',
    service: 'AC Repair',
    originalMessage:
      'My AC is working perfectly now. Thank you for explaining the issue and fixing it quickly.',
    sentiment: 'positive',
    sentimentScore: 0.88,
    severity: 'low',
    severityScore: 0.06,
    isRepeatNegative: false,
    route: 'ready_to_post',
    category: 'Service quality',
    theme: 'Fast resolution',
    issue: 'Quick repair',
    aiSummary:
      'Customer praised a quick, successful AC repair and clear explanation.',
    aiDraftReply: '',
    responseSent: false,
    alertAcknowledged: false,
    confidence: 0.99,
    source: 'Gmail',
  },
  {
    customerName: 'David Cole',
    customerEmail: 'david.cole@example.com',
    location: 'Victoria Island',
    service: 'Wheel Alignment',
    originalMessage:
      'Everything was smooth from booking to pickup. I will definitely come back.',
    sentiment: 'positive',
    sentimentScore: 0.86,
    severity: 'low',
    severityScore: 0.05,
    isRepeatNegative: false,
    route: 'ready_to_post',
    category: 'Customer experience',
    theme: 'Convenience',
    issue: 'Smooth visit',
    aiSummary:
      'Customer described a smooth end-to-end experience and intent to return.',
    aiDraftReply: '',
    responseSent: false,
    alertAcknowledged: false,
    confidence: 0.98,
    source: 'Gmail',
  },
  {
    customerName: 'Sarah Adeyemi',
    customerEmail: 'sarah.adeyemi@example.com',
    location: 'Surulere',
    service: 'Engine Diagnostics',
    originalMessage:
      'The technician was helpful but I waited nearly two hours longer than quoted.',
    sentiment: 'negative',
    sentimentScore: -0.41,
    severity: 'medium',
    severityScore: 0.48,
    isRepeatNegative: false,
    route: 'private_queue',
    category: 'Customer experience',
    theme: 'Service delays',
    issue: 'Quoted time exceeded',
    aiSummary:
      'Helpful technician, but the customer experienced a significant delay beyond the quoted time.',
    aiDraftReply:
      'Subject: Re: Your Engine Diagnostics Visit — Surulere Location\n\nDear Ms. Adeyemi,\n\nThank you for your feedback. We are sorry the wait exceeded the time we quoted, even though the technician was helpful. We will review how we set and communicate expected completion times.\n\nThe Surulere Team',
    responseSent: true,
    responseSentAt: '2026-09-29T11:30:00+01:00',
    alertAcknowledged: false,
    confidence: 0.93,
    source: 'Gmail',
  },
  {
    customerName: 'Kunle Ajayi',
    customerEmail: 'kunle.ajayi@example.com',
    location: 'Ikeja',
    service: 'Oil Change',
    originalMessage:
      'This is the second time my oil change appointment has been delayed. Very frustrating.',
    sentiment: 'negative',
    sentimentScore: -0.68,
    severity: 'medium',
    severityScore: 0.61,
    isRepeatNegative: true,
    route: 'manager_alert',
    category: 'Customer experience',
    theme: 'Service delays',
    issue: 'Repeated appointment delays',
    aiSummary:
      'Repeat customer reports a second service delay and expresses strong frustration.',
    aiDraftReply:
      'Subject: Re: Your Recent Oil Change Visit — Ikeja Location\n\nDear Mr. Ajayi,\n\nWe are sorry to hear that you have experienced another delay. We recognize that repeated delays are frustrating and a manager will review the pattern with you directly.\n\nThe Ikeja Team',
    responseSent: false,
    alertAcknowledged: true,
    alertAcknowledgedAt: '2026-09-28T16:10:00+01:00',
    confidence: 0.97,
    source: 'Gmail',
  },
  {
    customerName: 'Bola Martins',
    customerEmail: 'bola.martins@example.com',
    location: 'Lekki',
    service: 'Brake Service',
    originalMessage:
      'The brake work was good, but the bill was higher than I expected.',
    sentiment: 'negative',
    sentimentScore: -0.38,
    severity: 'low',
    severityScore: 0.27,
    isRepeatNegative: false,
    route: 'private_queue',
    category: 'Pricing',
    theme: 'Pricing transparency',
    issue: 'Unexpected final bill',
    aiSummary:
      'Customer was satisfied with the repair but unhappy with the final cost.',
    aiDraftReply:
      'Subject: Re: Your Brake Service Visit — Lekki Location\n\nDear Ms. Martins,\n\nThank you for your feedback. We are glad the brake work met your expectations, and we are sorry the final bill was higher than expected. We will review how the additional work and pricing were communicated.\n\nThe Lekki Team',
    responseSent: false,
    alertAcknowledged: false,
    confidence: 0.92,
    source: 'Gmail',
  },
  {
    customerName: 'Ifeanyi Nwosu',
    customerEmail: 'ifeanyi.nwosu@example.com',
    location: 'Yaba',
    service: 'Full Service',
    originalMessage:
      'The team were friendly and the car was ready when promised.',
    sentiment: 'positive',
    sentimentScore: 0.83,
    severity: 'low',
    severityScore: 0.05,
    isRepeatNegative: false,
    route: 'ready_to_post',
    category: 'Customer experience',
    theme: 'Staff professionalism',
    issue: 'Friendly service',
    aiSummary:
      'Customer praised friendly staff and on-time completion.',
    aiDraftReply: '',
    responseSent: false,
    alertAcknowledged: false,
    confidence: 0.98,
    source: 'Gmail',
  },
  {
    customerName: 'Mariam Lawal',
    customerEmail: 'mariam.lawal@example.com',
    location: 'Victoria Island',
    service: 'AC Repair',
    originalMessage:
      'The AC is still not cooling properly. I have already returned once for the same issue.',
    sentiment: 'negative',
    sentimentScore: -0.77,
    severity: 'high',
    severityScore: 0.82,
    isRepeatNegative: true,
    route: 'manager_alert',
    category: 'Service quality',
    theme: 'Repeat repair failure',
    issue: 'Issue returned after repair',
    aiSummary:
      'Customer reports the same AC problem after returning once already.',
    aiDraftReply:
      'Subject: Re: Your AC Repair Follow-up — Victoria Island\n\nDear Ms. Lawal,\n\nWe are sorry the AC issue has returned after your previous visit. A manager will review the repair history and arrange the next steps with you.\n\nThe Victoria Island Team',
    responseSent: false,
    alertAcknowledged: false,
    confidence: 0.98,
    source: 'Gmail',
  },
  {
    customerName: 'Emeka Obi',
    customerEmail: 'emeka.obi@example.com',
    location: 'Surulere',
    service: 'Wheel Alignment',
    originalMessage: 'Not bad, but I waited longer than expected.',
    sentiment: 'neutral',
    sentimentScore: 0.05,
    severity: 'low',
    severityScore: 0.18,
    isRepeatNegative: false,
    route: 'private_queue',
    category: 'Customer experience',
    theme: 'Service delays',
    issue: 'Longer wait than expected',
    aiSummary:
      'Customer was broadly neutral but noted a longer-than-expected wait.',
    aiDraftReply: '',
    responseSent: false,
    alertAcknowledged: false,
    confidence: 0.74,
    source: 'Gmail',
  },
  {
    customerName: 'Grace Okoye',
    customerEmail: 'grace.okoye@example.com',
    location: 'Lekki',
    service: 'Engine Diagnostics',
    originalMessage: 'I am not sure what to say. It was okay I guess.',
    sentiment: 'neutral',
    sentimentScore: 0.01,
    severity: 'low',
    severityScore: 0.1,
    isRepeatNegative: false,
    route: 'needs_review',
    category: 'Unclear',
    theme: 'Unclear feedback',
    issue: 'Low-confidence response',
    aiSummary:
      'The reply is too ambiguous to confidently classify beyond neutral.',
    aiDraftReply: '',
    responseSent: false,
    alertAcknowledged: false,
    confidence: 0.42,
    source: 'Gmail',
  },
]

const extra = [
  ['Femi Ojo', 'Lekki', 'Oil Change', 'positive', 0.79, 'Staff professionalism', 'Helpful staff', 'Service quality'],
  ['Joy Amaka', 'Ikeja', 'AC Repair', 'negative', -0.49, 'Service delays', 'Delayed pickup', 'Customer experience'],
  ['Samuel Peter', 'Yaba', 'Brake Service', 'positive', 0.74, 'Service quality', 'Brake repair success', 'Service quality'],
  ['Adaeze Obi', 'Victoria Island', 'Full Service', 'negative', -0.88, 'Vehicle damage', 'Paint scuff after service', 'Service quality'],
  ['Kunmi Shola', 'Surulere', 'Oil Change', 'positive', 0.81, 'Convenience', 'Easy booking', 'Customer experience'],
  ['Victor Eze', 'Lekki', 'Wheel Alignment', 'negative', -0.56, 'Pricing transparency', 'Unexpected charge', 'Pricing'],
  ['Mary James', 'Ikeja', 'Engine Diagnostics', 'positive', 0.69, 'Fast resolution', 'Quick diagnosis', 'Service quality'],
  ['Chuka Nnamani', 'Yaba', 'AC Repair', 'negative', -0.72, 'Repeat repair failure', 'AC failed again', 'Service quality'],
  ['Halima Musa', 'Victoria Island', 'Brake Service', 'positive', 0.93, 'Staff professionalism', 'Clear explanation', 'Service quality'],
  ['Daniel Akin', 'Surulere', 'Full Service', 'negative', -0.33, 'Service delays', 'Late completion', 'Customer experience'],
  ['Ruth Adebayo', 'Lekki', 'AC Repair', 'positive', 0.87, 'Fast resolution', 'Quick AC repair', 'Service quality'],
  ['Tope Balogun', 'Ikeja', 'Oil Change', 'negative', -0.67, 'Service delays', 'Repeated delay', 'Customer experience'],
  ['Nneka Ibe', 'Yaba', 'Wheel Alignment', 'neutral', 0.12, 'Unclear feedback', 'Ambiguous reply', 'Unclear'],
  ['Moses Bello', 'Victoria Island', 'Engine Diagnostics', 'positive', 0.77, 'Staff professionalism', 'Technician expertise', 'Service quality'],
  ['Fatima Sule', 'Surulere', 'Brake Service', 'negative', -0.91, 'Vehicle damage', 'Wheel damage after service', 'Service quality'],
  ['Olamide Ade', 'Lekki', 'Full Service', 'positive', 0.71, 'Convenience', 'Smooth pickup', 'Customer experience'],
  ['Tayo Ibrahim', 'Ikeja', 'AC Repair', 'negative', -0.46, 'Pricing transparency', 'Repair estimate mismatch', 'Pricing'],
  ['Esther Udo', 'Yaba', 'Oil Change', 'positive', 0.84, 'Fast resolution', 'Quick service', 'Service quality'],
  ['Kabiru Ali', 'Victoria Island', 'Full Service', 'negative', -0.79, 'Repeat repair failure', 'Same warning light', 'Service quality'],
  ['Seyi Ade', 'Surulere', 'Engine Diagnostics', 'positive', 0.82, 'Staff professionalism', 'Helpful diagnosis', 'Service quality'],
]

function id(i: number) {
  return `FB-${1790678595000 + i * 137}-0V${String.fromCharCode(
    65 + (i % 26)
  )}U`
}

const completeRows: Feedback[] = rows.map(
  (row, i): Feedback => ({
    ...row,
    feedbackId: id(i),
    receivedAt: new Date(
      Date.now() - (i + 1) * 6 * 3600 * 1000
    ).toISOString(),
    status:
      row.route === 'manager_alert'
        ? 'open'
        : row.route === 'needs_review'
        ? 'review'
        : 'unsent',
  })
)

export const mockFeedback: Feedback[] = [
  ...completeRows,

  ...extra.map((r, i): Feedback => {
    const [
      customerName,
      location,
      service,
      sentiment,
      score,
      theme,
      issue,
      category,
    ] = r as [
      string,
      string,
      string,
      string,
      number,
      string,
      string,
      string
    ]

    const negative = sentiment === 'negative'

    const repeat =
      negative && [3, 7, 11, 18].includes(i)

    const high =
      negative && (Math.abs(score) > 0.78 || repeat)

    const route =
      !negative && sentiment === 'positive'
        ? 'ready_to_post'
        : negative && (high || repeat)
        ? 'manager_alert'
        : negative
        ? 'private_queue'
        : 'needs_review'

    const severity =
      high
        ? 'high'
        : negative && Math.abs(score) > 0.45
        ? 'medium'
        : 'low'

    const confidence =
      sentiment === 'neutral'
        ? 0.62
        : 0.93 + (i % 5) / 100

    return {
      feedbackId: id(i + 20),

      receivedAt: new Date(
        Date.now() - (i + 2) * 9 * 3600 * 1000
      ).toISOString(),

      customerName,

      customerEmail: `${customerName
        .toLowerCase()
        .replace(/\s+/g, '.')}@example.com`,

      location,

      service,

      originalMessage: negative
        ? `Customer reports an issue with ${issue.toLowerCase()} and would like the team to address the experience.`
        : sentiment === 'positive'
        ? `Customer praised the ${theme.toLowerCase()} during their ${service.toLowerCase()} visit.`
        : `Customer response is brief and somewhat unclear about the ${service.toLowerCase()} experience.`,

      sentiment: sentiment as Feedback['sentiment'],

      sentimentScore: score,

      severity: severity as Feedback['severity'],

      severityScore: high
        ? 0.84
        : negative
        ? 0.42
        : 0.08,

      isRepeatNegative: repeat,

      route: route as Feedback['route'],

      category,

      theme,

      issue,

      aiSummary: `${
        negative
          ? 'Customer raised a concern about'
          : sentiment === 'positive'
          ? 'Customer praised'
          : 'Customer gave mixed feedback on'
      } ${issue.toLowerCase()}.`,

      aiDraftReply: negative
        ? `Subject: Re: Your Recent ${service} Visit — ${location} Location

Dear ${customerName.split(' ')[0]},

Thank you for sharing this with us. We are sorry your experience did not meet expectations. Our team will review the details you raised and follow up with the appropriate next steps.

The ${location} Team`
        : '',

      responseSent: false,

      alertAcknowledged:
        route !== 'manager_alert',

      confidence,

      status:
        route === 'manager_alert'
          ? 'open'
          : route === 'ready_to_post'
          ? 'unsent'
          : route === 'needs_review'
          ? 'review'
          : 'unsent',

      source: 'Gmail',
    }
  }),
]

export function cloneMockData() {
  return structuredClone(mockFeedback)
}
