import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Subject, debounceTime, takeUntil, of, switchMap } from 'rxjs';
import { User } from 'src/app/models';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy  {
  userForm: FormGroup;
  agreeToTerms = false;
  isSubmitting = false;
  emailValidationPending = false;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    this.userForm = this.createForm();
    this.setupEmailValidator();
  }

  ngOnInit(): void {
    // Component initialization
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], [this.asyncEmailValidator.bind(this)]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(18)]],
      dateOfBirth: ['', [Validators.required]]
    });
  }

  private setupEmailValidator(): void {
    const emailControl = this.userForm.get('email');
    if (emailControl) {
      emailControl.valueChanges.pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.emailValidationPending = emailControl.pending;
      });
    }
  }

  // Async validator for email uniqueness (simulated)
  private asyncEmailValidator(control: AbstractControl) {
    if (!control.value) {
      return of(null);
    }

    this.emailValidationPending = true;

    // Simulate API call delay
    return of(control.value).pipe(
      debounceTime(500),
      switchMap(email => {
        // Simulate some emails being taken
        const takenEmails = ['test@example.com', 'admin@test.com', 'user@demo.com'];
        const isTaken = takenEmails.includes(email.toLowerCase());

        this.emailValidationPending = false;

        return of(isTaken ? { emailTaken: true } : null);
      })
    );
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field && field.valid && (field.dirty || field.touched));
  }

  getFieldClasses(fieldName: string): string {
    if (this.isFieldInvalid(fieldName)) {
      return 'form-input error';
    }
    if (this.isFieldValid(fieldName)) {
      return 'form-input success';
    }
    return 'form-input';
  }

  onSubmit(): void {
    if (this.userForm.valid && this.agreeToTerms) {
      this.isSubmitting = true;

      const userData: User = {
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        mobile: this.userForm.value.mobile,
        address: this.userForm.value.address,
        age: this.userForm.value.age,
        dateOfBirth: new Date(this.userForm.value.dateOfBirth)
      };

      // Simulate API submission
      setTimeout(() => {
        console.log('User Information Submitted:');
        console.log('================================');
        console.table(userData);
        console.log('Raw Form Data:', this.userForm.value);

        this.isSubmitting = false;

        // Show success message (in real app, you might show a toast or navigate)
        alert('Information saved successfully! Check the console for details.');
      }, 1000);
    } else {
      // Mark all fields as touched to show validation errors
      this.markAllFieldsAsTouched();
    }
  }

  resetForm(): void {
    if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
      this.userForm.reset();
      this.agreeToTerms = false;
      this.isSubmitting = false;
      this.emailValidationPending = false;
    }
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.get(key)?.markAsTouched();
    });
  }

  getFormErrors(): any {
    let formErrors: any = {};

    Object.keys(this.userForm.controls).forEach(key => {
      const controlErrors = this.userForm.get(key)?.errors;
      if (controlErrors) {
        formErrors[key] = controlErrors;
      }
    });

    return formErrors;
  }

  onDateChange(e : Event): any {
    const input = e.target as HTMLInputElement;
    const dob = input.value;
    const currentDate = new Date;
    const age  = this.calculateAge(dob);

    if (age !== null) {
      const ageControl = this.userForm.get('age');
      ageControl?.setValue(age);              
      ageControl?.markAsTouched();            
      ageControl?.updateValueAndValidity();
    }
  }

  private calculateAge(dob: string | Date): number | null {
    if (!dob) return null;

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // adjust if birthday hasn’t occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }
}
