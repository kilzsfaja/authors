import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateOne = () => {
  const [author, setAuthor] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  // --------- create one -----
  const createAuthor = (e) => {
    e.preventDefault();

    const tempToServer = {
      name: author,
    };

    //  -------- post to server -------
    axios
      .post("http://localhost:8000/api/author", tempToServer)
      .then((serverRes) => {
        console.log(serverRes.data);
        navigate("/");
      })
      .catch((err) => {
        const errorResponseObj = err.response.data.errors; // Get the errors from err.response.data
        const errorArr = []; // Define a temp error array to push the messages in
        for (const key of Object.keys(errorResponseObj)) {
          // Loop through all errors and get the messages
          errorArr.push(errorResponseObj[key].message);
        }
        // Set Errors
        setErrors(errorArr);
      });
  };

  return (
    <>
      <Link to={"/"}>Home</Link>
      <h3>Add a new author:</h3>
      <form onSubmit={createAuthor}>
        <div>
          <label className="form-label">Name</label>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
          />
          {author.length < 3 ? (
            errors.map((err, index) => (
              <h5 style={{ color: "red" }} key={index}>
                {err}
              </h5>
            ))
          ) : (
            <p></p>
          )}
          <button className="btn btn-success mt-3">Submit</button>
          <Link to={"/"}>
            <button className="btn btn-danger ms-3 mt-3">Cancel</button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default CreateOne;
