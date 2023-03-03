import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class FormularioRegister{

    form!: FormGroup;

    constructor(private fb: FormBuilder) {

        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }


}