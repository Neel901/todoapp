document.getElementById("loginForm").addEventListener(
    "submit", async function(event){
        event.preventDefault();

        const userName = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const successMessage = document.getElementById("success-message");
        const errorMessage = document.getElementById("error-message");
    

        const loginData = { userName, password};

        
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            });
    
        const data = await response.json();
        if (response.ok) {
            console.log("Login successful ")
            console.log(data.userId)
            localStorage.setItem('userId', data.userId);
            successMessage.textContent = "Login Successful.";
            window.location.href = "dashboard.html";
        } else {
            errorMessage.textContent = errorMessage.message || 'Login failed. Please try again.';
                }
        } catch (error) {
        console.error("Error during login:", error);
        errorMessage.textContent = errorMessage.message || 'Login failed. Please try again.';
    }

    }
)