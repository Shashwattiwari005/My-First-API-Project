const searchbtn= document.getElementById('search-btn')
const meallist= document.getElementById('meal')
const mealdetailscontent= document.querySelector('Meal-details-content')
const recipeclosebutton = document.getElementById('recipe-close-button')

// event listeners
searchbtn.addEventListener('click',getMeallist);


// get meal list that matches with the ingredients
function getMeallist(){
    let searchinputTxt = documnent.getElementById('search-input').value.trim();
    console.log(searchinputTxt.length);
}