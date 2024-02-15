import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  /* una recomendación en la inyección de dependencias es trabajar con la sintaxis de inject() ya que nos permite inyectar servicios en funciones lo cual es útil para que las aplicaciones en Angular sean más rápidas */
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  public myForm: FormGroup = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  handleLogin() {
    // console.log(this.myForm.value);
    const { email, password } = this.myForm.value;

    this.authService.handleLogin(email, password).subscribe((response) => {
      console.log({ response });
    });
  }
}
