<template>
  <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-color1 border-0">

      <div class="modal-header d-flex flex-column align-items-center border-0">
        <button type="button" class="btn-close bg-color2" data-bs-dismiss="modal" aria-label="Close"></button>
        <div class="d-flex flex-column align-items-center ">
          <h1 class="modal-title fs-2 color2" id="exampleModalToggleLabel">Sign In</h1>
          <p class="text-light fw-light">Sign in to your account</p>
        </div>
        
      </div>
      <div class="modal-body">
        <form action="">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label text-white">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="example@gmail.com" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label text-white">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="123..."/>
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
            <label class="form-check-label text-white" for="exampleCheck1">Remember me</label>
          </div>
          <button type="submit" class="btn bg-color2 color1 w-100">Sign In</button>
        </form>
      </div>
      <div class="modal-footer d-flex justify-content-center border-0">
        <p class="text-light fw-light">Don't have an account yet?</p>
        <button class="empty-btn color2" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Sign up!</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border-0 bg-color1">
      <div class="modal-header d-flex flex-column align-items-center border-0">
        <button type="button" class="btn-close bg-color2" data-bs-dismiss="modal" aria-label="Close"></button>
        <div class="d-flex flex-column align-items-center ">
          <h1 class="modal-title fs-2 color2" id="exampleModalToggleLabel">Sign Up</h1>
          <p class="text-light fw-light">Create a new account</p>
        </div>
      </div>
      <div class="modal-body">
        <form action="">
          <div class="mb-3">
            <label for="exampleInputName1" class="form-label text-white">Name</label>
            <input type="text" class="form-control" id="exampleInputName1" aria-describedby="emailHelp" placeholder="Alex" />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label text-white">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="example@gmail.com" />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label text-white">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="123..."/>
          </div>
          <button type="submit" class="btn bg-color2 color1 w-100">Sign Up</button>
        </form>
      </div>
      <div class="modal-footer border-0 d-flex justify-content-center">
        <p class="text-light fw-light">Already have an account?</p>
        <button class="empty-btn color2" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Sign In!</button>
      </div>
    </div>
  </div>
</div>
<button class="btn-logo" data-bs-target="#exampleModalToggle" data-bs-toggle="modal"><img src="/login.svg" alt="" /></button>
</template>

<style scoped>
.btn-logo {
    background: none;
    border: none;
    padding: 0;
}
</style>