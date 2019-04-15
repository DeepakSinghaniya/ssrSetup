export const newsLetter = {
    email_id: {
        classes: '',
        labels: {
            id: 'newsLetterEmail',
            label: true,
            labelText: 'Newsletter'
        },
        elementType: 'input',
        elementConfig: {
            placeholder: 'Enter your Email',
            name: 'newsLetterEmail'
        },
        value: '',
        validation: {
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
    }
}