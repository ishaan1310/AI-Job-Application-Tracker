import { useState, useEffect } from 'react';
import { JobApplication, JobStatus } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export const useJobApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchApplications();
    } else {
      setApplications([]);
      setLoading(false);
    }
  }, [user]);

  const fetchApplications = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        return;
      }

      const formattedApplications: JobApplication[] = data.map(app => ({
        id: app.id,
        userId: app.user_id,
        jobTitle: app.job_title,
        company: app.company,
        location: app.location,
        salary: app.salary,
        salaryMax: app.salary_max,
        jobUrl: app.job_url,
        description: app.description,
        status: app.status as JobStatus,
        appliedDate: app.applied_date ? new Date(app.applied_date) : undefined,
        deadlineDate: app.deadline_date ? new Date(app.deadline_date) : undefined,
        notes: app.notes || '',
        tags: app.tags || [],
        resumeId: app.resume_id,
        coverLetterId: app.cover_letter_id,
        contactPerson: app.contact_person,
        contactEmail: app.contact_email,
        followUpDate: app.follow_up_date ? new Date(app.follow_up_date) : undefined,
        interviewDates: app.interview_dates?.map((date: string) => new Date(date)) || [],
        aiMatchScore: app.ai_match_score,
        skillGaps: app.skill_gaps || [],
        createdAt: new Date(app.created_at),
        updatedAt: new Date(app.updated_at),
      }));

      setApplications(formattedApplications);
    } catch (error) {
      console.error('Error in fetchApplications:', error);
    } finally {
      setLoading(false);
    }
  };

  const addApplication = async (application: Omit<JobApplication, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('job_applications')
        .insert({
          user_id: user.id,
          job_title: application.jobTitle,
          company: application.company,
          location: application.location,
          salary: application.salary,
          salary_max: application.salaryMax,
          job_url: application.jobUrl,
          description: application.description,
          status: application.status,
          applied_date: application.appliedDate?.toISOString(),
          deadline_date: application.deadlineDate?.toISOString(),
          notes: application.notes,
          tags: application.tags,
          resume_id: application.resumeId,
          cover_letter_id: application.coverLetterId,
          contact_person: application.contactPerson,
          contact_email: application.contactEmail,
          follow_up_date: application.followUpDate?.toISOString(),
          interview_dates: application.interviewDates.map(date => date.toISOString()),
          ai_match_score: application.aiMatchScore,
          skill_gaps: application.skillGaps,
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding application:', error);
        return;
      }

      // Refresh applications
      await fetchApplications();
    } catch (error) {
      console.error('Error in addApplication:', error);
    }
  };

  const updateApplication = async (id: string, updates: Partial<JobApplication>) => {
    if (!user) return;

    try {
      const dbUpdates = {
        job_title: updates.jobTitle,
        company: updates.company,
        location: updates.location,
        salary: updates.salary,
        salary_max: updates.salaryMax,
        job_url: updates.jobUrl,
        description: updates.description,
        status: updates.status,
        applied_date: updates.appliedDate?.toISOString(),
        deadline_date: updates.deadlineDate?.toISOString(),
        notes: updates.notes,
        tags: updates.tags,
        resume_id: updates.resumeId,
        cover_letter_id: updates.coverLetterId,
        contact_person: updates.contactPerson,
        contact_email: updates.contactEmail,
        follow_up_date: updates.followUpDate?.toISOString(),
        interview_dates: updates.interviewDates?.map(date => date.toISOString()),
        ai_match_score: updates.aiMatchScore,
        skill_gaps: updates.skillGaps,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('job_applications')
        .update(dbUpdates)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating application:', error);
        return;
      }

      // Refresh applications
      await fetchApplications();
    } catch (error) {
      console.error('Error in updateApplication:', error);
    }
  };

  const deleteApplication = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting application:', error);
        return;
      }

      // Refresh applications
      await fetchApplications();
    } catch (error) {
      console.error('Error in deleteApplication:', error);
    }
  };

  const duplicateApplication = async (id: string) => {
    const original = applications.find(app => app.id === id);
    if (original && user) {
      const duplicate = {
        ...original,
        jobTitle: `${original.jobTitle} (Copy)`,
        status: 'saved' as JobStatus,
        appliedDate: undefined,
        interviewDates: [],
      };
      
      // Remove fields that shouldn't be duplicated
      const { id: _, userId: __, createdAt: ___, updatedAt: ____, ...duplicateData } = duplicate;
      
      await addApplication(duplicateData);
    }
  };

  return {
    applications,
    loading,
    addApplication,
    updateApplication,
    deleteApplication,
    duplicateApplication,
    refreshApplications: fetchApplications,
  };
};