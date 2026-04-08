import Common "common";

module {
  public type ServiceType = Text;

  public type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    serviceType : ServiceType;
    message : Text;
    submittedAt : Common.Timestamp;
  };
};
