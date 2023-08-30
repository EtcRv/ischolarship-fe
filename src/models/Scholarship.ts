export type Scholarship = {
    id: string;
    name: string;
    image: string;
    organization: string;
    location: string;
    applyLocation?: string;
    ranking?: number;
    deadline: string;
    type: ScholarshipType;
    value?: string;
    level: DegreeType;
    field: string;
    link: string;
    requirement: Requirement;
    description: string;
}

export interface Score {
    CPA?: number;
    GraduationExam?: number;
    CompetencyAssessment?:number;
    SAT?: number;
    IELTS?: number;
    TOEIC?: number;
    TOELF?: number;
}

export interface Requirement {
    score: Score;
    competitions: boolean;
    experience: boolean;
    activities: string;
}

export enum ScholarshipType {
    ACADEMIC = 'Academic encouragement',
    GOVERNMENT = 'Government',
    FULL = 'Full-ride',
    TUITION = 'Tuition support',
    SHORTTERM = 'Short-term exchange',
    ORGANIZATIONS = 'Organizations',
    EXCHANGE = 'Exchange',
    FINANCIAL = 'Financial aid'
}

export enum DegreeType {
    INTERMEDIATE = 'Intermediate level',
    COLLEGE = 'College',
    UNIVERSITY = 'University',
    MASTER = 'Master',
    DOCTORAL = 'Doctoral'
}