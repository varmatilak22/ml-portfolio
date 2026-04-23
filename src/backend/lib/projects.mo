import List "mo:core/List";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Types "../types/projects";

module {
  public type ProjectStore = List.List<Types.Project>;

  public func addProject(store : ProjectStore, input : Types.ProjectInput, id : Types.ProjectId) : Types.Project {
    let now = Time.now();
    let project : Types.Project = {
      id;
      title = input.title;
      description = input.description;
      tags = input.tags;
      videoUrl = input.videoUrl;
      githubLink = input.githubLink;
      kaggleLink = input.kaggleLink;
      thumbnailUrl = input.thumbnailUrl;
      createdAt = now;
      updatedAt = now;
    };
    store.add(project);
    project;
  };

  public func updateProject(store : ProjectStore, id : Types.ProjectId, input : Types.ProjectInput) : Bool {
    let now = Time.now();
    var found = false;
    store.mapInPlace(func(p) {
      if (p.id == id) {
        found := true;
        { p with
          title = input.title;
          description = input.description;
          tags = input.tags;
          videoUrl = input.videoUrl;
          githubLink = input.githubLink;
          kaggleLink = input.kaggleLink;
          thumbnailUrl = input.thumbnailUrl;
          updatedAt = now;
        };
      } else { p };
    });
    found;
  };

  public func deleteProject(store : ProjectStore, id : Types.ProjectId) : Bool {
    let sizeBefore = store.size();
    let remaining = store.filter(func(p) { p.id != id });
    store.clear();
    store.append(remaining);
    store.size() < sizeBefore;
  };

  public func getProject(store : ProjectStore, id : Types.ProjectId) : ?Types.Project {
    store.find(func(p) { p.id == id });
  };

  public func getAllProjects(store : ProjectStore) : [Types.Project] {
    let arr = store.toArray();
    arr.sort(func(a : Types.Project, b : Types.Project) : Order.Order {
      if (a.createdAt > b.createdAt) { #less }
      else if (a.createdAt < b.createdAt) { #greater }
      else { #equal };
    });
  };
};
