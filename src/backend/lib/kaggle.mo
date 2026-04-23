import List "mo:core/List";
import Types "../types/kaggle";

module {
  public type NotebookStore = List.List<Types.KaggleNotebook>;

  public func addNotebook(store : NotebookStore, input : Types.KaggleNotebookInput, id : Types.KaggleNotebookId) : Types.KaggleNotebook {
    let notebook : Types.KaggleNotebook = {
      id;
      title = input.title;
      description = input.description;
      notebookUrl = input.notebookUrl;
      votes = input.votes;
      views = input.views;
      tags = input.tags;
    };
    store.add(notebook);
    notebook;
  };

  public func updateNotebook(store : NotebookStore, id : Types.KaggleNotebookId, input : Types.KaggleNotebookInput) : Bool {
    var found = false;
    store.mapInPlace(func(n) {
      if (n.id == id) {
        found := true;
        { n with
          title = input.title;
          description = input.description;
          notebookUrl = input.notebookUrl;
          votes = input.votes;
          views = input.views;
          tags = input.tags;
        };
      } else { n };
    });
    found;
  };

  public func deleteNotebook(store : NotebookStore, id : Types.KaggleNotebookId) : Bool {
    let sizeBefore = store.size();
    let remaining = store.filter(func(n) { n.id != id });
    store.clear();
    store.append(remaining);
    store.size() < sizeBefore;
  };

  public func getAllNotebooks(store : NotebookStore) : [Types.KaggleNotebook] {
    store.toArray();
  };
};
