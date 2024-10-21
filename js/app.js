document.addEventListener("alpine:init", () => {
    Alpine.data("users", () => ({
        users: [], // Initialize users as an empty array
        
        // Function to fetch users from the API
        async loadUsers() {
            try {
                const response = await fetch("/api/users");
                if (!response.ok) {
                    throw new Error("Failed to fetch users from the server");
                }

                // Parse the response as JSON
                const data = await response.json();

                // Check if data is structured properly and has users
                if (Array.isArray(data)) {
                    this.users = data; // Directly set the users if it's an array
                } else if (data.users && Array.isArray(data.users)) {
                    this.users = data.users; // In case data.users is the array
                } else {
                    console.error("Unexpected data format:", data);
                    alert("Failed to load users due to data format issue.");
                }
            } catch (error) {
                console.error("Error loading users:", error);
                alert("An error occurred while loading users.");
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
                console.log("Server response: ", data); // to debug the response
                
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
