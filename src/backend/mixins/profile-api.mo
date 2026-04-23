import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/profile";
import ProfileLib "../lib/profile";

mixin (
  accessControlState : AccessControl.AccessControlState,
  profileState : { var profile : ?Types.Profile },
) {
  public shared ({ caller }) func setProfile(profile : Types.Profile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update the profile");
    };
    profileState.profile := ?ProfileLib.setProfile(profileState.profile, profile);
  };

  public query func getProfile() : async ?Types.Profile {
    ProfileLib.getProfile(profileState.profile);
  };
};
