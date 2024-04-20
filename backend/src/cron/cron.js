import cron from "cron";
import https from "https";

// const URL = "https://threads-clone-9if3.onrender.com";
// const URL = "https://localhost:3000";

const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(URL, (res) => {
      if (res.statusCode === 200) {
        console.log("GET request sent successfully");
      } else {
        console.log("GET request failed", res.statusCode);
      }
    })
    .on("error", (e) => {
      console.error("Error while sending request", e);
    });
});

export default job;

// CRON JOB EXPLANATION:
// Cron jobs are scheduled tasks that run periodically at fixed intervals or specific times
// send 1 GET request for every 14 minutes

// Schedule:
// You define a schedule using a cron expression, which consists of five fields representing:

//! MINUTE, HOUR, DAY OF THE MONTH, MONTH, DAY OF THE WEEK

//? EXAMPLES && EXPLANATION:
//* 14 * * * * - Every 14 minutes
//* 0 0 * * 0 - At midnight on every Sunday
//* 30 3 15 * * - At 3:30 AM, on the 15th of every month
//* 0 0 1 1 * - At midnight, on January 1st
//* 0 * * * * - Every hour
// *    *    *    *    *    *
// |    |    |    |    |    |
// |    |    |    |    |    +-- Day of week (0 - 7) (Sunday=0 or 7)
// |    |    |    |    +------ Month (1 - 12)
// |    |    |    +--------- Day of month (1 - 31)
// |    |    +------------ Hour (0 - 23)
// |    +--------------- Minute (0 - 59)
// +------------------ Second (optional, 0 - 59)
