import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/mock/ai/call-screen
 * 
 * AI-powered call screening analysis (mock)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateId, transcript, role } = body;

    if (!transcript) {
      return NextResponse.json(
        { error: 'invalid_request', message: 'transcript is required' },
        { status: 400 }
      );
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock AI analysis of call transcript
    const analysis = analyzeTranscript(transcript);

    return NextResponse.json({
      candidateId,
      role: role || 'General',
      screening_result: {
        communication_score: analysis.communicationScore,
        technical_score: analysis.technicalScore,
        fit: analysis.fit,
        recommendation: analysis.recommendation,
        key_observations: analysis.observations,
        red_flags: analysis.redFlags,
        next_steps: analysis.nextSteps,
      },
      processed_at: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'server_error', message: 'Failed to analyze call' },
      { status: 500 }
    );
  }
}

function analyzeTranscript(transcript: string): {
  communicationScore: number;
  technicalScore: number;
  fit: string;
  recommendation: string;
  observations: string[];
  redFlags: string[];
  nextSteps: string[];
} {
  const transcriptLower = transcript.toLowerCase();
  
  // Calculate communication score based on length and clarity indicators
  let communicationScore = 70;
  if (transcript.length > 500) communicationScore += 10;
  if (transcriptLower.includes('team') || transcriptLower.includes('collaboration')) {
    communicationScore += 5;
  }
  if (transcriptLower.includes('project') || transcriptLower.includes('delivered')) {
    communicationScore += 5;
  }
  communicationScore = Math.min(communicationScore, 100);

  // Calculate technical score based on keywords
  let technicalScore = 65;
  const technicalKeywords = ['api', 'database', 'code', 'development', 'architecture', 'system'];
  for (const keyword of technicalKeywords) {
    if (transcriptLower.includes(keyword)) {
      technicalScore += 5;
    }
  }
  technicalScore = Math.min(technicalScore, 100);

  // Determine fit
  const avgScore = (communicationScore + technicalScore) / 2;
  let fit: string;
  if (avgScore >= 80) {
    fit = 'Strong';
  } else if (avgScore >= 65) {
    fit = 'Potential';
  } else {
    fit = 'Needs Review';
  }

  // Generate recommendation
  const recommendation = fit === 'Strong'
    ? 'Candidate demonstrates excellent communication and technical understanding. Recommend proceeding to next interview stage.'
    : fit === 'Potential'
    ? 'Candidate shows promise with solid conceptual understanding. Recommend additional technical interview to assess depth.'
    : 'Candidate may need further evaluation. Consider follow-up screening or alternative role matching.';

  const observations = [
    'Candidate articulated previous experience clearly',
    'Showed understanding of role requirements',
    'Asked relevant questions about the position',
  ];

  const redFlags: string[] = [];
  if (transcriptLower.includes('salary') && transcript.length < 200) {
    redFlags.push('Early focus on compensation before role discussion');
  }

  const nextSteps = fit === 'Strong'
    ? ['Schedule technical interview', 'Prepare coding assessment', 'Share with hiring manager']
    : ['Additional phone screen', 'Skills assessment', 'Reference check'];

  return {
    communicationScore,
    technicalScore,
    fit,
    recommendation,
    observations,
    redFlags,
    nextSteps,
  };
}
