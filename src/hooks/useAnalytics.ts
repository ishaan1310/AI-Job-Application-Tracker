import { useMemo } from 'react';
import { JobApplication, Analytics } from '../types';
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

export const useAnalytics = (applications: JobApplication[]): Analytics => {
  return useMemo(() => {
    const now = new Date();
    const currentMonth = startOfMonth(now);
    const currentMonthEnd = endOfMonth(now);

    // Total applications
    const totalApplications = applications.length;

    // Applications this month
    const applicationsThisMonth = applications.filter(app =>
      isWithinInterval(app.createdAt, { start: currentMonth, end: currentMonthEnd })
    ).length;

    // Interview rate (applications that reached interviewing stage)
    const interviewingApps = applications.filter(app => 
      ['interviewing', 'offer', 'hired'].includes(app.status)
    );
    const interviewRate = totalApplications > 0 ? (interviewingApps.length / totalApplications) * 100 : 0;

    // Offer rate
    const offerApps = applications.filter(app => ['offer', 'hired'].includes(app.status));
    const offerRate = totalApplications > 0 ? (offerApps.length / totalApplications) * 100 : 0;

    // Average response time (mock data)
    const avgResponseTime = 7; // days

    // Top companies
    const companyCount = applications.reduce((acc, app) => {
      acc[app.company] = (acc[app.company] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topCompanies = Object.entries(companyCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    // Status distribution
    const statusCount = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const statusDistribution = Object.entries(statusCount).map(([status, count]) => ({
      status: status as any,
      count,
    }));

    // Monthly trend (last 6 months)
    const monthlyTrend = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(now, i));
      const monthEnd = endOfMonth(subMonths(now, i));
      const monthName = format(monthStart, 'MMM');

      const monthApplications = applications.filter(app =>
        isWithinInterval(app.createdAt, { start: monthStart, end: monthEnd })
      );

      const monthInterviews = monthApplications.filter(app =>
        ['interviewing', 'offer', 'hired'].includes(app.status)
      );

      const monthOffers = monthApplications.filter(app =>
        ['offer', 'hired'].includes(app.status)
      );

      monthlyTrend.push({
        month: monthName,
        applications: monthApplications.length,
        interviews: monthInterviews.length,
        offers: monthOffers.length,
      });
    }

    return {
      totalApplications,
      applicationsThisMonth,
      interviewRate,
      offerRate,
      avgResponseTime,
      topCompanies,
      statusDistribution,
      monthlyTrend,
    };
  }, [applications]);
};