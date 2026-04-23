module {
  public type KaggleNotebookId = Nat;

  public type KaggleMedals = {
    gold : Nat;
    silver : Nat;
    bronze : Nat;
  };

  public type KaggleStats = {
    username : Text;
    profileUrl : Text;
    rank : ?Text;
    totalNotebooks : Nat;
    totalCompetitions : Nat;
    totalDatasets : Nat;
    medals : KaggleMedals;
    bio : ?Text;
  };

  public type KaggleNotebook = {
    id : KaggleNotebookId;
    title : Text;
    description : Text;
    notebookUrl : Text;
    votes : ?Nat;
    views : ?Nat;
    tags : [Text];
  };

  public type KaggleNotebookInput = {
    title : Text;
    description : Text;
    notebookUrl : Text;
    votes : ?Nat;
    views : ?Nat;
    tags : [Text];
  };
};
