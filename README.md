# Key Points for Advanced Form Handling in React

## 1. Handle form submission on the client

- Use React state (e.g., useState) to manage form data
- Implement onSubmit event handler for form submission
- Perform client-side validation
- Use controlled components for input fields
- Consider form libraries for complex scenarios

## 2. Handle form submission with a Server Function

- Use 'use server' directive to define server functions
- Leverage useActionState hook for state management
- Perform server-side processing and validation
- Access databases and server resources directly
- Implement in supported frameworks (e.g., Next.js)

## 3. Display a pending state during form submission

- Utilize useActionState hook to access submission state
- Create separate component for submit button
- Update UI based on pending state (e.g., disable buttons, show spinners)
- Consider optimistic UI updates for responsiveness

## 4. Handling form submission errors

- Implement both client-side and server-side error handling
- Use try-catch blocks in server functions
- Update form state with error messages
- Display errors clearly and accessibly in the UI
- Handle field-level and form-level errors

## 5. Display a form submission error without JavaScript

- Implement server-side form handling and validation
- Use useActionState with server actions
- Return and render error states in initial HTML
- Style error messages to be visible by default
- Ensure functionality when JavaScript is disabled

