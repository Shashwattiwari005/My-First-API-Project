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
    <h2 class="recipe-title" style="padding-top: 2rem;
    padding-top: 0rem;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-bottom: 1rem;
    text-decoration: underline;
    font-size: xxx-large;">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instructions">
        <h3 style="text-decoration: underline;">Instructions</h3>
        <p style="margin-right: 100px;
        margin-left: 100px;
        text-align: justify;">${meal.strInstructions}</p>
    </div>
    <div class="recipe-Meal-img">
        <img src="${meal.strMealThumb}" alt="" >
    </div>
    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank" style="    background: #fff;
        font-weight: 600;
        color: var(--tenne-twany);
        display: inline-block;
        padding: 0.2rem 0.5rem;
        border-radius: 0.4rem;
        text-decoration: none;">Youtube</a>
    </div>
    `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
  document.getElementById("meal-details-content").style.display = "block";
  document.getElementById("recipe-close-button").style.display = "flex";
  //   document.getElementById.style.
}
