import React from "react";
import logo from "../../../../public/uploads/logo/cap_mechant.png";
const FullDesign = (props) => {
  return (
    <>
      <p className="fs-6 text mb-0">Bar de menu</p>
      <div className="container border mb-5">
        <nav className=" p-2 navbar-light bg-dark">
          <div className="row  ">
            <div className="col-2">
              <picture>
                <source
                  className="header-logo"
                  media="(max-width: 414px)"
                  srcSet="uploads/logo/cap_mechant.png"
                  height="50px"
                />
                <source
                  className="header-logo"
                  media="(min-width: 415px)"
                  srcSet="uploads/logo/cap_mechant.png"
                  height="50px"
                />
                <img
                  className="header-logo"
                  src="uploads/logo/cap_mechant.png"
                  alt="Logo Cap Méchant"
                  height="50px"
                />
              </picture>
            </div>
            <div className=" col-10 d-flex justify-content-end">
              <div className="dropdown my-auto mx-2">
                <button
                  className="btn btn-outline-light dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-bars"></i> Menu
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Mes coordonée
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Mes commandes
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Catégories
                    </a>
                  </li>
                </ul>
              </div>
              <div className="btn btn-sm btn-danger btn-rounded">
                <i className="fas fa-power-off fa-2x py-2"></i>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <p className="fs-6 text mb-0">Accueil</p>
      <div className="container border mb-5 p-5 bg-light">
        <div className="row justify-content-center mb-4">
          <div className="col-2">
            <div className="card text-center bg-success">
              <div className="card-body ">
                <div className="card-text text-white">
                  {" "}
                  <i className="fas fa-box fa-5x mb-2"></i>
                  <p className="fs-5 text my-3 ">Commander</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="card text-center bg-success">
              <div className="card-body p-auto">
                <div className="card-text text-white">
                  {" "}
                  <i className="fas fa-file-alt fa-5x mb-2"></i>
                  <p className="fs-5 text mb-0">Mes commandes</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="card text-center bg-success">
              <div className="card-body p-auto">
                <div className="card-text text-white">
                  {" "}
                  <i className="fas fa-map-marker-alt fa-5x mb-2"></i>
                  <p className="fs-5 text mb-0">Mes coordonnées</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-2">
            <div className="card text-center bg-warning">
              <div className="card-body p-auto">
                <div className="card-text text-white">
                  {" "}
                  <i className="fas fa-user-cog fa-5x mb-2"></i>
                  <p className="fs-5 text my-3">Utilisateurs</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="card text-center bg-warning">
              <div className="card-body p-auto">
                <div className="card-text text-white">
                  {" "}
                  <i className="fas fa-tags fa-5x mb-2"></i>
                  <p className="fs-5 text my-3">Catégories</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="card text-center bg-warning">
              <div className="card-body p-auto">
                <div className="card-text text-white">
                  {" "}
                  <i className="fas fa-shopping-bag fa-5x mb-2"></i>
                  <p className="fs-5 text my-3">Produits</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="card text-center bg-warning">
              <div className="card-body p-auto">
                <div className="card-text text-white">
                  {" "}
                  <i className="fas fa-calculator fa-5x mb-2"></i>
                  <p className="fs-5 text my-3">Unités</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="card text-center bg-warning">
              <div className="card-body p-auto">
                <div className="card-text text-white">
                  {" "}
                  <i className="fas fa-truck fa-5x mb-2"></i>
                  <p className="fs-5 text my-3">Fournisseurs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="fs-6 text mb-0">Page connexion</p>
      <div className="container border mb-5 p-5 bg-light">
        <div className="row justify-content-center">
          <div className="col-5 p-5 bg-dark text-center">
            <img src={logo} width="250" />
            <form>
              <div className="form-outline my-4">
                <input
                  type="email"
                  id="form1Example1"
                  className="form-control bg-light"
                  placeholder="Adresse mail"
                />
              </div>

              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="form1Example2"
                  className="form-control bg-light"
                  placeholder="Mot de passe"
                />
              </div>

              <div className="row mb-4">
                <div className="col d-flex justify-content-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="form1Example3"
                      checked
                    />
                    <label className="form-check-label" htmlFor="form1Example3">
                      {" "}
                      Remember me{" "}
                    </label>
                  </div>
                </div>

                <div className="col">
                  <a href="#!">Mot de passe oublié ?</a>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Se connecter
              </button>
            </form>
          </div>
        </div>
      </div>

      <p className="fs-6 text mb-0">Exemple tableau -  <span class="text-danger">les actions sont limitées en fonction du profil utilisateur</span> </p>
      <div className="container border mb-5 p-5 bg-light">
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col">Commande</th>
              <th scope="col">Utilisateurs</th>
              <th scope="col">Status</th>
              <th scope="col">Mes actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">#000001</th>
              <td>Sit</td>
              <td>Amet</td>
              <td>
                <button type="button" className="btn btn-info btn-sm px-3 mx-2">
                  <i className="fas fa-eye"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-warning btn-sm px-3 mx-2"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm px-3 mx-2"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">#000002</th>
              <td>Sit</td>
              <td>Amet</td>
              <td>
                <button type="button" className="btn btn-info btn-sm px-3 mx-2">
                  <i className="fas fa-eye"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-warning btn-sm px-3 mx-2"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm px-3 mx-2"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">#000003</th>
              <td>Sit</td>
              <td>Amet</td>
              <td>
                <button type="button" className="btn btn-info btn-sm px-3 mx-2">
                  <i className="fas fa-eye"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-warning btn-sm px-3 mx-2"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm px-3 mx-2"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="fs-6 text mb-0">Ma commande</p>
      <div className="container border mb-5 p-5 bg-light">
        <div className="d-flex">
          <div className=" align-self-start">
            <i className="my-auto fas fa-file-alt fa-6x "></i>
          </div>

          <div className="px-4 align-self-start ">
            <p className="mb-0">
              Commande N° <span className="fw-bold">#000001</span>
            </p>
            <p className="mb-0">
              Utilisateur : <span className="fw-bold">Sébastien Maillot</span>
            </p>
            <p className="mb-0">
              Date : <span className="fw-bold">29/03/2021</span>
            </p>
            <p className="mb-2">
              Adresse : <span className="fw-bold">Saint-Pierre</span>
            </p>
            
          </div>
        </div>
        <div className="d-flex"><p className=" mb-0 btn btn-outline-success">Commande envoyé</p></div>
        <div className="d-flex">
          
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Produits</th>
                <th scope="col">Catégories</th>
                <th scope="col" className="text-center">Stock</th>
                <th scope="col" className="text-center">Quantité</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Salade de pâte</th>
                <td>Repas</td>
                <td className="text-center">2</td>
                <td className="text-center">15</td>
              </tr>
              <tr>
                <th scope="row">Fromage blanc</th>
                <td>Dessert</td>
                <td className="text-center">2</td>
                <td className="text-center"> 12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FullDesign;
