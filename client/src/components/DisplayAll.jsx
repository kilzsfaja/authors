import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DisplayAll = () => {
  // setting state
  const [authors, setAuthors] = useState([]);

  // get data from DB right away
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/author")
      .then((serverRes) => {
        console.log("✅ SERVER SUCCESS => ", serverRes.data);
        setAuthors(serverRes.data);
      })
      .catch((error) => {
        console.log("❌ SERVER ERROR", error);
      });
  }, []);

  // ------ delete item ------
  const deleteItem = (authorId) => {
    console.log("DELETE>>>", authorId);
    axios
      .delete("http://localhost:8000/api/author/" + authorId)
      .then((serverRes) => {
        console.log(serverRes.data);
        const updatedAuthors = authors.filter(
          (author) => author._id !== authorId
        );
        setAuthors(updatedAuthors);
      })
      .catch((serverError) => console.log(serverError));
  };

  return (
    <>
      <Link to={"/new"}>Add Author</Link>
      <h3>We have quotes by:</h3>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Author</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => {
              return (
                <tr key={author._id}>
                  <th scope="row">{author.name}</th>
                  <td>
                    <Link to={`/edit/${author._id}`}>
                      <button className="btn btn-info m-2">Edit</button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteItem(author._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DisplayAll;
