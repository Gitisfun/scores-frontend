import { ApiCalls } from "../apiCalls";
import { getClub } from "../routes/clubs";
import { getRanking } from "../routes/ranking";

class MatchController {
  static get(context, params, callback) {
    // context.isLoading = true;
    // ApiCalls.get(getClub, params, callback, context);
    const { firstParam, secondParam } = params;
    ApiCalls.getMultiple(
      [getClub(firstParam), getRanking(secondParam)],
      callback,
      context
    );
  }
}

export default MatchController;
