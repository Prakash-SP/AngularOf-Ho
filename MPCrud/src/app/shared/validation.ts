export class Validation {

    validation_messages = {
        'empid': [
          { type: 'required', message: 'Emp_Id is required' }
        ],
        'name': [
          { type: 'required', message: 'Name is required' }
        ],
        'birthday': [
          { type: 'required', message: 'Please insert your Birthday' },
        ],
        'gender': [
          { type: 'required', message: 'Please select your Gender' },
        ],
        'email': [
          { type: 'required', message: 'Email is required' },
          { type: 'pattern', message: 'Enter a valid email' }
        ],
        'phone': [
          { type: 'required', message: 'Phone is required' },
          { type: 'validCountryPhone', message: 'Phone incorrect for the country selected' }
        ],
        'post': [
          { type: 'required', message: 'Phone is required' },
          { type: 'validCountryPhone', message: 'Phone incorrect for the country selected' }
        ]
      };

}
