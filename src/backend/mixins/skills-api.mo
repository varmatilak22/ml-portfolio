import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import SkillsLib "../lib/skills";

mixin (
  accessControlState : AccessControl.AccessControlState,
  skillsState : { var skills : [Text] },
) {
  public shared ({ caller }) func setSkills(skills : [Text]) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update skills");
    };
    skillsState.skills := SkillsLib.setSkills(skills);
  };

  public query func getSkills() : async [Text] {
    SkillsLib.getSkills(skillsState.skills);
  };
};
