import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "5rem", color: "#FF6347", marginBottom: "10px" }}>
        404
      </h1>
      <h2 style={{ fontSize: "2rem", color: "#333", marginBottom: "20px" }}>
        Page Not Found
      </h2>
      <p style={{ fontSize: "1rem", color: "#555", marginBottom: "30px" }}>
        Oops! The page you are looking for does not exist. It might have been
        removed or moved to a different location.
      </p>
      <button
        onClick={handleGoBack}
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
