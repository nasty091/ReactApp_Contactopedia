import React from "react";
import Header from "../Layout/Header";
import AddRandomContact from "./AddRandomCotact";
import RemoveAllContact from "./RemoveAllContact";
import AddContact from "./AddContact";
import FavoriteContacts from "./FavoriteContacts";
import GeneralContacts from "./GeneralContacts";
import Footer from "../Layout/Footer";

class ContactIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList: [
        {
          id: 1,
          name: "Dai An",
          phone: "113",
          email: "abc@gmail.com",
          isFavorite: false,
        },
        {
          id: 2,
          name: "Bong Lun",
          phone: "114",
          email: "bcd@gmail.com",
          isFavorite: true,
        },
        {
          id: 3,
          name: "Van A",
          phone: "115",
          email: "xvc@gmail.com",
          isFavorite: true,
        },
      ],
      selectedContact: undefined,
      isUpdating: false,
    };
  }

  handleAddContact = (newContact) => {
    if (newContact.name == "") {
      return { status: "failure", msg: "Please Enter a valid name" };
    } else if (newContact.phone == "") {
      return { status: "failure", msg: "Please Enter a valid name" };
    }

    const duplicateRecord = this.state.contactList.filter((x) => {
      if (x.name == newContact.name && x.phone == newContact.phone) {
        return true;
      }
    });

    if (duplicateRecord.length > 0) {
      return { status: "failure", msg: "Duplicate Record" };
    } else {
      const newFinalContact = {
        ...newContact,
        id: this.state.contactList[this.state.contactList.length - 1].id + 1,
        isFavorite: false,
      };
      this.setState((prevState) => {
        return {
          contactList: prevState.contactList.concat([newFinalContact]),
        };
      });
      return { status: "success", msg: "Contact was added successfully" };
    }
  };

  handleUpdateContact = (updatedContact) => {
    if (updatedContact.name == "") {
      return { status: "failure", msg: "Please Enter a valid name" };
    } else if (updatedContact.phone == "") {
      return { status: "failure", msg: "Please Enter a valid name" };
    }

    this.setState((prevState) => {
      return {
        contactList: prevState.contactList.map((obj) => {
          if (obj.id == updatedContact.id) {
            return {
              ...obj,
              name: updatedContact.name,
              email: updatedContact.email,
              phone: updatedContact.phone,
            };
          }
          return obj;
        }),
        isUpdating: false,
        selectedContact: undefined,
      };
    });
    return { status: "success", msg: "Contact was updated successfully" };
  };

  handleToggleFavorite = (contact) => {
    this.setState((prevState) => {
      return {
        contactList: prevState.contactList.map((obj) => {
          if (obj.id == contact.id) {
            return { ...obj, isFavorite: !obj.isFavorite };
          }
          return obj;
        }),
      };
    });
  };

  handleDeleteContact = (contactID) => {
    this.setState((prevState) => {
      return {
        contactList: prevState.contactList.filter((obj) => {
          return obj.id != contactID;
        }),
      };
    });
  };

  handleAddRandomContact = (newContact) => {
    const newFinalContact = {
      ...newContact,
      id: this.state.contactList[this.state.contactList.length - 1].id + 1,
      isFavorite: false,
    };
    this.setState((prevState) => {
      return {
        contactList: prevState.contactList.concat([newFinalContact]),
      };
    });
  };

  handleRemoveAllContact = () => {
    this.setState(() => {
      return {
        contactList: [{}],
      };
    });
  };

  handleUpdateClick = (contact) => {
    console.log(contact);
    this.setState((prevStart) => {
      return {
        selectedContact: contact,
        isUpdating: true,
      };
    });
  };

  handleCancelUpdateContact = (contact) => {
    this.setState(() => {
      return {
        selectedContact: undefined,
        isUpdating: false,
      };
    });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{ minHeight: "85vh" }}>
          <div className="row py-3">
            <div className="col-4 offset-2 row">
              <AddRandomContact
                handleAddRandomContact={this.handleAddRandomContact}
              />
            </div>
            <div className="col-4 row">
              <RemoveAllContact
                handleRemoveAllContact={this.handleRemoveAllContact}
              />
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2 row">
                <AddContact
                  handleAddContact={this.handleAddContact}
                  isUpdating={this.state.isUpdating}
                  selectedContact={this.state.selectedContact}
                  cancelUpdateContact={this.handleCancelUpdateContact}
                  handleUpdateContact={this.handleUpdateContact}
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2 row">
                <FavoriteContacts
                  contacts={this.state.contactList.filter(
                    (u) => u.isFavorite == true
                  )}
                  favoriteClick={this.handleToggleFavorite}
                  deleteContact={this.handleDeleteContact}
                  updateClick={this.handleUpdateClick}
                />
              </div>
            </div>
            <div className="row py-2">
              <div className="col-8 offset-2 row">
                <GeneralContacts
                  contacts={this.state.contactList.filter(
                    (u) => u.isFavorite == false
                  )}
                  favoriteClick={this.handleToggleFavorite}
                  deleteContact={this.handleDeleteContact}
                  updateClick={this.handleUpdateClick}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ContactIndex;
