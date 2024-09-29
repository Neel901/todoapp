function signup() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const errorMessage = document.getElementById("error-message");
    const successMessage = document.getElementById("success-message");
    errorMessage.textContent = '';
    successMessage.textContent = '';
    if (!username || !password) {
        errorMessage.textContent = "All fields are required.";
        return;
    }

    const signupRequest = {
    
        userName: username,
        password: password,

    };
    fetch('https://todo-app-437107.et.r.appspot.com/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupRequest)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Signup failed');
        }
        return response.json();
    })
    .then(data => {
        successMessage.textContent = "Signup successful! Please log in.";
    
        document.getElementById("username").value = '';
        document.getElementById("password").value = '';
        
    })
    .catch(error => {
        errorMessage.textContent = error.message || 'Signup failed. Please try again.';
    });
}
function redirectToIndex() {
    window.location.href = "login.html";
}
