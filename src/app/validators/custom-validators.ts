import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidators {
    // if the static keyword is used with a member function (method),
    // that method is automatically invoked without creating an object of the class, 
    // you just invoke that method using the class name .(dot) method name.
    // In short, if we say about static methods, the static keyword enables us to 
    // use methods of a class without instantiating an object first.
    static passwordValidator(pattern: RegExp, error: ValidationErrors): ValidatorFn { // return type ValidatorFn
        return (control: AbstractControl): { [key: string]: any } | null => { // validator f-n, returns a map of validatin errors or null

            // if control is empty return no error
            if (!control.value) {
                return null;
            }
            
            // test the value of the control against the regexp supplied
            const valid = pattern.test(control.value); // true or false
            
            // if true, return no error (no error), else return error passed in the second parameter
            return valid ? null : error;
        }
    };
}
