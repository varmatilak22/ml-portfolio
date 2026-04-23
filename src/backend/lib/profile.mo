import Types "../types/profile";

module {
  public func setProfile(_current : ?Types.Profile, profile : Types.Profile) : Types.Profile {
    profile;
  };

  public func getProfile(current : ?Types.Profile) : ?Types.Profile {
    current;
  };
};
