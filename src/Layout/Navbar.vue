<template>
    <nav class="navbar navbar-expand-lg navbar-white bg-white rounded-bottom shadow-lg ">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <i class="bi bi-book-fill m-1"></i>
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ">
                    <li class="nav-item">
                        <a class="nav-link btn btn-primary text-dark mx-1 fw-bold" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn btn-primary text-dark mx-1 fw-bold" href="/Favorite">Favoritos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link btn btn-primary text-dark mx-1 fw-bold" href="/friends">Amigos</a>
                    </li>
                    <li>
                        <a class="nav-link btn btn-primary text-dark mx-1 fw-bold" href="/blacklist">Rejeitados</a>
                    </li>
                    <li>
                        <a class="nav-link btn btn-primary text-dark mx-1 fw-bold bg-danger" href="/manage"> <i
                                class="bi bi-person-fill-gear"></i> Manage</a>
                    </li>
                    <li>
                        <a class="nav-link btn btn-primary text-dark mx-1 fw-bold bg-danger" href="/cadastro"> <i
                                class="bi bi-box-arrow-in-right"></i> cadastro</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'Navbar'
}
</script>