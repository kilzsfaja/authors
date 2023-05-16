import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios"

const EditOne = () => {

  // --------- get one by :id ----------
  const {id} = useParams()

  // ------- state vars -----------
  const [author, setAuthor] = useState("")
  const [errors, setErrors] = useState([]);


  // --------- from DB -------------
  useEffect(() => {
    axios.get(`http://localhost:8000/api/author/${id}`)
    .then((serverRes) => {
      console.log(serverRes.data)
      setAuthor(serverRes.data.name)
    })
    .catch((err) => console.log(err))
  }, [id])

  const navigate = useNavigate()

  // ---------- update ONE ------------
  const updateAuthor = (e) => {
    e.preventDefault();

    const tempToServer = {
      name: author,
    };

    axios
    .patch(`http://localhost:8000/api/author/${id}`, tempToServer)
    .then((serverRes) => {
      console.log(serverRes.data)
      navigate("/")
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

  }

  return (
    <>
      <Link to={"/"}>Home</Link>
      <h3>Add a new author:</h3>
      <form onSubmit={updateAuthor}>
        <div>
          <label className="form-label">Name</label>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            />
            {author.length < 3 ? 
            errors.map((err, index) => (
              <h5 style={{ color: "red" }} key={index}>
                {err}
              </h5>
            )) : <p></p>
            }
          <button className="btn btn-success mt-3">Submit</button>
          <Link to={"/"}>
            <button className="btn btn-danger ms-3 mt-3">Cancel</button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default EditOne;
