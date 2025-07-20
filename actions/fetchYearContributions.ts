
import { graphQL } from "./graphql";

export async function fetchYearContributions(
  username: string,
  year: number
): Promise<{ date: string; contributionCount: number }[]> {
  try {
    const query = `
      query ($user: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $user) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

    const startYear = `${year}-01-01T00:00:00Z`;
    const endYear = `${year}-12-31T23:59:59Z`;

    const data = await graphQL({query, variables: {user: username, from: startYear, to: endYear}});
    
    if (!data || !data.user || !data.user.contributionsCollection) {
      console.warn(`No contribution data found for user ${username} in year ${year}`);
      return [];
    }

    const weeks = data.user.contributionsCollection.contributionCalendar?.weeks || [];

    const contributionDays: {date: string, contributionCount: number}[] = [];

    weeks.forEach((week: any) => {
      if (week.contributionDays) {
        week.contributionDays.forEach((day: any) => {
          if (day && day.date && typeof day.contributionCount === 'number') {
            contributionDays.push({date: day.date, contributionCount: day.contributionCount});
          }
        });
      }
    });

    return contributionDays;
  } catch (error) {
    console.error(`Error fetching year contributions for ${username} in ${year}:`, error);
    return [];
  }
}
