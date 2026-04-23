import List "mo:core/List";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import ProjectTypes "types/projects";
import ProfileTypes "types/profile";
import BlogTypes "types/blog";
import KaggleTypes "types/kaggle";
import ProjectsMixin "mixins/projects-api";
import ProfileMixin "mixins/profile-api";
import SkillsMixin "mixins/skills-api";
import BlogMixin "mixins/blog-api";
import KaggleMixin "mixins/kaggle-api";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Projects state
  let projectStore = List.empty<ProjectTypes.Project>();
  let nextProjectIdBox = { var value = 0 };
  include ProjectsMixin(accessControlState, projectStore, nextProjectIdBox);

  // Profile state
  let profileState = {
    var profile : ?ProfileTypes.Profile = ?{
      name = "ML Engineer";
      title = "Applied ML Engineer & AI Researcher";
      bio = "Passionate about building intelligent systems. Experienced in computer vision, NLP, and MLOps. Open to exciting opportunities in applied AI and ML engineering.";
      socialLinks = {
        linkedin = "https://linkedin.com/in/yourprofile";
        github = "https://github.com/yourusername";
        kaggle = "https://kaggle.com/yourusername";
        email = "you@example.com";
      };
    };
  };
  include ProfileMixin(accessControlState, profileState);

  // Skills state
  let skillsState = {
    var skills : [Text] = [
      "Python", "TensorFlow", "PyTorch", "Scikit-learn",
      "NLP", "Computer Vision", "MLOps", "Pandas", "NumPy", "Jupyter",
    ];
  };
  include SkillsMixin(accessControlState, skillsState);

  // Blog state
  let blogStore = List.empty<BlogTypes.BlogPost>();
  let nextBlogPostIdBox = { var value = 0 };
  include BlogMixin(accessControlState, blogStore, nextBlogPostIdBox);

  // Kaggle state
  let kaggleStatsState = { var stats : ?KaggleTypes.KaggleStats = null };
  let kaggleNotebookStore = List.empty<KaggleTypes.KaggleNotebook>();
  let nextKaggleNotebookIdBox = { var value = 0 };
  include KaggleMixin(accessControlState, kaggleStatsState, kaggleNotebookStore, nextKaggleNotebookIdBox);

  // Seed 3 sample ML/AI projects on first deploy
  ignore do {
    let now = Time.now();
    projectStore.add({
      id = 0;
      title = "Real-Time Object Detection System";
      description = "End-to-end computer vision pipeline using YOLOv8 for real-time object detection. Trained on custom dataset with 20+ classes, achieving 92% mAP. Deployed with ONNX runtime for edge inference.";
      tags = ["Computer Vision", "YOLOv8", "ONNX", "PyTorch", "Python"];
      videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
      githubLink = "https://github.com/yourusername/object-detection";
      kaggleLink = "";
      thumbnailUrl = "";
      createdAt = now - 7_776_000_000_000_000;
      updatedAt = now - 7_776_000_000_000_000;
    });
    projectStore.add({
      id = 1;
      title = "Sentiment Analysis at Scale";
      description = "Fine-tuned BERT model for multi-class sentiment analysis on product reviews. Processed 1M+ reviews using HuggingFace Transformers and deployed via FastAPI with sub-50ms inference latency.";
      tags = ["NLP", "BERT", "HuggingFace", "FastAPI", "Python"];
      videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
      githubLink = "https://github.com/yourusername/sentiment-analysis";
      kaggleLink = "";
      thumbnailUrl = "";
      createdAt = now - 5_184_000_000_000_000;
      updatedAt = now - 5_184_000_000_000_000;
    });
    projectStore.add({
      id = 2;
      title = "Kaggle: House Price Prediction — Top 5%";
      description = "Ensemble model combining XGBoost, LightGBM, and stacked regressors for the Kaggle House Prices competition. Feature engineering, cross-validation, and hyperparameter tuning led to a top 5% leaderboard finish.";
      tags = ["XGBoost", "LightGBM", "Feature Engineering", "Scikit-learn", "Kaggle"];
      videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
      githubLink = "https://github.com/yourusername/house-prices";
      kaggleLink = "https://kaggle.com/yourusername/house-prices";
      thumbnailUrl = "";
      createdAt = now - 2_592_000_000_000_000;
      updatedAt = now - 2_592_000_000_000_000;
    });
    nextProjectIdBox.value := 3;
  };
};
