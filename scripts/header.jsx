function Header(){
    return <>
    <nav className="navbar navbar-expand-md navbar-dark py-0 d-flex">
      <div className="py-0 d-flex flex-grow-1 flex-md-grow-0">
        <a className="navbar-brand d-flex align-items-center justify-content-center w-100" href="index.html">
            <img className="img-fluid" src="images/logo.png" alt="uwu" />
        </a>
        <div className="d-flex flex-grow-1 flex-md-grow-0">
          <button className="navbar-toggler w-100 rounded-0 collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>       
      </div>        
      <div className="collapse navbar-collapse ml-5" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto d-flex justify-content-evenly align-items-center w-100 h-100">
          <li className="nav-item active w-100 h-100"><a className="nav-link h-100 d-flex align-items-center justify-content-center" href="index.html">Menu1</a></li>
          <li className="nav-item w-100 h-100"><a className="nav-link h-100 d-flex align-items-center justify-content-center" href="menu2.html">Menu2</a></li>
          <li className="nav-item w-100 h-100"><a className="nav-link h-100 d-flex align-items-center justify-content-center" href="menu3.html">Menu3</a></li>
          <li className="nav-item w-100 h-100"><a className="nav-link h-100 d-flex align-items-center justify-content-center" href="menu4.html">Menu4</a></li>
          <li className="nav-item w-100 h-100"><a className="nav-link h-100 d-flex align-items-center justify-content-center" href="#"><img src="images/person-circle.svg" alt="uwu2" id="person-circle" /></a></li>
        </ul>       
      </div>
    </nav>
    </>
}