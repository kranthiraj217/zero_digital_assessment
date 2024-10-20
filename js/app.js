document.addEventListener("alpine:init", () => {
    Alpine.data("users", () => ({
        users: [],

        // Fetch users from API when the component is initialized
        async fetchUsers() {
            console.log("Fetching users...");
            try {
                const response = await fetch("/api/users");
                const data = await response.json();
                this.users = data.users;
                console.log("Fetched users: ", this.users);
            } catch (error) {
                console.error("Error fetching users", error);
            }
        },
        

        // Add a new user using the API
        async addUser(e) {
            e.preventDefault(); // Prevent the default form submission
            
            // Collect user form data
            const user = {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                email: document.getElementById("email").value,
                mobile: document.getElementById("mobile").value,
                role: document.getElementById("role").value,
            };

            console.log("User data being sent: ", user); // to check data

            try {
                // Send a POST request to add the user
                const response = await fetch("/api/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                });
                
                const data = await response.json();
                console.log("server response: ", data); // to debug the response
                
                if (data.success) {
                    alert('Entry has been made successfully'); // Show success message
                    window.location.href = "/"; // Redirect to the dashboard
                } else {
                    alert('Failed to add user');
                }
            } catch (error) {
                console.error("Error adding user", error);
                alert('An error occurred while adding the user');
            }
        },
    }));
});

// Fetch users when the dashboard is loaded
document.addEventListener("DOMContentLoaded", () => {
    const userComponent = document.querySelector('[x-data]');
    if (userComponent && userComponent.__x) {
        // Fetch users on load
        userComponent.__x.fetchUsers();
    }
});
