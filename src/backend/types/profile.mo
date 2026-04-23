module {
  public type SocialLinks = {
    linkedin : Text;
    github : Text;
    kaggle : Text;
    email : Text;
  };

  public type Profile = {
    name : Text;
    title : Text;
    bio : Text;
    socialLinks : SocialLinks;
  };
};
