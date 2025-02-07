// Arrow function to validate form inputs
const validateForm = () => {
    const content = document.getElementById("content").value;
    const terms = document.getElementById("terms").checked;

    if (content.length <= 25) {
        alert("Blog content should be more than 25 characters.");
        return false;
    }
    if (!terms) {
        alert("You must agree to the terms and conditions.")
        return false
    }
        
    console.log("Form validation successful.")
    return true;
};

// Closure to track the total number of tasks. Closure allows function to access variables from its outer (enclosing) function.
// it has access to variables from its outer function
const subCounter = (() => {
    let count = 0;
    return () => ++count;
})();

// Add an event listener to the form
// Event is basically an action or occurence in the browser.
// callback function can be thought of as function that is executed when an event is triggered.
document.getElementById("blogForm").addEventListener("submit", async (e) => {
    e.preventDefault(); //// Prevents the form from actually submitting (default behavior) and reloading the page
    
    // Validate form
    // console.log(normalValidateForm()); // normal function
     if (!validateForm()) return; // arrow function

    // Collect form data
    const title = document.getElementById("title").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const content = document.getElementById("content").value;
    const category = document.getElementById("category").value;

    // Create a task object
    const blogData = {title, name, email, content, category};

    // 2. JSON.stringify to store task data
    /// `JSON.stringify` converts a JavaScript object into a JSON string representation. ///
    const jsonBlogData = JSON.stringify(blogData);
    console.log("Task Data (String):", jsonBlogData);

    // 3. JSON.parse to retrieve task data
    /// `JSON.parse` converts a JSON string back into a JavaScript object. ///
    const parsedBlogData = JSON.parse(jsonBlogData);
    console.log("Task Data (JSON):", parsedBlogData);

    // 4. Destructuring
    const {title: titleName, email: emailName} = parsedBlogData;
    console.log("Title:", titleName);
    console.log("Email:", emailName);

    // 5. Spread operator to add an ID field
    const updatedBlog = { parsedBlogData, submissionDate: new Date().toISOString(), submissionCount: `${subCounter()}` };
    console.log("Updated Blog:", updatedBlog);

    // Clear form inputs
    document.getElementById("blogForm").reset();

});
