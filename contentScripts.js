const sidebar = document.querySelector("#sidebar");
const url = window.location.href;

if (sidebar) {
  const getRatingBox = document.createElement("div");

  getRatingBox.innerHTML = `
        <div class="roundbox sidebox borderTopRound">
        <form id="tagForm" class="tagForm">
          <div class="caption titled">
          → Tag checker
          </div>
          <div class="submitForm">
            <p> Tag: </p>
            <select id="tagSelect">
                <option value="rating" class="rating"> *rating </option>
                <option value="brute force"> brute force </option>
                <option value="bitmasks"> bitmasks </option>
                <option value="binary search"> binary search </option>
                <option value="combinatorics"> combinatorics </option>
                <option value="constructive algorithms"> constructive algorithms </option>
                <option value="dp"> dp </option>
                <option value="data structures"> data structures </option>
                <option value="dfs and similar"> dfs and similar </option>
                <option value="divide and conquer"> divide and conquer </option>
                <option value="dsu"> dsu </option>
                <option value="flows"> flows </option>
                <option value="graphs"> graphs </option>
                <option value="graph matchings"> graph matchings </option>
                <option value="greedy"> greedy </option>
                <option value="games"> games </option>
                <option value="geomerty"> geomerty </option>
                <option value="hashing"> hashing </option>
                <option value="implementation"> implementation </option>
                <option value="interactive"> interactive </option>
                <option value="math"> math </option>
                <option value="number theory"> number theory </option>
                <option value="probabilities"> probabilities  </option>
                <option value="two pointers"> two pointers </option>
                <option value="trees"> trees </option>
                <option value="ternary search"> ternary search </option>
                <option value="shortest paths"> shortest paths </option>
                <option value="strings"> strings </option>
                <option value="sortings"> sortings </option>
            </select>
          </div>
          <div class="btn">
            <button class="submit" type="button" value="submit" id="checkTagButton"> Check </button>
            <button class="submit" type="button" value="submit" id="checkShowAllButton"> Show All Tags </button>
          </div>
          <div class="answer_box" id="answer_box">
          </div>
        </form>
        </div class="top-links">
      `;

  sidebar.appendChild(getRatingBox);

  const checkTagButton = document.querySelector("#checkTagButton");

  checkTagButton.addEventListener("click", async function () {
    // Remove tag from Show All tags button
    const tagBox = document.querySelectorAll("#answer_box span");
    tagBox.forEach((tag) => {
      tag.parentNode.removeChild(tag);
    });

    const selectedValue = document.getElementById("tagSelect").value;
    var id;
    var index;

    if (url[23] == "c") {
      var data = url.slice(31, url.length);
      var dataArray = data.split(/[\/\?]/);
      id = dataArray[0];
      index = dataArray[2];
    } else {
      var data = url.slice(42, url.length);
      var dataArray = data.split(/[\/\?]/);
      id = dataArray[0];
      index = dataArray[1];
    }
    const requestURL = `https://codeforces.com/api/contest.standings?contestId=${id}&from=1&count=1`;
    try {
      var rating = null;
      var tags = null;
      const response = await fetch(requestURL);
      const data = await response.json();
      const problemsList = data.result.problems;

      if (data.status == "OK") {
        for (var i = 0; i < problemsList.length; i++) {
          if (problemsList[i].index == index) {
            rating = problemsList[i].rating;
            tags = problemsList[i].tags;
            break;
          }
        }
      }

      const tagBox = document.createElement("span");
      tagBox.setAttribute("id", "answer");
      document.getElementById("answer_box").append(tagBox);

      if (selectedValue === "rating") {
        if (rating === undefined || rating === null) {
          document.getElementById("answer").style.fontWeight = "bold";

          answer.innerHTML = `Rating not found`;
          document.getElementById("answer").style.display = "inline";
          document.getElementById("answer").style.backgroundColor = "#f0f0f0";
        } else {
          answer.innerHTML = `*${rating}`;
          document.getElementById("answer").style.fontWeight = "bold";

          document.getElementById("answer").style.backgroundColor = "#FFFDE7";
          document.getElementById("answer").style.display = "inline";
        }
        return;
      }

      if (tags === undefined || tags === null) {
        answer.innerHTML = `tags not found`;
        document.getElementById("answer").style.fontWeight = "bold";
        document.getElementById("answer").style.display = "inline";
        document.getElementById("answer").style.backgroundColor = "#f0f0f0";
        return;
      } else {
        flag = 0;
        tags.forEach((tag) => {
          if (tag == selectedValue) {
            flag = 1;
          }
        });

        if (flag) {
          answer.innerHTML = `YES`;
          document.getElementById("answer").style.fontWeight = "bold";
          document.getElementById("answer").style.backgroundColor = "#dff0d8";
          document.getElementById("answer").style.display = "inline";
        } else {
          answer.innerHTML = `NO`;
          document.getElementById("answer").style.fontWeight = "bold";

          document.getElementById("answer").style.backgroundColor = "#fe967c";
          document.getElementById("answer").style.display = "inline";
        }
      }
    } catch (e) {
      console.log("Error fetch data from Codeforces");
    }
  });
} else {
  console.error("id (#sidebar) not found in the document");
}

const checkShowAllButton = document.querySelector("#checkShowAllButton");

checkShowAllButton.addEventListener("click", async function () {
  // Remove tag from Show Check tags button
  const tagBox = document.querySelectorAll("#answer_box span");
  tagBox.forEach((tag) => {
    tag.parentNode.removeChild(tag);
  });

  var id;
  var index;

  if (url[23] == "c") {
    var data = url.slice(31, url.length);
    var dataArray = data.split(/[\/\?]/);
    id = dataArray[0];
    index = dataArray[2];
  } else {
    var data = url.slice(42, url.length);
    var dataArray = data.split(/[\/\?]/);
    id = dataArray[0];
    index = dataArray[1];
  }
  const requestURL = `https://codeforces.com/api/contest.standings?contestId=${id}&from=1&count=1`;
  try {
    var rating = null;
    var tags = null;
    const response = await fetch(requestURL);
    const data = await response.json();
    const problemsList = data.result.problems;

    if (data.status == "OK") {
      for (var i = 0; i < problemsList.length; i++) {
        if (problemsList[i].index == index) {
          rating = problemsList[i].rating;
          tags = problemsList[i].tags;
          break;
        }
      }
    }

    if (tags === undefined || tags === null) {
      answer.innerHTML = `tags not found`;
      document.getElementById("answer").style.fontWeight = "bold";
      document.getElementById("answer").style.display = "inline";
      document.getElementById("answer").style.backgroundColor = "#f0f0f0";
      return;
    } else {
      if (rating !== undefined && rating !== null) {
        const tagBox = document.createElement("span");
        tagBox.textContent = `*${rating}`;
        document.getElementById("answer_box").append(tagBox);
      }
      tags.forEach((tag) => {
        console.log(tag);
        const tagBox = document.createElement("span");
        tagBox.textContent = tag;
        document.getElementById("answer_box").append(tagBox);
      });

      const tagBox = document.querySelectorAll("#answer_box span");
      console.log(tagBox);
      tagBox.forEach((tag) => {
        tag.style.display = "inline";
        tag.style.backgroundColor = "#f0f0f0";
      });
    }
  } catch (e) {
    console.log("Error fetch data from Codeforces");
  }
});
