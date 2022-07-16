let search=document.getElementById('search');
let submit=document.getElementById('submit');
let random=document.getElementById('random');
let mealsEl=document.getElementById('meals');
let resulHeading=document.getElementById('result-heading');
let singleMealEl=document.getElementById('single-meals');


// search meal and fetch from API
function searchMeal(e){
  e.preventDefault();
  // clear single meal
  singleMealEl.innerHTML='';

  // Get search term
  let term = search.value;
  // check for empty
  if(term.trim()){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        resulHeading.innerHTML=`<h2>Search reslts for ${term}:</h2>`;
        if(data.meals === null){
          resulHeading.innerHTML=`<p>There ar-e not search results.try agin.</p>`;
        }else{
          mealsEl.innerHTML = data.meals
          .map(
            meal => `
          <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="meal-info" data-mealID="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
            `
              )
                .json('');
          }
        });
        console.log('data');
    search.value='';
  }else{
    alert('enter a search');
  }

}

// event  listeners
submit.addEventListener('submit',searchMeal);