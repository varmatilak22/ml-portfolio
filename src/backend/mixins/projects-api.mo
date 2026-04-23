import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/projects";
import ProjectLib "../lib/projects";

mixin (
  accessControlState : AccessControl.AccessControlState,
  projectStore : List.List<Types.Project>,
  nextProjectId : { var value : Nat },
) {
  public shared ({ caller }) func addProject(input : Types.ProjectInput) : async Types.Project {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add projects");
    };
    let id = nextProjectId.value;
    nextProjectId.value += 1;
    ProjectLib.addProject(projectStore, input, id);
  };

  public shared ({ caller }) func updateProject(id : Types.ProjectId, input : Types.ProjectInput) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update projects");
    };
    ProjectLib.updateProject(projectStore, id, input);
  };

  public shared ({ caller }) func deleteProject(id : Types.ProjectId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete projects");
    };
    ProjectLib.deleteProject(projectStore, id);
  };

  public query func getProject(id : Types.ProjectId) : async ?Types.Project {
    ProjectLib.getProject(projectStore, id);
  };

  public query func getProjects() : async [Types.Project] {
    ProjectLib.getAllProjects(projectStore);
  };
};
