import React from "react";
import "./Card.css";

export default function Card(props) {
  return (
    <div>
      <div
        className="card Banner--Card "
        style={{ width: "200px", height: "300px" }}
      >
        <img
          src={props.imageSrc}
          alt="Avatar"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <button
        className="btn btn-danger btn-block btn-lg"
        onClick={props.onDeleteBanner}
      >
        delete
      </button>
    </div>
  );
}
