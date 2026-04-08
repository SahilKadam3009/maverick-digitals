import List "mo:core/List";
import ContactLib "../lib/contact";
import ContactTypes "../types/contact";

mixin (
  submissions : List.List<ContactTypes.ContactSubmission>,
  nextContactId : [var Nat],
) {
  public shared func submitContact(
    name : Text,
    email : Text,
    serviceType : ContactTypes.ServiceType,
    message : Text,
  ) : async Nat {
    let id = ContactLib.submit(submissions, nextContactId[0], name, email, serviceType, message);
    nextContactId[0] += 1;
    id;
  };

  public shared query func getContacts() : async [ContactTypes.ContactSubmission] {
    ContactLib.getAll(submissions);
  };
};
