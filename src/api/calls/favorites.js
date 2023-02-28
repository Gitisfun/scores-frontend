import { ApiCalls } from "../apiCalls";
import { getAllClubs } from "../routes/clubs";

class FavoritesController {
  static get(context, params, callback) {
    ApiCalls.get(getAllClubs, params, callback, context);
  }
}

export default FavoritesController;
