import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/contact";

module {
  public func submit(
    submissions : List.List<Types.ContactSubmission>,
    nextId : Nat,
    name : Text,
    email : Text,
    serviceType : Types.ServiceType,
    message : Text,
  ) : Nat {
    let submission : Types.ContactSubmission = {
      id = nextId;
      name;
      email;
      serviceType;
      message;
      submittedAt = Time.now();
    };
    submissions.add(submission);
    nextId;
  };

  public func getAll(
    submissions : List.List<Types.ContactSubmission>,
  ) : [Types.ContactSubmission] {
    submissions.toArray();
  };
};
