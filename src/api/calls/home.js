import { shouldThrottle } from "../../logic/throttling";
import { ApiCalls } from "../apiCalls";
import { getDates } from "../routes/dates";
import { getAllGamesByRound } from "../routes/games";
import { getStatistics } from "../routes/statistics";

class HomeController {
  static get(context, params, callback) {
    context.isLoading = true;
    const apiCalls = [getDates(), getAllGamesByRound(params)];
    if (shouldThrottle()) apiCalls.push(getStatistics());
    ApiCalls.getMultiple(apiCalls, callback, context);
  }

  static getRound(context, params, callback) {
    ApiCalls.get(getAllGamesByRound, params, callback, context);
  }
}

export default HomeController;
