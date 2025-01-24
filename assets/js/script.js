// Constants
const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
const SELECTORS = {
    searchBtn: '#search-btn',
    searchInput: '#search-Input',
    mealList: '#meal',
    mealDetailsContent: '#meal-details-content',
    recipeCloseBtn: '#recipe-close-button',
    mealListHeader: '#mealListHeader'
};

// DOM Elements
const searchBtn = document.querySelector(SELECTORS.searchBtn);
const searchInput = document.querySelector(SELECTORS.searchInput);
const mealList = document.querySelector(SELECTORS.mealList);
const mealDetailsContent = document.querySelector(SELECTORS.mealDetailsContent);
const recipeCloseBtn = document.querySelector(SELECTORS.recipeCloseBtn);
const mealListHeader = document.querySelector(SELECTORS.mealListHeader);

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});
mealList.addEventListener('click', handleMealClick);
recipeCloseBtn.addEventListener('click', closeRecipeModal);

// Functions
async function handleSearch() {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
        showMessage('Please enter a search term');
        return;
    }

    try {
        const meals = await searchMeals(searchTerm);
        displayMeals(meals);
    } catch (error) {
        showMessage('Error fetching recipes. Please try again.');
        console.error('Search error:', error);
    }
}

async function searchMeals(searchTerm) {
    const response = await fetch(`${API_BASE_URL}/filter.php?i=${searchTerm}`);
    const data = await response.json();
    return data.meals;
}

function displayMeals(meals) {
    mealList.innerHTML = '';
    mealListHeader.style.display = meals ? 'block' : 'none';

    if (!meals) {
        showMessage('No meals found. Try another ingredient!');
        return;
    }

    const html = meals.map(meal => `
        <div class="meal-item" data-id="${meal.idMeal}">
            <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>
            <div class="meal-name">
                <h3>${meal.strMeal}</h3>
                <button class="recipe-btn">Get Recipe</button>
            </div>
        </div>
    `).join('');

    mealList.innerHTML = html;
}

async function handleMealClick(e) {
    if (!e.target.classList.contains('recipe-btn')) return;

    const mealItem = e.target.closest('.meal-item');
    if (!mealItem) return;

    try {
        const mealId = mealItem.dataset.id;
        const meal = await getMealRecipe(mealId);
        displayRecipeModal(meal);
    } catch (error) {
        showMessage('Error fetching recipe details. Please try again.');
        console.error('Recipe error:', error);
    }
}

async function getMealRecipe(mealId) {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${mealId}`);
    const data = await response.json();
    return data.meals[0];
}

function displayRecipeModal(meal) {
    const ingredients = getIngredientsList(meal);
    
    const html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        </div>
        <div class="recipe-instructions">
            <h3>Ingredients:</h3>
            <ul class="ingredients-list">
                ${ingredients}
            </ul>
            <h3>Instructions:</h3>
            <p>${formatInstructions(meal.strInstructions)}</p>
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank" rel="noopener">Watch Video Tutorial</a>
        </div>
    `;

    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
    document.body.style.overflow = 'hidden';
    mealDetailsContent.style.display = 'block';
    recipeCloseBtn.style.display = 'flex';
}

function getIngredientsList(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        
        if (ingredient && ingredient.trim()) {
            ingredients.push(`<li>${measure} ${ingredient}</li>`);
        }
    }
    return ingredients.join('');
}

function formatInstructions(instructions) {
    return instructions
        .split('\n')
        .filter(step => step.trim())
        .map(step => `<p>${step}</p>`)
        .join('');
}

function closeRecipeModal() {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
    document.body.style.overflow = 'auto';
    mealDetailsContent.style.display = 'none';
    recipeCloseBtn.style.display = 'none';
}

function showMessage(message) {
    mealList.innerHTML = `<div class="message">${message}</div>`;
}
