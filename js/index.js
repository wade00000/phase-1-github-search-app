document.addEventListener("DOMContentLoaded",()=>{
    const form = document.querySelector("#github-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page refresh
        const searchTerm = event.target.search.value.trim(); // Get input value

        if (searchTerm) {
            searchGitHubUsers(searchTerm); // Call function to fetch users
        }
        
        form.reset(); // Clear input field
    });


   function searchGitHubUsers(username){
        fetch(`https://api.github.com/search/users?q=${username}`,{
            
             headers : {
                Accept: "application/vnd.github.v3+json"
            }}
        )
        .then(res=>res.json())
        .then(data=>displayUsers(data.items))
        .catch(error=>console.error("Encountered error:",error))
   };



   function displayUsers(users){
    const userList = document.querySelector("#user-list")
    userList.innerHTML = ""

    
    users.forEach(user=>{
        const li = document.createElement("li");

        li.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" width="50">
            <a href="${user.html_url}" target="_blank">${user.login}</a>
            <button class="view-repos" data-username="${user.login}">View Repos</button>
        `;

         // Click event to fetch and display repos
         li.addEventListener("click", () => fetchUserRepos(user.login));


        userList.appendChild(li);
    })

   };



   function fetchUserRepos(username){
    const reposList = document.querySelector("#repos-list");
    reposList.innerHTML = ""; // Clear previous repos

    fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
            "Accept": "application/vnd.github.v3+json"
        }
    })
    .then(res => res.json())
    .then(repos => {
        repos.forEach(repo => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
            reposList.appendChild(li);
        });
    })
    .catch(error => console.error("Error fetching repos:", error));

   };




})