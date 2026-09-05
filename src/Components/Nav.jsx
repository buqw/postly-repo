export default function Nav(props){


    return(
        <nav id="navi" class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Postly</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Profile</a>
                    </li>
                </ul>
                <div className="d-flex w-100 justify-content-end">
                    <button type="button" class="btn btn-outline-success mx-2">Login</button>
                    <button type="button" class="btn btn-outline-success">Register</button>
                </div>
                </div>
            </div>
        </nav>
    )
}