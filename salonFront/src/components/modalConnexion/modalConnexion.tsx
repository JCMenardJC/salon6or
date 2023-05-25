import { useContext, useState } from "react";
import { UContext } from "../../context/userContext";

function ModalConnexion({ setPage }: any) {
  const urlLogin = "http://localhost:3000/auth/login";
  const { setUser } = useContext(UContext);

  const dataLogin = {
    email: "",
    password: "",
  };

  const [dataInput, setDataInput] = useState(dataLogin);

  const inputChange = (e: React.BaseSyntheticEvent) => {
    const { name, value } = e.target;
    setDataInput({ ...dataInput, [name]: value });
  };

  const login = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataInput),
    };

    fetch(urlLogin, option)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setUser(response); /* 
        onAuthChange(response.data);
        localStorage.setItem("savedToken", response.data); */
        setPage("compte");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <form onSubmit={(e) => login(e)}>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bleu">
              <div className="modal-header">
                <h1 className="modal-title" id="exampleModalLabel">
                  CONNEXION
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="container text-center">
                  <label>
                    <input
                      onChange={(e) => inputChange(e)}
                      type="text"
                      name="email"
                      placeholder="email"
                    />
                  </label>
                  <br />
                  <label className="mt-2">
                    <input
                      onChange={(e) => inputChange(e)}
                      type="password"
                      name="password"
                      placeholder="password"
                    />
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Fermer
                </button>
                <button
                  onClick={(e) => login(e)}
                  type="submit"
                  id="boutonLogin"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default ModalConnexion;
