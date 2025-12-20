import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/mock/ai/resume-analyze
 * 
 * AI-powered resume analysis (mock)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateId, resumeText, targetRole, language } = body;

    if (!resumeText) {
      return NextResponse.json(
        { error: 'invalid_request', message: 'resumeText is required' },
        { status: 400 }
      );
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock AI response based on resume content
    const skills = extractSkillsFromText(resumeText);
    const experienceYears = extractExperienceFromText(resumeText);
    const fitScore = calculateFitScore(skills, targetRole);

    return NextResponse.json({
      candidateId,
      targetRole: targetRole || 'General',
      analysis: {
        top_skills: skills.slice(0, 5),
        fit_score: fitScore,
        suggested_experience_years: experienceYears,
        summary: generateSummary(skills, experienceYears, targetRole),
        strengths: generateStrengths(skills),
        areas_for_improvement: ['Leadership experience', 'Project management'],
      },
      processed_at: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'server_error', message: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}

function extractSkillsFromText(text: string): string[] {
  // Mock skill extraction
  const commonSkills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
    'Java', 'SQL', 'AWS', 'Docker', 'Kubernetes', 'Git',
    'Agile', 'Scrum', 'Communication', 'Leadership'
  ];
  
  const textLower = text.toLowerCase();
  const foundSkills = commonSkills.filter(skill => 
    textLower.includes(skill.toLowerCase())
  );

  // Return at least some default skills if none found
  if (foundSkills.length === 0) {
    return ['JavaScript', 'React', 'Communication'];
  }
  
  return foundSkills;
}

function extractExperienceFromText(text: string): number {
  // Mock experience extraction
  const yearsMatch = text.match(/(\d+)\s*(?:years?|yrs?)/i);
  if (yearsMatch) {
    return Math.min(parseInt(yearsMatch[1], 10), 20);
  }
  return 3; // Default
}

function calculateFitScore(skills: string[], targetRole?: string): number {
  // Mock fit score calculation
  const baseScore = 60;
  const skillBonus = Math.min(skills.length * 5, 30);
  const roleBonus = targetRole ? 5 : 0;
  return Math.min(baseScore + skillBonus + roleBonus, 100);
}

function generateSummary(skills: string[], years: number, role?: string): string {
  const skillList = skills.slice(0, 3).join(', ');
  const roleText = role ? ` for the ${role} position` : '';
  return `Candidate shows ${years} years of experience with strong skills in ${skillList}. Good potential fit${roleText}.`;
}

function generateStrengths(skills: string[]): string[] {
  const strengths: string[] = [];
  
  if (skills.includes('React') || skills.includes('JavaScript')) {
    strengths.push('Strong frontend development skills');
  }
  if (skills.includes('Node.js') || skills.includes('Python')) {
    strengths.push('Backend development experience');
  }
  if (skills.includes('AWS') || skills.includes('Docker')) {
    strengths.push('Cloud and DevOps knowledge');
  }
  if (skills.includes('Communication') || skills.includes('Leadership')) {
    strengths.push('Good soft skills');
  }
  
  return strengths.length > 0 ? strengths : ['Technical aptitude', 'Learning ability'];
}
