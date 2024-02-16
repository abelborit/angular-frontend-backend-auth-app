import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  /* una recomendación en la inyección de dependencias es trabajar con la sintaxis de inject() ya que nos permite inyectar servicios en funciones lo cual es útil para que las aplicaciones en Angular sean más rápidas */
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public myForm: FormGroup = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  handleRegister() {
    // console.log(this.myForm.value);
    const { name, email, password } = this.myForm.value;

    /* para manejar los errores entonces lo haremos con dos propiedades que tiene el subscribe, "next" si todo salió bien y "error" si algo salió mal */
    this.authService.handleRegister(name, email, password).subscribe({
      next: (loginResponse) => {
        // console.log({ loginResponse });
        /* al final se coloca el then() para que cuando acabe el timer del sweetalert2 me pueda redirigir a la página de dashboard */
        Swal.fire({
          icon: 'success',
          title: 'Correct Credentials',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => this.router.navigateByUrl('/dashboard'));
      },
      error: (loginError) => {
        // console.log({ loginError });
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${
            loginError === 400
              ? 'Name or Email already exists'
              : 'Something with server is wrong'
          }`,
        });
      },
    });
  }
}
