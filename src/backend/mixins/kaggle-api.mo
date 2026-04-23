import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/kaggle";
import KaggleLib "../lib/kaggle";

mixin (
  accessControlState : AccessControl.AccessControlState,
  kaggleStatsState : { var stats : ?Types.KaggleStats },
  kaggleNotebookStore : List.List<Types.KaggleNotebook>,
  nextKaggleNotebookId : { var value : Nat },
) {
  public shared ({ caller }) func setKaggleStats(stats : Types.KaggleStats) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update Kaggle stats");
    };
    kaggleStatsState.stats := ?stats;
  };

  public query func getKaggleStats() : async ?Types.KaggleStats {
    kaggleStatsState.stats;
  };

  public shared ({ caller }) func addKaggleNotebook(input : Types.KaggleNotebookInput) : async Types.KaggleNotebook {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add Kaggle notebooks");
    };
    let id = nextKaggleNotebookId.value;
    nextKaggleNotebookId.value += 1;
    KaggleLib.addNotebook(kaggleNotebookStore, input, id);
  };

  public shared ({ caller }) func updateKaggleNotebook(id : Types.KaggleNotebookId, input : Types.KaggleNotebookInput) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update Kaggle notebooks");
    };
    KaggleLib.updateNotebook(kaggleNotebookStore, id, input);
  };

  public shared ({ caller }) func deleteKaggleNotebook(id : Types.KaggleNotebookId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete Kaggle notebooks");
    };
    KaggleLib.deleteNotebook(kaggleNotebookStore, id);
  };

  public query func getKaggleNotebooks() : async [Types.KaggleNotebook] {
    KaggleLib.getAllNotebooks(kaggleNotebookStore);
  };
};
