import { getRandomUser } from "../../Utility/api";

const GetRandomContact = async (props) => {
  const responeFromAPI = await getRandomUser();
  console.log(responeFromAPI);

  return props.handleAddRandomContact({
    name: responeFromAPI.data.first_name + " " + responeFromAPI.data.last_name,
    email: responeFromAPI.data.email,
    phone: responeFromAPI.data.phone_number,
  });
};

const AddRandomContact = (props) => {
  return (
    <div>
      <button
        className="btn btn-success form-control"
        onClick={() => GetRandomContact(props)}
      >
        Add Random Contact
      </button>
    </div>
  );
};

export default AddRandomContact;
