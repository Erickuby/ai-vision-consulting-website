export type CaseStudy = {
  id: string;
  sector: string | null;
  organisationSize: string | null;
  delivered: string | null;
  problem: string[];
  work: string[];
  task: string | null;
  beforeMinutes: number | null;
  afterMinutes: number | null;
  peopleTrained: number | null;
  frequency: string | null;
  monthlyHoursReturned: number | null;
  measurementMethod: string | null;
  whatDidNotWork: string | null;
  quote: string | null;
  publicationApproved: boolean;
};

// PLACEHOLDER: Eric must supply measured facts and permission for each entry.
export const caseStudies: CaseStudy[] = ['case-study-1', 'case-study-2', 'case-study-3'].map(id => ({
  id, sector: null, organisationSize: null, delivered: null, problem: [], work: [],
  task: null, beforeMinutes: null, afterMinutes: null, peopleTrained: null,
  frequency: null, monthlyHoursReturned: null, measurementMethod: null,
  whatDidNotWork: null, quote: null, publicationApproved: false,
}));

export function caseStudyReady(study: CaseStudy) {
  const required = [study.sector, study.organisationSize, study.delivered, study.task, study.frequency, study.measurementMethod, study.whatDidNotWork, study.quote];
  return study.publicationApproved && required.every(value => typeof value === 'string' && value.trim())
    && study.problem.length === 2 && study.work.length === 3
    && [...study.problem, ...study.work].every(value => value.trim())
    && [study.beforeMinutes, study.afterMinutes, study.peopleTrained, study.monthlyHoursReturned].every(value => typeof value === 'number' && Number.isFinite(value) && value >= 0)
    && Number.isInteger(study.peopleTrained) && study.peopleTrained! > 0;
}
