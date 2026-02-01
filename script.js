document.addEventListener("DOMContentLoaded", function(){

    const searchBUTTON = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");

    const cardStatsContainer = document.querySelector(".stats-cards");

    //return true or false based on regex
    function ValidateUsername(username){
        if(username.trim()===""){
            alert("Please Enter a username");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const ismatching= regex.test(username);
        if(!ismatching){
            alert("Invalid Username");
        }
        return ismatching;
    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`
        try{
            searchBUTTON.textContent="Searching.....";
            searchBUTTON.disabled=true;

            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch the USER");
            }
            const parseddata = await response.json();
            console.log("Logging Data: ",parseddata);

            displayUserDATA(parseddata);
        }
        catch(error){
            statsContainer.innerHTML =`<p>No Data Found </p>`
        }
        finally{
            searchBUTTON.textContent="Search";
            searchBUTTON.disabled=false;
        }
    }


    function updateProgress(solved,total,label,circle){
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }
    function displayUserDATA(parseddata){
        const totalQues = parseddata.totalQuestions;
        const totalEasydQues = parseddata.totalEasy;
        const totalMediumQues = parseddata.totalMedium;
        const totalHardQues = parseddata.totalHard;

        const solvedTotalQues = parseddata.totalSolved;
        const easyTotalQues = parseddata.easySolved;
        const mediumTotalQues = parseddata.mediumSolved;
        const hardTotalQues = parseddata.hardSolved;

        updateProgress(easyTotalQues, totalEasydQues,easyLabel,easyProgressCircle);
        updateProgress(mediumTotalQues,totalMediumQues,mediumLabel,mediumProgressCircle);
        updateProgress(hardTotalQues,totalHardQues,hardLabel,hardProgressCircle);
    }

    searchBUTTON.addEventListener('click', function(){
        const username = usernameInput.value;
        console.log("Logging Username : ",username);
        
        if(ValidateUsername(username)){
            fetchUserDetails(username);
        }
    })
})

