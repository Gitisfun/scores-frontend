import { ApiCalls } from "../apiCalls";
import { getAllGamesByLeague } from "../routes/games";
import { getRanking } from "../routes/ranking";

class LeagueController {
  static get(context, params, callback) {
    // context.isLoading = true;
    ApiCalls.getMultiple(
      [getAllGamesByLeague(params), getRanking(params)],
      callback,
      context
    );
  }
}

export default LeagueController;
