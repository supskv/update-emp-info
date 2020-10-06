import { AzureFunction, Context } from "@azure/functions";
const intercept = require("azure-function-log-intercept");

import { boostrap } from "./inport-script";

const timerTrigger: AzureFunction = async function (
  context: Context,
  myTimer: any
): Promise<void> {
  // Use console normally
  intercept(context);
  // Start Logging
  context.log(
    `> ${
      myTimer.isPastDue ? "[DELAY] " : ""
    }Start updating employee infomation on`,
    new Date().toISOString()
  );
  // start import script
  await boostrap();
  // End Logging
  context.log(`End updating employee infomation on`, new Date().toISOString());
};

export default timerTrigger;
