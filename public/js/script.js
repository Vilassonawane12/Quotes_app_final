document.addEventListener("DOMContentLoaded", function () {
  const quoteTextarea = document.getElementById("quoteText");
  const colorPicker = document.getElementById("colorPicker");

  // Event listener for color picker change
  colorPicker.addEventListener("input", function () {
    const selectedColor = colorPicker.value;
    quoteTextarea.style.backgroundColor = selectedColor;

    // Adjust text color based on background color
    quoteTextarea.style.color = getTextColor(selectedColor);
  });

  // Function to determine text color based on background color
  function getTextColor(backgroundColor) {
    // Convert background color to RGB format
    const rgb = hexToRgb(backgroundColor);
    // Calculate luminance (brightness) using relative luminance formula
    const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
    // Choose text color based on luminance threshold
    return luminance > 0.5 ? "#000000" : "#ffffff"; // If luminance is greater than 0.5, use black text, otherwise use white text
  }

  // Function to convert hexadecimal color to RGB format
  function hexToRgb(hex) {
    // Remove '#' if present
    hex = hex.replace(/^#/, "");
    // Convert 3-digit hex to 6-digit format
    if (hex.length === 3) {
      hex = hex.replace(/(.)/g, "$1$1");
    }
    // Parse hexadecimal components
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }

  // Event listener for form submission
  const quoteForm = document.getElementById("quoteForm");
  quoteForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    // Here you can handle form submission, like sending the quote to the server
    const quoteText = quoteTextarea.value;
    const quoteColor = colorPicker.value;
    console.log("Quote:", quoteText);
    console.log("Color:", quoteColor);
  });

  // Event listener for submit buttons
  const submitButtons = document.querySelectorAll(".submit");
  submitButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Successfully created");
      window.location.href = "/dashboard";
    });
  });
});

// document
//   .getElementById("logoutButton")
//   .addEventListener("click", async function (event) {
//     event.preventDefault(); // Prevent default form submission if applicable

//     try {
//       const response = await fetch(
//         "http://localhost:8080/users/dashboard/logout",
//         { method: "POST" }
//       ); // Adjust fetch based on backend route

//       if (response.ok) {
//         alert("Logout successful!"); // Display alert message
//         window.location.href = "/users/login"; // Redirect to login page
//       } else {
//         console.error("Error logging out:", await response.text());
//         // Handle logout errors (optional: display error message)
//       }
//     } catch (error) {
//       console.error("Error logging out:", error);
//       // Handle other errors (optional: display error message)
//     }
//   });



document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', function() {
            const noteId = this.getAttribute('data-id');
            toggleLike(noteId, this);
        });
    });
});

async function toggleLike(noteId, element) {
    try {
        const response = await fetch(`/users/likeOrDislike/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Response data:', data);

        if (data.success) {
            element.classList.toggle('liked');
            if (element.classList.contains('liked')) {
                element.classList.add('fas');
                element.classList.remove('far');
                alert("Liked");
            } else {
                element.classList.add('far');
                element.classList.remove('fas');
                alert("Disliked");
            }
        } else {
            alert('Error liking the quote');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error liking the quote');
    }
}


// responsive

// Create a file named main.js in your public/js directory and add this code

const hamburger = document.querySelector(".hamburger");
      const navMenu = document.querySelector(".nav-menu");
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
      });
      document.querySelectorAll("a").forEach((n) =>
        n.addEventListener("click", () => {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
        })
      );