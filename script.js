const searchbtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.getElementById("meal-details-content");
const recipeclosebutton = document.getElementById("recipe-close-button");

// event listeners
searchbtn.addEventListener("click", getMeallist);
mealList.addEventListener("click", getMealRecipe);
recipeclosebutton.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});
mealDetailsContent.addEventListener("click", function () {
  display = "none";
});

// get meal list that matches with the ingredients
function getMeallist() {
  let searchinputTxt = document.getElementById("search-Input").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchinputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
                    <div class="Meal-item" data-id="${meal.idMeal}" style="border-radius: 2rem; overflow: hidden;background-color: white; ">
                        <div class="meal-img" >
                            <img src="${meal.strMealThumb}" alt="food" style="height: 300px;
                            width: 500px;">
                        </div>    
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>       
                    </div>   
                `;
        });
        mealList.classList.remove("notfound");
      } else {
        html = "Sorry,we didn't find any meal!";
        mealList.classList.add("notfound");
      }
      mealList.innerHTML = html;
    });
}

document.getElementById("recipe-close-button").onclick = function () {
  document.getElementById("meal-details-content").style.display = "none";
  document.getElementById("recipe-close-button").style.display = "none";
};

// get recipe of the meal
function getMealRecipe(e) {
  e.preventDefault();
  //   if (e.target.classList.contains("recipe-btn")) {
  let mealItem = e.target.parentElement.parentElement;
  fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
  )
    .then((response) => response.json())
    .then((data) => mealRecipeModal(data.meals));
  //    }
}

function getmealDetailsContent() {}
// create a Modal
function mealRecipeModal(meal) {
  console.log(meal);
  meal = meal[0];
  let html = `
    <div>  
      <div class="top_contents" style="display: flex; justify-content: center;">
        <div class="row">  
          <div class="column.side1">
          <h2 class="recipe-title">${meal.strMeal}
          </h2>
          </div>
          <div class="column.side2" style="
          width: fit-content;
          margin-right: auto;
          margin-left: auto;">
          <h2 class="recipe-category" >${meal.strCategory}</h2>
          </div>
        </div>  
        <div class="column.middle">
          <div class="recipe-Meal-img">
          <img src="${meal.strMealThumb}" style="margin-top: 1rem;">
          </div>
        </div>
      </div>
      <div>  
        <div style="display:block;">  
          <div class="recipe-instructions">
          <h3 style="
          text-decoration: underline;
          font-family: Algerian;
          font-size: xx-large;">Instructions
          </h3>
            <p style="margin-right: 100px;
            margin-left: 100px;
            text-align: justify;">${meal.strInstructions}
            </p>
          </div>    
        </div>
        <div class="recipe-link">
        <p style="
        font-size: x-large;
        margin-bottom: 2rem;
        color: darkturquoise;
        font-weight: bold;">
        For The Full Tutorial video click the link below ⇓
        </p>
          <a href="${meal.strYoutube}" target="_blank" style="    background: #fff;
          font-weight: 600;
          color: var(--tenne-twany);
          display: inline-block;
          padding: 0.2rem 0.5rem;
          border-radius: 0.4rem;
          text-decoration: none;
          font-size: xx-large;
          margin-bottom: 3rem;">Youtube</a>
        </div>
      </div>
    </div>      
    `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
  document.getElementById("meal-details-content").style.display = "flex";
  document.getElementById("recipe-close-button").style.display = "flex";
  //   document.getElementById.style.
}
