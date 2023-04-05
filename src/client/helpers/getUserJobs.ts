async function getUserJobs(userId: number) {
  try {
    const data = await fetch(`/api/users/applications/${userId}`);
    const parsedData = data.json();
    return parsedData;
  } catch (error) {
    console.log('Unable to get user jobs ', error);
  }
}
//import getUserJobs from '../helpers/getUserJobs';
export default getUserJobs;
