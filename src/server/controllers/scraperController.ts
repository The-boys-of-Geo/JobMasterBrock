import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { load } from 'cheerio';
import { html } from 'cheerio/lib/static';
const scraperController: any = {};

type scrapedInfoType = scrapedInfoData[];
interface scrapedInfoData {
  Title: String;
  Company: String;
  Location: String;
  Link: String;
  DatePosted: String;
  TimePosted: String;
  ID: String;
  Salary?: String;
}

//****** Scrape Data ******//
scraperController.scrapeJobListings = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const scrapedInfo: scrapedInfoType = [];
    let jobType = {
      FT: false,
      PT: true,
      C: false,
      I: false,
    };
    /**
     * body = {
     * search: 'Software Engineer'
     * location: 'United States'
     * time: 3600   <-- 1hr
     * count: 0 <-- where you are in the search results. First one is 0 and increment by 1 each time
     * jobType = {
      FT: false,
      PT: true,
      C: false,
      I: false,
    };
     * }
     */
    //TODO add jobType to req.body
    const { search, location, time, count } = req.body;
    //www.linkedin.com/jobs/search?keywords=Software%20Engineer&location=United%20States&sortBy=R&f_TPR=r86400&f_JT=F%2CP%2CC&position=1&pageNum=0
    // https: //www.linkedin.com/jobs/search?keywords=software%20engineer&location=United%20States&sortBy=R&f_TPR=r311040000&f_JT=%2CFT%2CPT%2CC%2CI&position=1&pageNum=0
    // f_JT=F%2CP%2CC%2CI%2CO
    // let url = 'https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=email%2Bdeveloper&location=United%2BStates&geoId=103644278&trk=public_jobs_jobs-search-bar_search-submit&currentJobId=2931031787&position=1&pageNum=0&start=0'
    // let url = 'https://www.linkedin.com/jobs/search?keywords=software%20engineer&location=United%20States&position=1&pageNum=0';
    const searchParsed = search.replaceAll(' ', '%20');
    const locationParsed = location.replaceAll(' ', '%20');
    const timeParsed = time;
    const countParsed = count * 25;
    let jobTypeParsed = '';
    let firstJobType = false;
    Object.keys(jobType).forEach((el) => {
      if (el) {
        if (!firstJobType) {
          firstJobType = true;
          jobTypeParsed += el;
        } else {
          jobTypeParsed += `%2C${el}`;
        }
      }
    });
    let url = `https://www.linkedin.com/jobs/search?keywords=${searchParsed}&location=${locationParsed}&sortBy=R&f_TPR=r${timeParsed}&f_JT=${jobTypeParsed}&position=1&pageNum=${countParsed}`;
    console.log('url: ', url);
    axios(url).then((response) => {
      const html = response.data;
      const $ = load(html);
      const jobs = $('li');
      jobs.each((index, element) => {
        const jobs = $(element)
          .find('h3.base-search-card__title')
          .text()
          .trim();
        const company = $(element)
          .find('h4.base-search-card__subtitle')
          .text()
          .trim();
        const location = $(element)
          .find('span.job-search-card__location')
          .text()
          .trim();
        const link = $(element).find('a.base-card__full-link').attr('href');
        const datePosted = $(element)
          .find('time.job-search-card__listdate--new')
          .attr('datetime');
        const timePosted = $(element)
          .find('time.job-search-card__listdate--new')
          .text()
          .trim();
        // "$43.00\n            -\n            $60.00"
        const salary = $(element)
          .find('span.job-search-card__salary-info')
          .text()
          .trim();
        const salaryParsed = salary.replaceAll('\n            ', '');
        const ID = $(element).find('div').attr('data-entity-urn');
        if (jobs !== '') {
          const IDindex = ID.lastIndexOf(':');
          const IDslice = ID.slice(IDindex + 1);
          scrapedInfo.push({
            Title: jobs,
            Company: company,
            Location: location,
            Link: link,
            DatePosted: datePosted,
            TimePosted: timePosted,
            ID: IDslice,
            Salary: salaryParsed,
          });
        }
      });
      res.locals.linkedInData = scrapedInfo;
      return next();
    });
  } catch (error) {
    const err = {
      log: `Error: not able to scrape LinkedIn URL, ${error}`,
      status: 404,
      message: {
        err: 'Error in scraperController.scrapeJobListings: Check server log for more details.',
      },
    };
    return next(err);
  }
};

scraperController.scrapeJobInfo = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { jobID } = req.params;
    //
    let url = `https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/${jobID}`;
    //
    axios(url).then((response) => {
      const html = response.data;
      //
      const $ = load(html);
      const jobData = $('div.show-more-less-html__markup ');
      res.locals.jobData = `${jobData.html()}`;
      return next();
    });
  } catch (error) {
    const err = {
      log: `Error: not able to scrape LinkedIn URL at jobID, ${error}`,
      status: 404,
      message: {
        err: 'Error in scraperController.scrapeJobInfo: Check server log for more details.',
      },
    };
    return next(err);
  }
};
export default scraperController;
