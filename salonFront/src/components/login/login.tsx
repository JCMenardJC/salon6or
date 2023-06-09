import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { TUser } from "../../types/user.type";
import { UContext } from "../../context/userContext";
export function Login({ setPage }: any) {
  const urlLogin = "http://localhost:3000/auth/login";
  const { setUser } = useContext(UContext);

  const dataLogin = {
    email: "",
    password: "",
  };

  const [dataInput, setDataInput] = useState(dataLogin);

  useEffect(() => {
    // Vérifier si les informations d'identification sont présentes dans le stockage local
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setPage("");
    }
  }, []); // Le tableau vide [] assure que ce code ne s'exécute qu'une seule fois après le rendu initial

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
        setUser(response);

        // Stocker les informations d'identification dans le stockage local
        localStorage.setItem("user", JSON.stringify(response));
        setPage("compte");
      })
      .catch((err) => console.error(err));
  };
  /*   console.log(user); */
  return (
    <>
      <a
        type="button"
        className="nav-link nav"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Connexion
      </a>
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
    </>
  );
}
