import Common "common";

module {
  public type ProjectId = Common.ProjectId;
  public type Timestamp = Common.Timestamp;

  public type Project = {
    id : ProjectId;
    title : Text;
    description : Text;
    tags : [Text];
    videoUrl : Text;
    githubLink : Text;
    kaggleLink : Text;
    thumbnailUrl : Text;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  public type ProjectInput = {
    title : Text;
    description : Text;
    tags : [Text];
    videoUrl : Text;
    githubLink : Text;
    kaggleLink : Text;
    thumbnailUrl : Text;
  };
};
